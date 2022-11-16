import React, { useState, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from '@apollo/client';

import { ADD_USER_MUTATION } from "../../../apollo/mutations";
import { USERS_QUERY } from "../../../apollo/queries";
import { handleAuthClick, emailInput, passwordInput, userValidStatus } from "../../../data/actions";
import Context from "../../../Context";
import Form from "..";
import Modal from "../../../components/Modal";
import styles from "./styles.module.scss";

const Register = () => {
    const [register, setRegister] = useState(true);
    const [modal, setModal] = useState(true);
    const [userCheck, setUserCheck] = useState(false);
    const [AddUser] = useMutation(ADD_USER_MUTATION, {

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newUser } }) {
            const { users } = cache.readQuery({ query: USERS_QUERY });
            cache.writeQuery({ 
                query: USERS_QUERY,
                data: {
                    users: [...users, newUser]
                },
            });
        },
    });
    const { state, dispatch } = useContext(Context);
    const { lang, registr, email, password, userValid } = state;

    const navigate = useNavigate();
    const goBack = () => navigate(userValid ? userValid : '/login');

    useEffect(() => {
        dispatch(handleAuthClick(
            state.fnAuth = () => {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const { uid } = user;
                    AddUser({
                        variables: {
                            uid,
                            avatar: '',
                            login: '',
                            email,
                            password,
                        },
                    });
                    dispatch(userValidStatus(`/users/${uid}`));
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    errorMessage.includes('already') ? setUserCheck(true) : setUserCheck(false);
                });
            }));
    }, [email, password]);

      useEffect(() => {
        if((userValid || userCheck)) {
            const timer = setTimeout(() => {
                dispatch(emailInput(''));
                dispatch(passwordInput(''));
                setModal(false);
                setRegister(false);
                goBack();
            }, 4000);
            return () => clearTimeout(timer);
        };
      }, [userValid, userCheck]);
      
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    let btnRegester = langUa ? ua.register : langRu ? ru.register : en.register;
    let title = langUa ? ua.registration : langRu ? ru.registration : en.registration;
    let link = langUa ? ua.signIn : langRu ? ru.signIn : en.signIn;
    let text = langUa ? ua.alreadyRegistered : langRu ? ru.alreadyRegistered : en.alreadyRegistered;
    let textMessage = langUa ? ua.textRegistered : langRu ? ru.textRegistered : en.textRegistered;
    const textUser = langUa ? ua.userText : langRu ? ru.userText : en.userText;

    return (
        <Modal active={register} setActive={setRegister}>
            <div className={styles.container}>
                <h3 className={styles.title}>{title}</h3>
                <Form btn1={btnRegester} valid={true} />
                {(userValid || userCheck) && (
                    <Modal active={modal} setActive={setModal}>{userValid ? textMessage : textUser}</Modal>
                )}
                <p className={styles.text}>
                    {text} 
                    <Link to="/login">
                        <span className={styles.link}>{link}</span>
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default Register;