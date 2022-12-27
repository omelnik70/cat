import React, { useContext, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { currentSearch } from '../../data/actions';
import assets from '../../assets';
import Search from './Search';
import Faq from './Faq';
import SearchResult from './Search/SearchResult';
import Context from '../../Context';
import Navbar from './Navbar';
import Category from './Category';
import Post from './Category/Post';
import User from '../../pages/User';
import NewUsers from './NewUsers';
//import ContentMenu from './ContentMenu';
import AboutAli from '../Content/AboutAli';
import Adds from '../Content/Adds';
import VideoPlayer from './VideoAdds';

import styles from './styles.module.scss';

function Content ({ title }) {
    const { state, data, dispatch } = useContext(Context);
    const { lang, search, postText, userValid, usersPage, avatar, uid, isUser } = state;
    const { category, post, id } = useParams();

    const navigate = useNavigate();
    const { users, categories } = data;
    const { VIDEO, IMAGES } = assets;
    const { ENLETYSHOPS, RULETYSHOPS, UALETYSHOPS } = VIDEO;
    const { LETYSHOPSLOGO } = IMAGES;
    const user = users && id && Object.values(users).filter(item => id === item.uid)[0];
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat && cat.filter(item => item.link === category)[0];
    const articleCurrent = articlesCurrent && articlesCurrent.article.filter(item => post === item.link)[0];
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = usersPage;
    const text = langUa ? ua.text : langRu ? ru.text : en.text;
    const letyshops = langUa ? ua.letyshops : langRu ? ru.letyshops : en.letyshops;
    const register = langUa ? ua.register : langRu ? ru.register : en.register;
    const login = langUa ? ua.login : langRu ? ru.login : en.login;
    const video = langRu ? RULETYSHOPS : langUa ? UALETYSHOPS : ENLETYSHOPS;
  

    useEffect(() => {
        if(isUser && uid === id) navigate(userValid);
    }, [isUser]);

    const resetSearchResult = () => {
        dispatch(currentSearch(''));
    };

    return (
        <div className={styles.container}>
            <div className={styles.desctop}>
                <Navbar data={cat} fn={resetSearchResult} />
                <VideoPlayer video={video} poster={LETYSHOPSLOGO} add={letyshops} />
                <AboutAli />
            </div>
            <div className={styles.contentBox}>
                <Adds />
                <Search />
                {/* <ContentMenu data={cat} fn={resetSearchResult} /> */}
                <NewUsers />
                {search && (<SearchResult />)}
                {category && !post && !search && (<Category fn={resetSearchResult} title={title} />)}
                {post && !search && (
                        <Post 
                            articles={articleCurrent} 
                            lang={lang} 
                            text={postText} 
                            data={categories} 
                            userId={uid}
                            titleSite={title}
                        />
                    )}
                {!category && !search && !id && (<Faq article={cat} />)}
                {(isUser && id && !search && !category && !post) &&
                    (<User 
                        id={id} 
                        user={user} 
                        link={userValid} 
                        data={users} 
                        dispatch={dispatch} 
                        lang={lang} 
                        usersPage={usersPage} 
                        avatar={avatar}
                    />)}
                    {(!isUser && id && !search && !category && !post) && 
                        (<div className={styles.warningBox}>
                            <p>{text}</p>
                            <div className={styles.linkBox}>
                                <Link to="/register">{register}</Link>
                                    <span>{" | "}</span>
                                <Link to="/login">{login}</Link>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}

export default Content;