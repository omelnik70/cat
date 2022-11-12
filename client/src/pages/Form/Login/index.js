import React, { useState, useContext } from 'react';
import { Link } from "react-router-dom";

import Context from "../../../Context";
import Modal from '../../../components/Modal';
import Form from '..';


import styles from "./styles.module.scss";

const Login = () => {
    const [login, setLogin] = useState(true);
    const { state } = useContext(Context);
    const { lang, registr } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    let btnRegester = langUa ? ua.signIn :
                        langRu ? ru.signIn :
                        en.signIn;

    return (
        <Modal active={login} setActive={setLogin} >
            <div className={styles.container}>
                <h3 className={styles.title}>
                    {langUa ? ua.login :
                    langRu ? ru.login :
                    en.login}
                </h3>
                <Form btn1={btnRegester} />
                <p className={styles.text}>
                    {langUa ? ua.alreadyLogin :
                    langRu ? ru.alreadyLogin :
                    en.alreadyLogin} 
                </p>
                <Link to="/register">
                    <p className={styles.link}> 
                        {langUa ? ua.register :
                        langRu ? ru.register :
                        en.register}
                    </p>
                </Link>
            </div>
        </Modal>
    );
};

export default Login;