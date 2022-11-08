import React, { useState } from "react";
import { Link } from "react-router-dom";

import Form from "..";
import Modal from "../../../components/Modal";
import styles from "./styles.module.scss";

const Register = () => {
    const [register, setRegister] = useState(true);

    return (
        <Modal active={register} setActive={setRegister} >
            <div className={styles.container}>
                <h3 className={styles.title}>Регистрация</h3>
                <Form />
                <button>Зарегистрироваться</button>
                <button className={styles.reset}>Очистить форму</button>
                
                <p className={styles.text}>
                    Вы ужк зарегистрированы? 
                    <Link to="/login">
                        <span className={styles.link}> Войти</span>
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default Register;