import React, { useState } from "react";

import styles from "./styles.module.scss";

const Form = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    return (
        <div className={styles.container}>
            <input className={styles.inputForm}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input  className={styles.inputForm}
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="password"
            />
            <button
            className={styles.button}
                onClick={() => handleClick(email, pass)}
            >
                {title}
            </button>
        </div>
    );
};

export { Form };