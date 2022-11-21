import React, { useState, useContext, useEffect } from 'react';


import Context from "../../../Context";
import { emailInput, passwordInput } from "../../../data/actions";
import Modal from '../../../components/Modal';
import styles from "./styles.module.scss";

const Login = () => {
    const [emailWindow, setEmailWindow] = useState(true);
    const [passWindow, setPassWindow] = useState(true);
    const [form, setForm] = useState({
        emailCheck: false,
    });
    const { state, dispatch, dataUsers } = useContext(Context);
    const { email, password } = state;

    const { users } = dataUsers;
    const searchUsersEmail = Boolean(users.filter(item => item.email === email).length);
    const { emailCheck } = form;

    useEffect(() => {
        if(email) {
        setForm({...form, 
            emailCheck:
            email.includes('@') && 
            email.includes('.') && 
            email.length >= 8 ?
            true : false
        })};
    }, [email]);

    console.log(searchUsersEmail, emailCheck);

    const handleKey = (e) => {
        if (e.key === "Enter") return;
    };

    const handleClickEmail = () => {
        // setEmailWindow(searchUsersEmail ? false : true);
        // setPassWindow(searchUsersEmail ? true : false);
    };

    return (
        <>
            <Modal active={emailWindow} setActive={setEmailWindow} >
                <div className={styles.container}>
                    <div className={styles.email}>
                        <input 
                            id="email"
                            onChange={(e) => dispatch(emailInput(e.target.value))}
                            onKeyPress={(e) => handleKey(e)}
                            type="email" 
                            placeholder="Введите Ваш email"
                            value={email}
                        />
                    </div>
                    <button
                        onClick={handleClickEmail}
                        className={emailCheck ? '' : styles.disabled}
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
            <Modal active={passWindow} setActive={setPassWindow} >
                <div className={styles.container}>
                    <div className={styles.email}>
                        <input 
                            id="pass"
                            onChange={(e) => dispatch(passwordInput(e.target.value))}
                            onKeyPress={(e) => handleKey(e)}
                            type="password" 
                            placeholder="Придумайте Ваш пароль"
                            value={password}
                        />
                    </div>
                    <button
                        onClick={handleClickEmail}
                        className={emailCheck ? '' : styles.disabled}
                    >
                        Подтвердить
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Login;