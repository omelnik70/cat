import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';

import Context from '../Context';
import Content from '../components/Content';
import Login from '../pages/Form/Login';
import Register from '../pages/Form/Register';
import Pages from '../pages';

const Routing = ({ title, lang }) => {
    const { state, data } = useContext(Context);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const link = pathname.slice(4);
    const { isUser } = state;
    const { categories, users } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const arrCategoryLink = cat.map(item => item.link);
    const arrCategories = cat.map(item => item.article);
    const arrArticles = arrCategories.flat();
    const arrUsers = Object.values(users);
    const isCategory = arrCategoryLink.filter(item => item === link).length;
    const isPost = arrArticles.filter(item => `${item.category.link}/${item.link}` === link).length;
    const isLinkUser = arrUsers.filter(item => `users/${item.uid}` === link).length;

    useEffect(() => {
        if (!link) {
            navigate(lang === "6311a2434690f0b08bf74075" ? "/ua" : lang === "6311a25b4690f0b08bf74077" ? "/ru" : "/en");
        } else {
            navigate(lang === "6311a2434690f0b08bf74075" ? `/ua/${link}` : lang === "6311a25b4690f0b08bf74077" ? `/ru/${link}` : `/en/${link}`);
        };
    }, [lang, link]);

    return (
        <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/:lng" element={<Content />} />
            <Route path="/:lng/privacy_policy" element={<Pages name={title} />} />
            <Route path="/:lng/about" element={<Pages name={title} />} />
            <Route path="/:lng/login" element={<Login />} />
            <Route path="/:lng/register" element={<Register />} />
            <Route path="/:lng/:category" element={ isCategory ? (<Content title={title} />) : (<Navigate replace to="/" />)} />
            <Route path="/:lng/:category/:post" element={ isPost ? (<Content title={title} />) : (<Navigate replace to="/" />)} />
            <Route path="/:lng/users/:id" element={ isLinkUser && isUser ? (<Content />) : (<Navigate replace to="/" />)} />
        </Routes>
    );
};

export default Routing;