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
                <Form />
                <h1 className={styles.title}>Register</h1>
                <p className={styles.text}>
                    Already have an account? 
                    <Link to="/login">
                        <span className={styles.link}> Sign in</span>
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default Register;