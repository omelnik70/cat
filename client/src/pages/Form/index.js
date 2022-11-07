import React, { useState } from 'react';

import styles from "./styles.module.scss";

const Form = () => {
    const [formState, setFormState] = useState({
        login: '',
        email: '',
        password: ''
    })

    return (
        <div className={styles.container}>
            <input 
                type="text" 
                placeholder='Введите Ваш логин'
                value={(e) => setFormState({...formState, login: e.target.value})}
            />
            <input 
                type="email" 
                placeholder='Введите Ваш email'
                value={(e) => setFormState({...formState, email: e.target.value})}
            />
            <input 
                type="password" 
                placeholder='Введите Ваш пароль'
                value={(e) => setFormState({...formState, password: e.target.value})}
            />
        </div>
    );
};

export default Form;