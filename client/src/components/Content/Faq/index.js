import React from 'react';

import assets from '../../../assets';
import Prewiew from '../../../pages/Admin/components/Article/components/Prewiew';

import styles from './styles.module.scss';


function Faq ({ titlePopularArticles, article, content }) {

    return (
        <div className={styles.container}>
            <div className={styles.faqMenuBox}>
                <h2 className={styles.faqTitle}>{titlePopularArticles.titlePopularArticles}</h2>
                <Prewiew article={article} content={content} />
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