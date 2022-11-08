import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Search from './Search';
import Faq from './Faq';
import Context from '../../Context';
import Navbar from './Navbar';
import Category from './Category';
import Post from './Category/Post';

import styles from './styles.module.scss';


function Content () {
    const { state, dataCat, dataSite } = useContext(Context);
    const { lang } = state;
    const { category, post } = useParams();

    const cat = dataCat.categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat.filter(item => item.link === category)[0];
    console.log(articlesCurrent);
    const articleCurrent = post ? articlesCurrent.article.filter(item => post === item.link)[0] : {};
    const content = dataSite.textsites.filter(title => title.lang.id === lang)[0];

    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    window.addEventListener('resize', () => setScreenWidth(window.screen.width));

    return (
        <div className={styles.container}>
            {screenWidth > state.global.SCREENWIDTH ? 
            (<>
            <Navbar data={cat} />

            {category && !post ? 
            (<Category data={articlesCurrent} href={category} />) :
            post ?
            (<Post articles={articleCurrent} lang={lang} site={dataSite} />) :
            (<div className={styles.contentBox}>
                <Search titleSearch={content} />
                <Faq titlePopularArticles={content} article={dataCat} content={dataCat} />
            </div>)}
            </>) :
            (<div className={styles.contentBox}>
                <Search titleSearch={content} />
                <Faq titlePopularArticles={content} />
            </div>
            )}
        </div>
    );
}

export default Content;