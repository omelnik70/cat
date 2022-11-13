import React, { useState, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";

import { handleAuthClick, userValidStatus } from "../../../data/actions";
import Context from "../../../Context";
import Form from "..";
import Modal from "../../../components/Modal";
import styles from "./styles.module.scss";

const Register = () => {
    const [register, setRegister] = useState(true);
    const [errorRegistr, setErrorRegistr] = useState({
        styleMessage: true,
    });

    const { styleMessage } = errorRegistr;
    const { state, dispatch } = useContext(Context);
    const { lang, registr, email, password, userValid } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    let btnRegester = langUa ? ua.register : langRu ? ru.register : en.register;
    let title = langUa ? ua.registration : langRu ? ru.registration : en.registration;
    let link = langUa ? ua.signIn : langRu ? ru.signIn : en.signIn;
    let text = langUa ? ua.alreadyRegistered : langRu ? ru.alreadyRegistered : en.alreadyRegistered;
    let textMessage = langUa ? ua.userValid : langRu ? ru.userValid : en.userValid;

    useEffect(() => {
        dispatch(handleAuthClick(
            state.fnAuth = () => {
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    dispatch(userValidStatus(true));
                    console.log(user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error authCode:', errorCode);
                    console.log('Error authMessage:', errorMessage);
                });
            }));
    }, [email, password]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if(userValid) {
                setErrorRegistr({ 
                    ...errorRegistr, 
                    styleMessage: false,
                });
            };
        }, 5000);
        return () => clearTimeout(timer);
      }, [userValid]);

    return (
        <Modal active={register} setActive={setRegister} >
            <div className={styles.container}>
                <h3 className={styles.title}>{title}</h3>
                <Form btn1={btnRegester} />
                {userValid && (
                    <p className={styleMessage ? styles.showMessage : styles.hideMessage}>
                        {textMessage}
                    </p>
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