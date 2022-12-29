import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ShortDescriptionArticle from '../ShortDescriptionArticle';
import Comment from '../Content/Category/Post/components/comment';

import styles from "./styles.module.scss";


function LazyLoad ({ arr, int, lang, flag, uid, confirm, reset, fn }) {
    //динамическая пагинация
    const[currentArr, setCurrentArr] = useState([]); //текущий массив
    const[currentCountElement, setCurrentCountElement] = useState(int); //количество выводимых элементов массива изначально
    const[fetching, setFetching] = useState(false); //флаг, сигнализирующий о достижении низа страницы

    //динамическая пагинация
    //оставляем количество элементов = currentPage, при изменении языка, перегружаем массив
    //при изменении currentPage меняем массив элементов для отображения
    useEffect(() => {
        const visibleArr = arr.filter((item, index) => index < currentCountElement);
        setCurrentArr(visibleArr);
    }, [lang, arr, currentCountElement]);

    //при достижении низа страницы, меняем количество элементов для отображения (+int)
    useEffect(() => {
        if(fetching) {
            setCurrentCountElement(currentCountElement + int);
        }
    }, [fetching]);

    //получаем события скролла на странице и удаляем после получения
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    //при достижении низа странице меняет флаг Fetching на true и обратно при удалении от низа
    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        } else {
            setFetching(false);
        };
    };
    //динамическая пагинация

    return (
        <div className={styles.mobile}>
            {currentArr.map(item => (
                flag === 'art' && (<div key={item.id}>
                    <Link to={`/${lang === "6311a2434690f0b08bf74075" ? `ua`: lang === "6311a25b4690f0b08bf74077" ? `ru` : `en`}/${item.category.link}/${item.link}`}>
                        <h3 onClick={fn} className={styles.articleTitle}>{item.title}</h3>
                    </Link>
                    <ShortDescriptionArticle item={item} />
                </div>)
            ))}
            {Boolean(currentArr.length) && currentArr.map((item, index) => (
                flag === 'com' && 
                (<Comment 
                    key={index}
                    keyId={item.keyId} 
                    avatar={item.avatar} 
                    login={item.login} 
                    text={item.text} 
                    like={item.like} 
                    dislike={item.dislike} 
                    timestamp={item.timestamp}
                    articleId={item.articleId}
                    userId={item.userId}
                    uid={uid}
                />)
            ))}
            {currentArr && currentArr.map((item, index) => (
                flag === 'user' && 
                        (<Comment 
                            key={index} 
                            avatar={item.avatar} 
                            login={item.login} 
                            timestamp={item.timestamp} 
                            text={item.text} 
                            like={item.like} 
                            dislike={item.dislike} 
                            articleId={item.articleId} 
                            userId={item.userId}
                            articleTitle={item.articleTitle}
                            articleLink={item.articleLink}
                            keyId={item.keyId} 
                            flag={true}
                            confirm={confirm}
                            cancel={reset}
                        />)
                ))}
        </div>
    );
}

export default LazyLoad;