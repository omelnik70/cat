import React, { useState } from "react";

import styles from "./styles.module.scss";

const AddImg = ({article, setActive}) => {
    const [img, setImg] = useState({
        img: "",
    });

    const handleClickAddImg = () => {
        article.content.push(img);
        setImg({img: ""});
        setActive(false);
    };
    
    return (
        <div className={styles.container}>
            <h2>Ссылка картинки</h2>
            <input 
                onChange={(e) => setImg({...img, img: e.target.value})}
                className={styles.input} type="text" value={img.img} />
            <button onClick={handleClickAddImg}>Добавить картинку</button>
        </div>
    );
};

export { AddImg };