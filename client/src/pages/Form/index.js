import React, { useState, useRef, useContext } from 'react';

import { emailInput, passwordInput } from "../../data/actions";
import Context from "../../Context";
import assets from "../../assets";
import styles from "./styles.module.scss";

const Form = ({ emailPlaceholder = 'Email', btn1 }) => {
    const [visibil, setVisibil] = useState(false);
    const { state, dispatch } = useContext(Context);
    const { lang, registr, email, password, fnAuth } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    const pass = langUa ? ua.password : langRu ? ru.password : en.password;
    const clearForm = langUa ? ua.clearForm : langRu ? ru.clearForm : en.clearForm;
    const passwordRef = useRef();

    const { ICONS } = assets;
    const { VISIBILITY, VISIBILITYOFF } = ICONS;

    const handleClickToggle = () => {
        setVisibil(!visibil);
        !visibil ? passwordRef.current.type = "text" : passwordRef.current.type = "password";
    };

    const handleResetClick = () => {
        dispatch(emailInput(''));
        dispatch(passwordInput(''));
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <input 
                    onChange={(e) => dispatch(emailInput(e.target.value))}
                    type="email" 
                    placeholder={emailPlaceholder}
                    value={email}
                />
                <input 
                    ref={passwordRef}
                    onChange={(e) => dispatch(passwordInput(e.target.value))}
                    type="password" 
                    placeholder={pass}
                    value={password}
                />
                <img 
                    className={styles.visibil}
                    onClick={handleClickToggle}
                    src={visibil ? VISIBILITY : VISIBILITYOFF} alt="" 
                />
            </div>
            <button onClick={fnAuth}>{btn1}</button>
            <button 
                onClick={handleResetClick} 
                className={styles.reset}
            >
                {clearForm}
            </button>
        </div>
    );
};

export default Form;