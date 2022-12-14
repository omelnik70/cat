import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ref, update } from "firebase/database";

import CommentList from './components/commentsList';
import { database } from '../../../../firebase';
import { wilsonScore } from '../../../Helper/Helper';
import Separator from '../../../Separator';

import styles from "./styles.module.scss";

function Post ({ articles, lang, text, data, userId, titleSite }) {
    const { id, title, like, dislike, previews, category, content } = articles;
    const [propertiesArt, setPropertiesArt] = useState({
        likeHide: false,
        dislikeHide: false,
        styleMessage: true,
    });
    const { pathname } = useLocation();
    
    const { link } = category;
    const cat = data.filter(cat => cat.lang.id === lang);
    const currentCat = cat.filter(item => item.link === link)[0];
    const { name } = currentCat;
    const metaDiscription = document.getElementsByName("description")[0];
    const metaKeywords = document.getElementsByName("keywords")[0];
    const linkRu = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "ru");
    const linkUa = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "uk");
    const linkEn = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "en");
    const head = document.querySelector('title');
    head.textContent = `${title} | ${titleSite}`;
    metaKeywords.content = `${name} AliExpress`;
    metaDiscription.content = `AliExpress - ${title}`;
    linkRu.href = `ru/${pathname.slice(4)}`;
    linkUa.href = `ua/${pathname.slice(4)}`;
    linkEn.href = `en/${pathname.slice(4)}`;

    const { likeHide, dislikeHide } = propertiesArt;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = text;
    const helpfulInfo = langUa ? ua.helpful : langRu ? ru.helpful : en.helpful;
    const likeText = langUa ? ua.like : langRu ? ru.like : en.like;
    const dislikeText = langUa ? ua.dislike : langRu ? ru.dislike : en.dislike;
    const more = langUa ? ua.more : langRu ? ru.more : en.more;
    const confirm = langUa ? ua.confirm : langRu ? ru.confirm : en.confirm;
    const cancel = langUa ? ua.cancel : langRu ? ru.cancel : en.cancel;
    const info = langUa ? ua.info : langRu ? ru.info : en.info;
    const register = langUa ? ua.register : langRu ? ru.register : en.register;
    const login = langUa ? ua.login : langRu ? ru.login : en.login;
    const add = langUa ? ua.add : langRu ? ru.add : en.add;
    const iCat = data.map((item) => item.link === category.link ? item.lang.id : '').findIndex(item => item === lang);
    const iArt = data[iCat].article.findIndex(item => item.id === id);
    const linkRef = `data/categories/${iCat}/article/${iArt}`;
    
    useEffect(() => {
        const likeRef = ref(database, linkRef);
        update(likeRef, {
            previews: previews + 1
        });
    }, []);

    const handleLike = () => {
        const likeSum = like + 1;
        const rate = wilsonScore(likeSum, dislike);
        
        setPropertiesArt({ 
            ...propertiesArt, 
            likeHide: true,
            dislikeHide: true,
        });

        const likeRef = ref(database, linkRef);
        update(likeRef, {
            like: likeSum,
            rating: rate,
        });
    };

    const handleDislike = () => {
        const dislikeSum = dislike + 1;
        const rate = wilsonScore(like, dislikeSum);

        setPropertiesArt({ 
            ...propertiesArt, 
            likeHide: true,
            dislikeHide: true,
        });

        const likeRef = ref(database, linkRef);
        update(likeRef, {
            dislike: dislikeSum,
            rating: rate,
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.textBox}>
                {content.map((item, index) => (
                    <div className={styles.text} key={index}>
                        {item.text_1 && item.text_1}
                        {item.imgSrc && (<div className={styles.containerImg}><img src={item.imgSrc} alt="" title={item.imgTitle} /><span>{item.imgTitle}</span></div>)}
                        {(item.strong && !(item.li_1 || item.li_2)) && (<strong>{item.strong}</strong>)}
                        {(item.aHref && !(item.li_1 || item.li_2)) && (item.aHref.indexOf('http') ? <Link to={`/${lang === "6311a2434690f0b08bf74075" ? `ua`: lang === "6311a25b4690f0b08bf74077" ? `ru` : `en`}${item.aHref}`}>{item.aText}</Link> : <a href={item.aHref}>{item.aText}</a>)}
                        {item.text_2 && item.text_2}
                        {(item.li_1 || item.li_2) && (
                            <ul>
                                <li>{item.li_1 && item.li_1}
                                    {item.strong && (<strong>{item.strong}</strong>)}
                                    {item.aHref && (item.aHref.indexOf('http') ? <Link to={`/${lang === "6311a2434690f0b08bf74075" ? `ua`: lang === "6311a25b4690f0b08bf74077" ? `ru` : `en`}${item.aHref}`}>{item.aText}</Link> : <a href={item.aHref}>{item.aText}</a>)}
                                    {item.li_2 && item.li_2}
                                </li>
                            </ul>
                        )}
                    </div>
                ))}
            </div>
            <Separator />
            <div className={styles.likeContainer}>
                <h4>{helpfulInfo}</h4>
                <div  className={styles.likes} disabled={likeHide || dislikeHide}>
                    <button 
                        className={(likeHide || dislikeHide) ? `${styles.like} ${styles.btnDisabled}` : styles.like} 
                        onClick={handleLike} 
                        disabled={likeHide}
                    >
                        &#128077; {likeText}
                        <span>{like}</span>
                    </button>
                    <button 
                        className={(likeHide || dislikeHide) ? `${styles.like} ${styles.btnDisabled}` : styles.like}  
                        onClick={handleDislike} 
                        disabled={dislikeHide}>
                            &#128078; {dislikeText}
                            <span>{dislike}</span>
                    </button>
                </div>
            <CommentList 
                articleId={id} 
                userId={userId} 
                articleTitle={title}
                more={more}
                confirm={confirm}
                cancel={cancel}
                info={info}
                register={register}
                loginText={login}
                add={add}
            />
            </div>
        </div>
    );
}

export default Post;