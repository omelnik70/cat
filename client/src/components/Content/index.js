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
    const { state, dataCat, dataArt, dataContent, dataSite } = useContext(Context);
    const { category, post } = useParams();
    const { lang, art } = state;
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    window.addEventListener('resize', () => setScreenWidth(window.screen.width));

    const content = dataSite.textsites.filter(title => title.lang.id === lang)[0];
    const cat = dataCat.categories.filter(cat => cat.lang.id === lang);
    const articleCurrent = cat.filter(item => item.link === category)[0];

    return (
        <div className={styles.container}>
            {screenWidth > state.global.SCREENWIDTH ? 
            (<>
            <Navbar data={cat} />

            {category && !post ? 
            (<Category data={articleCurrent} href={category} />) :
            post ?
            (<Post id={art} />) :
            (<div className={styles.contentBox}>
                <Search titleSearch={content} />
                <Faq titlePopularArticles={content} article={dataArt} content={dataContent} />
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