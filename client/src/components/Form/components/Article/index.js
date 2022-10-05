import React from "react";

import styles from "./styles.module.scss"

const Article = () => {
    return (
        <div className={styles.container}>
            <input className={styles.title} type="text" />
            <input className={styles.content} type="textarea" />
            <button className={styles.button}>Добавить статью</button>
        </div>
    );
};

export default Article;