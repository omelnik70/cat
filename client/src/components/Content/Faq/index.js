import React from 'react';

import assets from '../../../assets';

import styles from './styles.module.scss';


function Faq ({ titlePopularArticles, article, content }) {

    return (
        <div className={styles.container}>
            <div className={styles.faqMenuBox}>
                <h2 className={styles.faqTitle}>{titlePopularArticles.titlePopularArticles}</h2>
                <ul className={styles.faqMenu}>
                    {/* {data.articles.map(({ title }, index) => 
                        <li key={index} className={styles.faqLink}><a href="https://faq.whatsapp.com/">{title}</a></li>
                    )} */}
                </ul>
            </div>
            <div className={styles.image}>
                <img src={assets.IMAGES.FAQ} alt="" />
            </div>
        </div>
    );
}

export default Faq;