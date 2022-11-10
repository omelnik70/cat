import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../../Context';
import Pagination from '../../Pagination';
import assets from '../../../assets';
import Separator from '../../Separator';

import styles from './styles.module.scss';


function Faq ({ title, article }) {
    const { state } = useContext(Context);
    const { currentListArticles } = state;

    const articles = article.map(item => item.article.map(i => i)).flat();

    return (
        <div className={styles.container}>
            <div className={styles.titleBox}>
                <h2 className={styles.faqTitle}>{title}</h2>
                <Separator />
            </div>
            <div className={styles.faqMenuBox}>
                <div className={styles.faqMenu}>
                    {currentListArticles.map(item => (
                        <div key={item.id}>
                            <Link to={`/${item.category.link}/${item.link}`}>
                                <h3 className={styles.articleTitle}>{item.title}</h3>
                            </Link>
                            <div className={styles.shortDescription}>
                                {item.content.map(item => (
                                    <div className={styles.text} key={item.id}>
                                        {item.text_1 && item.text_1}
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
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.image}>
                    <img src={assets.IMAGES.FAQ} alt="" />
                </div>
            </div>
            <Pagination articles={articles} limit={5} />
        </div>
    );
}

export default Faq;