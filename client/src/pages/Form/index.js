import React, { useState, useRef, useContext } from 'react';

import Context from "../../Context";
import assets from "../../assets";
import styles from "./styles.module.scss";

const Form = ({ emailPlaceholder = 'Email', btn1 }) => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        visibil: false,
    });
    const { email, password, visibil } = formState;
    const { state } = useContext(Context);
    const { lang, registr } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = registr;
    const passwordRef = useRef();

    const { ICONS } = assets;
    const { VISIBILITY, VISIBILITYOFF } = ICONS;

    const handleChange = (e) => {
        e.target.type === "email" ?
        setFormState({
            ...formState,
            email: e.target.value
        }) :
        setFormState({
            ...formState,
            password: e.target.value
        });
    };

    const handleClickToggle = () => {
        setFormState({
            ...formState,
            visibil: !visibil,
        });
        !visibil ? passwordRef.current.type = "text" : passwordRef.current.type = "password";
    };

    const handleResetClick = () => {
        setFormState({
            ...formState,
            email: '',
            password: ''
        });
    };

    console.log(btn1);
    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <input 
                    onChange={(e) => handleChange(e)}
                    type="email" 
                    placeholder={emailPlaceholder}
                    value={email}
                />
                <input 
                    ref={passwordRef}
                    onChange={(e) => handleChange(e)}
                    type="password" 
                    placeholder={
                        langUa ? ua.password :
                        langRu ? ru.password :
                        en.password
                    }
                    value={password}
                />
                <img 
                    className={styles.visibil}
                    onClick={handleClickToggle}
                    src={visibil ? VISIBILITY : VISIBILITYOFF} alt="" 
                />
            </div>
            <button>{btn1}</button>
            <button 
                onClick={handleResetClick} 
                className={styles.reset}
            >
                {langUa ? ua.clearForm :
                langRu ? ru.clearForm :
                en.clearForm}
            </button>
        </div>
    );
};

export default Form;