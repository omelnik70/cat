import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import Context from "../../../Context";
import Form from "..";
import Modal from "../../../components/Modal";
import styles from "./styles.module.scss";

const Register = () => {
    const [register, setRegister] = useState(true);
    const { state } = useContext(Context);
    const { lang, registr } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    let btnRegester = langUa ? ua.register :
                        langRu ? ru.register :
                        en.register;

    return (
        <Modal active={register} setActive={setRegister} >
            <div className={styles.container}>
                <h3 className={styles.title}>
                    {langUa ? ua.registration :
                    langRu ? ru.registration :
                    en.registration}
                </h3>
                <Form btn1={btnRegester} />
                <p className={styles.text}>
                    {langUa ? ua.alreadyRegistered :
                    langRu ? ru.alreadyRegistered :
                    en.alreadyRegistered} 
                    <Link to="/login">
                        <span className={styles.link}> 
                            {langUa ? ua.signIn :
                            langRu ? ru.signIn :
                            en.signIn}
                        </span>
                    </Link>
                </p>
            </div>
        </Modal>
    );
};

export default Register;