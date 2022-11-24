import React, { useState, useRef, useContext, useEffect } from 'react';

import { emailInput, passwordInput } from "../../data/actions";
import Context from "../../Context";
import assets from "../../assets";
import styles from "./styles.module.scss";

const Form = ({ emailPlaceholder = 'Email', btn1, valid }) => {
    const { state, dispatch, data } = useContext(Context);
    const { lang, registr, email, password, fnAuth } = state;
    const [form, setForm] = useState({
        visibil: false,
        autoComplete: "on",
        emailCheck: false,
        passwordCheck: false,
        emailFocus: false,
        passwordFocus: false,
    });

    useEffect(() => {
        if(email) {
        setForm({
            ...form, 
            emailCheck:
            email.includes('@') && 
            email.includes('.') && 
            email.length >= 8 ?
            true : false
        })};
        if(password) {
        setForm({
            ...form, 
            passwordCheck:
            password.length >= 6 ?
            true : false
        })};
    }, [email, password]);

    const { visibil, autoComplete, emailCheck, passwordCheck, emailFocus, passwordFocus } = form;
    const { users } = data;
    const filterUsersEmail = users.filter(item => item.email === email)[0];
    const filterUsersPassword = users.filter(item => item.password === password)[0];

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

    const handleKey = (e) => {
        if (e.key === "Enter") fnAuth();
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <div className={styles.email}>
                    <input 
                        onMouseEnter={() => setForm({ ...form, emailFocus: false })} 
                        onMouseLeave={() => setForm({ ...form, emailFocus: true })}
                        id="email"
                        onChange={(e) => dispatch(emailInput(e.target.value))}
                        onKeyPress={(e) => handleKey(e)}
                        type="email" 
                        autoComplete={autoComplete}
                        placeholder={emailPlaceholder}
                        value={email}
                        checked
                        tabIndex='1'
                    />
                    {(!valid && emailFocus && Boolean(!filterUsersEmail)) && (
                        <label htmlFor="email">
                            {textCheckEmail}
                        </label>
                    )}
                    {(valid && emailFocus && !emailCheck) && (
                        <label htmlFor="email">
                            {filterUsersEmail ? textUser : textEmail}
                        </label>
                    )}
                </div>
                <div className={styles.password}>
                    <input 
                        onMouseEnter={() => setForm({ ...form, passwordFocus: false })} 
                        onMouseLeave={() => setForm({ ...form, passwordFocus: true })}
                        id="password"
                        ref={passwordRef}
                        onChange={(e) => dispatch(passwordInput(e.target.value))}
                        onKeyPress={(e) => handleKey(e)}
                        type="password" 
                        autoComplete={autoComplete}
                        placeholder={pass}
                        disabled={emailCheck ? false : true}
                        value={password}
                        tabIndex='2'
                    />
                    {((!valid && passwordFocus && Boolean(filterUsersEmail)) && Boolean(!filterUsersPassword)) && (
                        <label htmlFor="email">
                            {textCheckPassword}
                        </label>
                    )}
                    {(valid && passwordFocus && emailCheck) && !passwordCheck && (
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
            </div>
            <div className={styles.checkbox}>
                <input 
                    id="autocomplete"
                    onChange={(e) => checked(e)}
                    checked={autoComplete === 'on' ? true : false}
                    type="checkbox" 
                    tabIndex='3'
                />
                <label htmlFor="autocomplete">{textAutocomplete}</label>
            </div>
            <button 
                className={
                    valid ?
                    emailCheck && passwordCheck && !filterUsersEmail ? '' : `${styles.disabled}` : 
                    filterUsersEmail && passwordCheck && filterUsersPassword ? '' : `${styles.disabled}`
                } 
                onClick={fnAuth} 
                disabled={
                    valid ?
                    emailCheck && passwordCheck && !filterUsersEmail ? false : true : 
                    filterUsersEmail && passwordCheck && filterUsersPassword ? false : true
                }
                tabIndex='4'
            >
                {btn1}
            </button>
            <button 
                onClick={handleResetClick} 
                className={styles.reset}
                tabIndex='5'
            >
                {clearForm}
            </button>
        </div>
    );
};

export default Form;