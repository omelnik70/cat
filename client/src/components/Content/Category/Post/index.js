import React, { useState } from 'react';

import styles from "./styles.module.scss";


function Post ({ contents, articles, lang, post }) {
    
    const article = articles.articles.filter(item => post === item.link);
    const currentArticle = article.filter(item => lang === item.category.lang.id)[0];
    const content = contents.contents.filter(item => item.article.id === currentArticle.id);
    const { like, dislike, previews, rating } = currentArticle;

    const [propertiesArt, setPropertiesArt] = useState({
        like: like,
        dislike: dislike,
        previews: previews,
        rating: rating,
        likeHide: false,
        dislikeHide: false,
    });

    const handleLike = () => {
        setPropertiesArt({ 
            ...propertiesArt, 
            like: propertiesArt.like + 1,
            likeHide: true,
            dislikeHide: true,
        });
    };

    const handleDislike = () => {
        setPropertiesArt({ 
            ...propertiesArt, 
            dislike: propertiesArt.dislike + 1,
            likeHide: true,
            dislikeHide: true,
        });
    };

    const { likeHide, dislikeHide } = propertiesArt;

    console.log(propertiesArt);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{currentArticle.title}</h2>
            {content.map((item, index) => (
                <div className={styles.text} key={index}>
                    {item.text_1 && item.text_1}
                    {item.imgSrc && (<div className={styles.containerImg}><img src={item.imgSrc} alt="" title={item.imgTitle} /><span>{item.imgTitle}</span></div>)}
                    {(item.strong && !(item.li_1 || item.li_2)) && (<strong>{item.strong}</strong>)}
                    {(item.aHref && !(item.li_1 || item.li_2)) && (<a href={item.aHref}>{item.aText}</a>)}
                    {item.text_2 && item.text_2}
                    {(item.li_1 || item.li_2) && (
                        <ul>
                            <li>{item.li_1 && item.li_1}
                                {item.strong && (<strong>{item.strong}</strong>)}
                                {item.aHref && (<a href={item.aHref}>{item.aText}</a>)}
                                {item.li_2 && item.li_2}
                            </li>
                        </ul>
                    )}
                </div>
            ))}
            <div className={styles.line}></div>
            <div className={styles.likeContainer}>
                <h4>Была ли информация полезной?</h4>
                <div  className={styles.likes}>
                    {(likeHide || dislikeHide) && (<p className={styles.message} >Ваше мнение учтено, спасибо за участие в опросе!</p>)}
                    <button onClick={handleLike} disabled={propertiesArt.likeHide}>Полезно</button>
                    <button  onClick={handleDislike}  disabled={propertiesArt.dislikeHide}>Бесполезно</button>
                </div>
            </div>
        </div>
    );
}

export default Post;