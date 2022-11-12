import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import Search from './Search';
import Faq from './Faq';
import SearchResult from './Search/SearchResult';
import Context from '../../Context';
import Navbar from './Navbar';
import Category from './Category';
import Post from './Category/Post';

import styles from './styles.module.scss';


function Content () {
    const { state, dataCat } = useContext(Context);
    const { lang, search, postText } = state;
    const { category, post } = useParams();

    const cat = dataCat.categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat.filter(item => item.link === category)[0];
    const articleCurrent = post ? articlesCurrent.article.filter(item => post === item.link)[0] : {};

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
            (<Post articles={articleCurrent} lang={lang} text={postText} />) :
            (<div className={styles.contentBox}>
                <Search />
                <SearchResult />
                {!search && (<Faq article={cat} />)}
            </div>)}
            </>) :
            (<div className={styles.contentBox}>
                <Search />
                {!search && (<Faq article={cat} />)}
            </div>
            )}
        </div>
    );
}

export default Content;