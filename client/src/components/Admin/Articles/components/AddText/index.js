import React, { useState } from "react";

import styles from "./styles.module.scss";

const AddText = ({article, setActive}) => {
    const [text, setText] = useState({
        text: "", 
        strong_text: ""
    });

    const handleClickAddText = () => {
        article.content.push(text);
        setText({text: "", strong_text: ""});
        setActive(false);
    };
    
    return (
        <div className={styles.container}>
            <h2>Обычный текст</h2>
            <textarea 
                onChange={(e) => setText({...text, text: e.target.value})}
                className={styles.textarea} value={text.text} />
            <h2>Жирный текст</h2>
            <input 
                onChange={(e) => setText({...text, strong_text: e.target.value})}
                className={styles.input} type="text" value={text.strong_text} />
            <button onClick={handleClickAddText}>Добавить текст</button>
        </div>
    );
};

export { AddText };