import React, { useState, useRef } from 'react';

import assets from "../../assets";
import styles from "./styles.module.scss";

const Form = ({email = 'Email', password = 'Password'}) => {
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        visibil: false,
    });

    const passwordRef = useRef();

    const { emailInput, passwordInput, visibil } = formState;
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
        console.log(passwordRef.current);
        !visibil ? passwordRef.current.type = "text" : passwordRef.current.type = "password";
    };

    console.log(formState);

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <input 
                    onChange={(e) => handleChange(e)}
                    type="email" 
                    placeholder={email}
                    value={emailInput}
                />
                <input 
                    ref={passwordRef}
                    onChange={(e) => handleChange(e)}
                    type="password" 
                    placeholder={password}
                    value={passwordInput}
                />
                <img 
                     className={styles.visibil}
                    onClick={handleClickToggle}
                    src={visibil ? VISIBILITY : VISIBILITYOFF} alt="" 
                />
            </div>
        </div>
    );
};

export default Form;