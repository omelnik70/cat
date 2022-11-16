import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Search from './Search';
import Faq from './Faq';
import SearchResult from './Search/SearchResult';
import Context from '../../Context';
import Navbar from './Navbar';
import Category from './Category';
import Post from './Category/Post';
import User from '../../pages/User';

import styles from './styles.module.scss';

function Content () {
    const { state, dataCat, dataUsers } = useContext(Context);
    const { lang, search, postText, userValid } = state;
    const { category, post, id } = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(userValid && user ? userValid : '/');

    const { users } = dataUsers;
    const user = users.filter(item => id === item.uid)[0];
    const cat = dataCat.categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat.filter(item => item.link === category)[0];
    const articleCurrent = post ? articlesCurrent.article.filter(item => post === item.link)[0] : {};

    useEffect(() => {
        goBack();
    }, [user, userValid]);

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
                {search && (<SearchResult />)}
                {!search && !id && (<Faq article={cat} />)}
                {!search && id && user && (<User id={id} user={user} />)}
            </div>)}
            </>) :
            (<div className={styles.contentBox}>
                <Search />
                {search && (<SearchResult />)}
                {!search && !id && (<Faq article={cat} />)}
                {!search && id && user && (<User id={id} user={user} />)}
            </div>
            )}
        </div>
    );
}

export default Content;