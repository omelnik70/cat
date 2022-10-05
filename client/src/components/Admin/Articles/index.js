import React, { useState } from "react";

import { AddText } from "./components/AddText";
import { AddList } from "./components/AddList";
import { AddImg } from "./components/AddImg";
import { AddLink } from "./components/AddLink";
import Modal from "../../Modal";

import styles from "./styles.module.scss";

const AddArticle = () => {
    const [add, setAdd] = useState('');
    const [modalActive, setModalActive] = useState(null);
    const [article, setArticle] = useState({
            lang: "",
            category: {title: "", link: "",},
            post: {title: "", link: "",},
            content: [],
    });

    const handleClickOpenModal = (str) => {
        setModalActive(true);
        setAdd(str);
    };

    const handleClickAddArticle = () => {
        setArticle({
            lang: "",
            category: {title: "", link: "",},
            post: {title: "", link: "",},
            content: [],
        });
        setModalActive(false);
    };

    return (
        <div className={styles.container}>
            <select 
                onChange={(e) => setArticle({...article, lang: e.target.value})}
                className={styles.select} name="lang">
                    <option value="">Выберите язык</option>
                    <option value="ru">Русский язык</option>
                    <option value="ua">Украінська мова</option>
                    <option value="en">English</option>
            </select>
            <h2>Название категории</h2>
            <input 
                onChange={(e) => setArticle({...article, category: {...article.category, title: e.target.value}})}
                className={styles.input} type="text" value={article.category.title} />
            <h2>Ссылка категории</h2>
            <input 
                onChange={(e) => setArticle({...article, category: {...article.category, link: e.target.value}})}
                className={styles.input} type="text" value={article.category.link} />
            <h2>Название статьи</h2>
            <input 
                onChange={(e) => setArticle({...article, post: {...article.post, title: e.target.value}})}
                className={styles.input} type="text" value={article.post.title} />
            <h2>Ссылка статьи</h2>
            <input 
                onChange={(e) => setArticle({...article, post: {...article.post, link: e.target.value}})}
                className={styles.input} type="text" value={article.post.link} />
            <div className={styles.button}>
                <button onClick={() => handleClickOpenModal("text")}>Добавить текст</button>
                <button onClick={() => handleClickOpenModal("img")}>Добавить картинку</button>
                <button onClick={() => handleClickOpenModal("list")}>Добавить список</button>
                <button onClick={() => handleClickOpenModal("link")}>Добавить ссылку</button>
            </div>
            <div className={styles.main_button}>
                <button onClick={() => handleClickAddArticle("link")}>Добавить статью</button>
            </div>   
           {add === "list" ?
            (<Modal active={modalActive} setActive={setModalActive}>
                <AddList article={article} setActive={setModalActive} />
            </Modal>) :
            add === "img" ?
            (<Modal active={modalActive} setActive={setModalActive}>
                <AddImg article={article} setActive={setModalActive} />
            </Modal>) :
            add === "text" ? 
            (<Modal active={modalActive} setActive={setModalActive}>
                <AddText article={article} setActive={setModalActive} />
            </Modal>) :
            (<Modal active={modalActive} setActive={setModalActive}>
                <AddLink article={article} setActive={setModalActive} />
            </Modal>)}
        </div>
    );
};

export default  AddArticle;