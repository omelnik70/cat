import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { currentAvatar } from '../../data/actions';
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
    const { state, data, dispatch } = useContext(Context);
    const { lang, search, postText, userValid, usersPage } = state;
    const { category, post, id } = useParams();
    const navigate = useNavigate();

    const { users, categories } = data;

    const user = users && users.filter(item => id === item.uid)[0];
    const cat = categories && categories.filter(cat => cat.lang.id === lang);

    const articlesCurrent = cat && cat.filter(item => item.link === category)[0];
    const articleCurrent = articlesCurrent && articlesCurrent.article.filter(item => post === item.link)[0];
    const goBack = () => navigate((userValid !== '/login' && user) ? userValid : '/');

    useEffect(() => {
        if (user) {
            const { avatar } = user;
            dispatch(currentAvatar(avatar));
        };
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
                {!search && id && user && (<User id={id} user={user} link={userValid} data={users} dispatch={dispatch} lang={lang} usersPage={usersPage} />)}
            </div>)}
            </>) :
            (<div className={styles.contentBox}>
                <Search />
                {search && (<SearchResult />)}
                {!search && !id && (<Faq article={cat} />)}
                {!search && id && user && (<User id={id} user={user} link={userValid} data={users} dispatch={dispatch} lang={lang} usersPage={usersPage} />)}
            </div>
            )}
        </div>
    );
}

export default Content;