import React, { useState, useRef, useContext } from 'react';

import { emailInput, passwordInput, userPin } from "../../data/actions";
import Context from "../../Context";
import assets from "../../assets";
import styles from "./styles.module.scss";

const Form = ({ emailPlaceholder = 'Email', btn1, valid }) => {
    const [form, setForm] = useState({
        visibil: false,
        autoComplete: "on",
        emailCheck: false,
        passwordCheck: false,
        pinCheck: false,
        emailFocus: false,
        passwordFocus: false,
        pinFocus: false,
    });
    const { visibil, autoComplete, emailCheck, passwordCheck, emailFocus, passwordFocus, pinFocus, pinCheck } = form;
    const { state, dispatch, dataUsers } = useContext(Context);
    const { lang, registr, email, password, fnAuth, pin } = state;
    const { users } = dataUsers;
    const filterUsersEmail = users.filter(item => item.email === email)[0];
    const filterUsersPassword = users.filter(item => item.password === password)[0];
    //const filterUsersPin = users.filter(item => item.pin === pin)[0];

    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    const pass = langUa ? ua.password : langRu ? ru.password : en.password;
    const clearForm = langUa ? ua.clearForm : langRu ? ru.clearForm : en.clearForm;
    const textEmail = langUa ? ua.emailText : langRu ? ru.emailText : en.emailText;
    const textPassword = langUa ? ua.passwordText : langRu ? ru.passwordText : en.passwordText;
    const textAutocomplete = langUa ? ua.autocomplete : langRu ? ru.autocomplete : en.autocomplete;
    const textCheckEmail = langUa ? ua.textEmailInvalid : langRu ? ru.textEmailInvalid : en.textEmailInvalid;
    const textCheckPassword = langUa ? ua.textPasswordInvalid : langRu ? ru.textPasswordInvalid : en.textPasswordInvalid;
    const textUser = langUa ? ua.userText : langRu ? ru.userText : en.userText;
    const textPinMessage = langUa ? ua.pinTextMessage : langRu ? ru.pinTextMessage : en.pinTextMessage;
    const pinTextInput = langUa ? ua.pinInputText : langRu ? ru.pinInputText : en.pinInputText;
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
        dispatch(userPin(''));
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

    const handlePinChange = (e) => {
        dispatch(userPin(e.target.value));
        setForm({
            ...form, 
            pinCheck:  
            e.target.value.length === 4 ?
            true : false
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") fnAuth();
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
                        checked
                        tabIndex='1'
                    />
                    {(!valid && emailFocus && !filterUsersEmail) && (
                        <label htmlFor="email">
                            {textCheckEmail}
                        </label>
                    )}
                    {((valid && emailFocus && !emailCheck) || filterUsersEmail) && (
                        <label htmlFor="email">
                            {filterUsersEmail ? textUser : textEmail}
                        </label>
                    )}
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
                        disabled={emailCheck ? false : true}
                        value={password}
                        tabIndex='2'
                    />
                    {(!valid && passwordFocus && !filterUsersPassword) && (
                        <label htmlFor="email">
                            {textCheckPassword}
                        </label>
                    )}
                    {valid && passwordFocus && !passwordCheck && (
                        <label htmlFor="email">
                            {textPassword}
                        </label>
                    )}
                    <img 
                        className={styles.visibil}
                        onClick={handleClickToggle}
                        src={visibil ? VISIBILITY : VISIBILITYOFF} alt="" 
                    />
                </div>
                {valid && 
                    (<div className={styles.pin}>
                        <input 
                            onFocus={() => setForm({ ...form, pinFocus: false })}
                            onBlur={() => setForm({ ...form, pinFocus: true })}
                            id="pin"
                            onChange={(e) => handlePinChange(e)}
                            type="text" 
                            autoComplete={autoComplete}
                            disabled={emailCheck && passwordCheck ? false : true}
                            placeholder={pinTextInput}
                            value={pin}
                            tabIndex='3'
                        />
                        {pinFocus && !pinCheck && (<label htmlFor="pin">{textPinMessage}</label>)}
                    </div>)}
            </div>
            <div className={styles.checkbox}>
                <input 
                    id="autocomplete"
                    onChange={(e) => checked(e)}
                    checked={autoComplete === 'on' ? true : false}
                    type="checkbox" 
                    tabIndex='4'
                />
                <label htmlFor="autocomplete">{textAutocomplete}</label>
            </div>
            <button 
                className={
                    valid ?
                    emailCheck && passwordCheck && pinCheck && !filterUsersEmail ? '' : `${styles.disabled}` : 
                    filterUsersEmail && passwordCheck ? '' : `${styles.disabled}`
                } 
                onClick={fnAuth} 
                onKeyPress={handleKey}
                disabled={
                    valid ?
                    emailCheck && passwordCheck && pinCheck ? '' : `${styles.disabled}` : 
                    filterUsersEmail && passwordCheck ? '' : `${styles.disabled}`
                }
                tabIndex='5'
            >
                {btn1}
            </button>
            <button 
                onClick={handleResetClick} 
                className={styles.reset}
                tabIndex='6'
            >
                {clearForm}
            </button>
        </div>
    );
};

export default Form;