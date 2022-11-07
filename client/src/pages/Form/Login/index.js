import React, { useState } from 'react';
import { Link } from "react-router-dom";

import Modal from '../../../components/Modal';
import Form from '..';


import styles from "./styles.module.scss";

const Login = () => {
    const [login, setLogin] = useState(true);

    return (
        <Modal active={login} setActive={setLogin} >
            <div className={styles.container}>
                <Form />
                <h1 className={styles.title}>Login</h1>
                <p className={styles.text}>
                    Or 
                    <Link to="/register">
                        <span className={styles.link}> register</span>
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default Login;