import React, { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import LazyLoad from '../../LazyLoad';
import Pagination from '../../Pagination';
import ShortDescriptionArticle from '../../ShortDescriptionArticle';
import Context from '../../../Context';
import Separator from '../../Separator';
import { currentArt } from '../../../data/actions';

import styles from "./styles.module.scss";


function Category ({ fn }) {
    const { dispatch, state, data } = useContext(Context);
    const { category } = useParams();
    const navigate = useNavigate();
    const { currentListArt, lang } = state;
    const { categories } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat.filter(item => item.link === category)[0];
    const { name, article } = articlesCurrent;
    const LIMITART = 10;

    const handleClickArticle = (id) => {
        dispatch(currentArt(id));
        fn();
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
                <h2 className={styles.categoryTitle}>{name}</h2>
                <Separator />

                <div className={styles.desktop}>
                    {currentListArt.map(art => (
                        <div key={art.id} >
                            <Link 
                                key={art.id} 
                                to={`/${category}/${art.link}`}
                            >
                                <h3 onClick={() => handleClickArticle(art.id)}>{art.title}</h3>
                            </Link>
                            <ShortDescriptionArticle item={art} />
                        </div>
                    ))}
                </div>

                <LazyLoad arr={article} int={10} lang={lang} flag={'art'} fn={fn} />

            </div>

            <div className={styles.desktop}>
                <Pagination artChangeable={article} limit={LIMITART} />
            </div>

        </div>
    );
}

export default Category;