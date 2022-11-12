import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import ShortDescriptionArticle from '../../ShortDescriptionArticle';
import Context from '../../../Context';
import Pagination from '../../Pagination';
import assets from '../../../assets';
import Separator from '../../Separator';

import styles from './styles.module.scss';


function Faq ({ article }) {
    const { state } = useContext(Context);
    const { currentListArt, popularArticles, lang } = state;
    const LIMITART = 4;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = popularArticles;
    const title = langUa ? ua : langRu ? ru : en;

    const byField = (field) => {
        return (a, b) => a[field] < b[field] ? 1 : -1;
    };

    const articles = article.map(item => item.article.map(i => i)).flat().sort(byField('rating'));

    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
                <div className={styles.titleBox}>
                    <h2 className={styles.faqTitle}>{title}</h2>
                    <Separator />
                </div>
                <div className={styles.faqMenuBox}>
                    <div className={styles.faqMenu}>
                        {currentListArt.map(item => (
                            <div key={item.id}>
                                <Link to={`/${item.category.link}/${item.link}`}>
                                    <h3 className={styles.articleTitle}>{item.title}</h3>
                                </Link>
                                <ShortDescriptionArticle item={item} />
                            </div>
                        ))}
                    </div>
                    <div className={styles.image}>
                        <img src={assets.IMAGES.FAQ} alt="" />
                    </div>
                </div>
            </div>
            <Pagination artConstant={articles} limit={LIMITART} />
        </div>
    );
}

export default Faq;