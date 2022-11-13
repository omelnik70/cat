import React, { useState, useContext, useEffect } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

import { handleAuthClick, emailInput, passwordInput, userValidStatus } from "../../../data/actions";
import Context from "../../../Context";
import Modal from '../../../components/Modal';
import Form from '..';


import styles from "./styles.module.scss";

const Login = () => {
    const [login, setLogin] = useState(true);
    const [errorLogin, setErrorLogin] = useState({
        userEmail: false,
        userPassword: false,
        styleMessage: true,
    });
    const { userEmail, userPassword, styleMessage } = errorLogin;

    const navigate = useNavigate();
    const goBack = () => navigate('/');

    const { state, dispatch } = useContext(Context);
    const { lang, registr, email, password, userValid } = state;

    console.log(userValid);

    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    const btnRegester = langUa ? ua.signIn : langRu ? ru.signIn : en.signIn;
    const title = langUa ? ua.login : langRu ? ru.login : en.login;
    const link = langUa ? ua.register : langRu ? ru.register : en.register;
    const textEmail = langUa ? ua.textEmailInvalid : langRu ? ru.textEmailInvalid : en.textEmailInvalid;
    const textValid = langUa ? ua.textUserValid : langRu ? ru.textUserValid : en.textUserValid;
    const textPassword = langUa ? ua.textPasswordInvalid : langRu ? ru.textPasswordInvalid : en.textPasswordInvalid;
    const textMessage = userEmail ? textEmail : userPassword ? textPassword : textValid;

    useEffect(() => {
        dispatch(handleAuthClick(
            state.fnAuth = () => {
                console.log(email, password);
                signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setErrorLogin({ ...errorLogin, styleMessage: true });
                    dispatch(userValidStatus(true));
                    console.log(user);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    errorMessage.includes('password') ? 
                    setErrorLogin({ ...errorLogin, userPassword: true, userEmail: false, styleMessage: true }) : 
                    setErrorLogin({ ...errorLogin, userEmail: true, userPassword: false, styleMessage: true });
                });
            }));
    }, [email, password]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(userEmail || userPassword) {
                setErrorLogin({ 
                    ...errorLogin, 
                    styleMessage: false,
                });
            };
        }, 5000);
        return () => clearTimeout(timer);
      }, [userEmail, userPassword, userValid]);

      useEffect(() => {
        const timer = setTimeout(() => {
            if(userEmail || userPassword) {
                setErrorLogin({ 
                    ...errorLogin, 
                    userEmail: false,
                    userPassword: false,
                });
            };
        }, 6000);
        return () => clearTimeout(timer);
      }, [userEmail, userPassword]);

      useEffect(() => {
            const timer = setTimeout(() => {
            if(userValid) {
                dispatch(emailInput(''));
                dispatch(passwordInput(''));
                setLogin(true);
                goBack();
            };
        }, 6000);
        return () => clearTimeout(timer);
      }, [userValid]);

    return (
        <Modal active={login} setActive={setLogin} >
            <div className={styles.container}>
                <h3 className={styles.title}>{title}</h3>
                <Form btn1={btnRegester} />
                {(userEmail || userPassword || userValid) && (
                    <p className={styleMessage ? styles.showMessage : styles.hideMessage}>
                        {textMessage}
                    </p>
                )}
                <p className={styles.text}>
                    {langUa ? ua.alreadyLogin :
                    langRu ? ru.alreadyLogin :
                    en.alreadyLogin} 
                </p>
                <Link to="/register">
                    <p className={styles.link}>{link}</p>
                </Link>
            </div>
        </Modal>
    );
};

export default Login;