import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import LazyLoad from '../../LazyLoad';
import Pagination from '../../Pagination';
import ShortDescriptionArticle from '../../ShortDescriptionArticle';
import Context from '../../../Context';
import Separator from '../../Separator';
import { currentArt } from '../../../data/actions';

import styles from "./styles.module.scss";


function Category ({ fn, title }) {
    const { dispatch, state, data } = useContext(Context);
    const { category } = useParams();
    const { currentListArt, lang } = state;
    const { categories } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat.filter(item => item.link === category)[0];
    const { name, article } = articlesCurrent;
    const LIMITART = 12;
    const metaDiscription = document.getElementsByName("description")[0];
    const metaKeywords = document.getElementsByName("keywords")[0];
    const head = document.querySelector('title');
    const linkRu = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "ru");
    const linkUa = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "uk");
    const linkEn = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "en");
    head.textContent = `${name} AliExpress | ${title}`;
    metaKeywords.content = article.map(meta => `${meta.title}`).join(', ');
    metaDiscription.content = `${name} AliExpress`;
    linkRu.href = `ru/${category}`;
    linkUa.href = `ua/${category}`;
    linkEn.href = `en/${category}`;

    const handleClickArticle = (id) => {
        dispatch(currentArt(id));
        fn();
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
                <h2 className={styles.categoryTitle}>{name}</h2>
                <Separator />

                <div className={styles.desktop}>
                    {currentListArt.map(art => (
                        <div key={art.id} >
                            <Link 
                                key={art.id} 
                                to={`/${lang === "6311a2434690f0b08bf74075" ? `ua`: lang === "6311a25b4690f0b08bf74077" ? `ru` : `en`}/${art.category.link}/${art.link}`}
                            >
                                <h3 onClick={() => handleClickArticle(art.id)}>{art.title}</h3>
                            </Link>
                            <ShortDescriptionArticle item={art} />
                        </div>
                    ))}
                </div>

                <LazyLoad arr={article} int={10} lang={lang} flag={'art'} fn={fn} />

            </div>

            <div className={styles.desktop}>
                <Pagination artChangeable={article} limit={LIMITART} />
            </div>

        </div>
    );
}

export default Category;