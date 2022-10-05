import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LoginPage from 'pages/Form/Login';
import Register from 'pages/Form/Register';

import styles from './styles.module.scss';


function Modal3 () {
    const path = useLocation().pathname.slice(1);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={path === "register" || path === "login" ? 
                `${styles.contant} ${styles.contantAnimation}` : 
                styles.contant}
            >
                    <Link to="/" className={styles.close}>x</Link>
                    {path === 'login' && (<LoginPage />)}
                    {path === 'register' && (<Register />)}
                </div>
            </div>
        </div>
    );
}

export default Modal3;