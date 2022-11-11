import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';


function ShortDescriptionArticle ({ item }) {

    return (
        <div className={styles.shortDescription}>
            {item.content.map(item => (
                <div className={styles.text} key={item.id} >
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
    );
}

export default ShortDescriptionArticle;