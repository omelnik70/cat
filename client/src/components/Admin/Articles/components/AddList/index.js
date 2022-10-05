import React, { useState } from "react";

import styles from "./styles.module.scss";

const AddList = ({article, setActive}) => {
    const [list, setList] = useState({
        list_text: "", 
        a_text: "",
        a_href: "",
    });

    const handleClickAddList = () => {
        article.content.push(list);
        setList({list_text: "", a_text: "", a_href: ""});
        setActive(false);
    };

    return (
        <div className={styles.container}>
            <h2>Текст списка</h2>
            <input 
                onChange={(e) => setList({...list, list_text: e.target.value})}
                className={styles.input} type="text" value={list.list_text} />
            <h2>Текст ссылки, если элемент содержит ссылку</h2>
            <input 
                onChange={(e) => setList({...list, a_text: e.target.value})}
                className={styles.input} type="text" value={list.a_text} />
            <h2>Ссылка</h2>
            <input 
                onChange={(e) => setList({...list, a_href: e.target.value})}
                className={styles.input} type="text" value={list.a_href} />
            <button onClick={handleClickAddList}>Добавить список</button>
        </div>
    );
};

export { AddList };