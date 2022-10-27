import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_ARTICLE_MUTATION } from '../../../../apollo/mutations';
import { wilsonScore } from '../../../Helper/Helper';

import styles from "./styles.module.scss";


function Post ({ contents, articles, lang, post, site }) {
    
    const article = articles.articles.filter(item => post === item.link);
    const currentArticle = article.filter(item => lang === item.category.lang.id)[0];
    const likeBlock = site.textsites.filter(item => lang === item.lang.id)[0];
    const content = contents.contents.filter(item => item.article.id === currentArticle.id);
    const { id, like, dislike, previews, rating } = currentArticle;

    const [propertiesArt, setPropertiesArt] = useState({
        id,
        like,
        dislike,
        previews,
        rating,
        likeHide: false,
        dislikeHide: false,
    });

    console.log(propertiesArt);

    const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);

    useEffect(() => {
        setPropertiesArt({
            ...propertiesArt, 
            id: id,
            like: like,
            dislike: dislike,
            rating: wilsonScore(like, dislike),
        })
    }, [id, like, dislike]);

    useEffect(() => {
        setPropertiesArt({...propertiesArt, previews: propertiesArt.previews + 1});
    }, []);

    useEffect(() => {
        updateArticle({
            variables: {
                id: propertiesArt.id,
                previews: propertiesArt.previews,
                like: propertiesArt.like,
                dislike: propertiesArt.dislike,
            },
        });
    }, [updateArticle, propertiesArt.id, propertiesArt.previews, propertiesArt.like, propertiesArt.dislike]);

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
            <div className={styles.lines}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
            </div>
            <div className={styles.likeContainer}>
                <h4>{likeBlock.likeInfo}</h4>
                <div  className={styles.likes}>
                    {(likeHide || dislikeHide) && (<p className={styles.message} >Ваше мнение учтено, спасибо за участие в опросе!</p>)}
                    <button className={styles.like} onClick={handleLike} disabled={propertiesArt.likeHide}>&#128077; {likeBlock.like}<span>{like}</span></button>
                    <button className={styles.dislike}  onClick={handleDislike}  disabled={propertiesArt.dislikeHide}>&#128078; {likeBlock.dislike}<span>{dislike}</span></button>
                </div>
            </div>
        </div>
    );
}

export default Post;