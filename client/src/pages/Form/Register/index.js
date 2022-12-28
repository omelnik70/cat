import React, { useState, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../../../firebase";
import { Link, useNavigate } from "react-router-dom";

import { handleAuthClick, emailInput, passwordInput, userValidStatus, currentAvatar } from "../../../data/actions";
import Context from "../../../Context";
import Form from "..";
import Modal from "../../../components/Modal";
import styles from "./styles.module.scss";

const Register = () => {
    const [register, setRegister] = useState(true);
    const [modal, setModal] = useState(true);
    const [userCheck, setUserCheck] = useState(false);
    const { state, dispatch } = useContext(Context);
    const { lang, registr, email, password, userValid, isUser } = state;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(handleAuthClick(
            state.fnAuth = () => {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    const { uid } = user;
                    dispatch(userValidStatus(`/users/${uid}`));
                    dispatch(currentAvatar(''));
                    set(ref(database, 'data/users/' + uid), {
                        uid,
                        password,
                        email,
                    });
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    errorMessage.includes('already') ? setUserCheck(true) : setUserCheck(false);
                });
            }));
    }, [email, password]);

      useEffect(() => {
        if((isUser || userCheck)) {
            const timer = setTimeout(() => {
                dispatch(emailInput(''));
                dispatch(passwordInput(''));
                setModal(false);
                setRegister(false);
                navigate(userValid);
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
                {(isUser || userCheck) && (
                    <Modal active={modal} setActive={setModal}>{isUser ? textMessage : textUser}</Modal>
                )}
                <p className={styles.text}>
                    {text} 
                    <Link to={`${lang === "6311a2434690f0b08bf74075" ? "/ua" : lang === "6311a25b4690f0b08bf74077" ? "/ru" : "/en"}/login`}>
                        <span className={styles.link}>{link}</span>
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default Register;