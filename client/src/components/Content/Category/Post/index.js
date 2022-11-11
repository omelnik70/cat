import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UPDATE_ARTICLE_MUTATION } from '../../../../apollo/mutations';
import { wilsonScore } from '../../../Helper/Helper';
import Separator from '../../../Separator';

import styles from "./styles.module.scss";

function Post ({ articles, lang, site }) {

    const [propertiesArt, setPropertiesArt] = useState({
        likeHide: false,
        dislikeHide: false,
        styleMessage: true,
    });

    const likeBlock = site.textsites.filter(item => lang === item.lang.id)[0];
    const { id, like, dislike, previews, content, title } = articles;
    const { likeHide, dislikeHide, styleMessage } = propertiesArt;

    console.log(likeHide, dislikeHide, styleMessage);

    const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);

    useEffect(() => {
            updateArticle({
                variables: {
                    id,
                    previews: previews + 1,
                },
            });
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPropertiesArt({ 
                ...propertiesArt, 
                styleMessage: false,
            });
        }, 5000);
        return () => clearTimeout(timer);
      }, [likeHide, dislikeHide]);

    const handleLike = () => {
        const likeSum = like + 1;
        const rate = wilsonScore(likeSum, dislike);
        updateArticle({
            variables: {
                id,
                like: likeSum,
                rating: rate,
            },
        });
        setPropertiesArt({ 
            ...propertiesArt, 
            likeHide: true,
            dislikeHide: true,
        });
    };

    const handleDislike = () => {
        const dislikeSum = dislike + 1;
        const rate = wilsonScore(like, dislikeSum);
        updateArticle({
            variables: {
                id,
                dislike: dislikeSum,
                rating: rate,
            },
        });
        setPropertiesArt({ 
            ...propertiesArt, 
            likeHide: true,
            dislikeHide: true,
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            {content.map((item, index) => (
                <div className={styles.text} key={index}>
                    {item.text_1 && item.text_1}
                    {item.imgSrc && (<div className={styles.containerImg}><img src={item.imgSrc} alt="" title={item.imgTitle} /><span>{item.imgTitle}</span></div>)}
                    {(item.strong && !(item.li_1 || item.li_2)) && (<strong>{item.strong}</strong>)}
                    {(item.aHref && !(item.li_1 || item.li_2)) && (item.aHref.indexOf('http') ? <Link to={item.aHref}>{item.aText}</Link> : <a href={item.aHref}>{item.aText}</a>)}
                    {item.text_2 && item.text_2}
                    {(item.li_1 || item.li_2) && (
                        <ul>
                            <li>{item.li_1 && item.li_1}
                                {item.strong && (<strong>{item.strong}</strong>)}
                                {item.aHref && (item.aHref.indexOf('http') ? <Link to={item.aHref}>{item.aText}</Link> : <a href={item.aHref}>{item.aText}</a>)}
                                {item.li_2 && item.li_2}
                            </li>
                        </ul>
                    )}
                </div>
            ))}
            <Separator />
            <div className={styles.likeContainer}>
                <h4>{likeBlock.likeInfo}</h4>
                <div  className={styles.likes} disabled={likeHide || dislikeHide}>
                    {(likeHide || dislikeHide) && (
                        <p 
                            className={styleMessage ? styles.showMessage : styles.hideMessage} 
                        >
                            Ваше мнение учтено, спасибо за участие в опросе!
                        </p>
                    )}
                    <button 
                        className={(likeHide || dislikeHide) ? `${styles.like} ${styles.btnDisabled}` : styles.like} 
                        onClick={handleLike} 
                        disabled={likeHide}
                    >
                        &#128077; {likeBlock.like}
                        <span>{like}</span>
                    </button>
                    <button 
                        className={(likeHide || dislikeHide) ? `${styles.like} ${styles.btnDisabled}` : styles.like}  
                        onClick={handleDislike} 
                        disabled={dislikeHide}>
                            &#128078; {likeBlock.dislike}
                            <span>{dislike}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Post;