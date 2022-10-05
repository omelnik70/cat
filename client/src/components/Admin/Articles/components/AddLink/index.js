import React, { useState } from "react";

import styles from "./styles.module.scss";

const AddLink = ({article, setActive}) => {
    const [link, setLink] = useState({
        a_text: "",
        a_href: "",
    });

    const handleClickAddLink = () => {
        article.content.push(link);
        setLink({a_text: "", a_href: ""});
        setActive(false);
    };
    
    return (
        <div className={styles.container}>
            <h2>Текст ссылки</h2>
            <input 
                onChange={(e) => setLink({...link, a_text: e.target.value})}
                className={styles.input} type="text" value={link.a_text} />
            <h2>Ссылка</h2>
            <input 
                onChange={(e) => setLink({...link, a_href: e.target.value})}
                className={styles.input} type="text" value={link.a_href} />
            <button onClick={handleClickAddLink}>Добавить ссылку</button>
        </div>
    );
};

export { AddLink };