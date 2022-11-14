import React, { useState, useRef, useContext } from 'react';

import { emailInput, passwordInput } from "../../data/actions";
import Context from "../../Context";
import assets from "../../assets";
import styles from "./styles.module.scss";

const Form = ({ emailPlaceholder = 'Email', btn1 }) => {
    const [form, setForm] = useState({
        visibil: false,
        autoComplete: "off",
        emailCheck: false,
        passwordCheck: false,
        emailFocus: false,
        passwordFocus: false
    });
    const { visibil, autoComplete, emailCheck, passwordCheck, emailFocus, passwordFocus } = form;
    const { state, dispatch } = useContext(Context);
    const { lang, registr, email, password, fnAuth } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    const pass = langUa ? ua.password : langRu ? ru.password : en.password;
    const clearForm = langUa ? ua.clearForm : langRu ? ru.clearForm : en.clearForm;
    const textEmail = langUa ? ua.emailText : langRu ? ru.emailText : en.emailText;
    const textPassword = langUa ? ua.passwordText : langRu ? ru.passwordText : en.passwordText;
    const textAutocomplete = langUa ? ua.autocomplete : langRu ? ru.autocomplete : en.autocomplete;
    const passwordRef = useRef();

    const { ICONS } = assets;
    const { VISIBILITY, VISIBILITYOFF } = ICONS;

    const handleClickToggle = () => {
        setForm({ ...form, visibil: !visibil });
        !visibil ? passwordRef.current.type = "text" : passwordRef.current.type = "password";
    };

    const handleResetClick = () => {
        dispatch(emailInput(''));
        dispatch(passwordInput(''));
    };

    const checked = (e) => {
        e.target.checked ? 
        setForm({ ...form, autoComplete: 'on' }) : 
        setForm({ ...form, autoComplete: 'off' });
    };

    const handleEmailChange = (e) => {
        dispatch(emailInput(e.target.value));
        setForm({
            ...form, 
            emailCheck:
            e.target.value.includes('@') && 
            e.target.value.includes('.') && 
            e.target.value.length >= 8 ?
            true : false
        });
    };

    const handlePasswordChange = (e) => {
        dispatch(passwordInput(e.target.value));
        setForm({
            ...form, 
            passwordCheck:
            e.target.value.length >= 6 ?
            true : false
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <div className={styles.email}>
                    <input 
                        onFocus={() => setForm({ ...form, emailFocus: false })}
                        onBlur={() => setForm({ ...form, emailFocus: true })}
                        id="email"
                        onChange={(e) => handleEmailChange(e)}
                        type="email" 
                        autoComplete={autoComplete}
                        placeholder={emailPlaceholder}
                        value={email}
                    />
                    {emailFocus && !emailCheck && (<label htmlFor="email">{textEmail}</label>)}
                </div>
                <div className={styles.password}>
                    <input 
                        onFocus={() => setForm({ ...form, passwordFocus: false })}
                        onBlur={() => setForm({ ...form, passwordFocus: true })}
                        id="password"
                        ref={passwordRef}
                        onChange={(e) => handlePasswordChange(e)}
                        type="password" 
                        autoComplete={autoComplete}
                        placeholder={pass}
                        value={password}
                    />
                    {passwordFocus && !passwordCheck && (<label htmlFor="password">{textPassword}</label>)}
                </div>
                <img 
                    className={styles.visibil}
                    onClick={handleClickToggle}
                    src={visibil ? VISIBILITY : VISIBILITYOFF} alt="" 
                />
            </div>
            <div className={styles.checkbox}>
                <input 
                    id="autocomplete"
                    onChange={(e) => checked(e)}
                    type="checkbox" 
                />
                <label htmlFor="autocomplete">{textAutocomplete}</label>
            </div>
            <button 
                className={emailCheck && passwordCheck ? '' : `${styles.disabled}`} 
                onClick={fnAuth} 
                disabled={emailCheck && passwordCheck ? false : true}
            >
                {btn1}
            </button>
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