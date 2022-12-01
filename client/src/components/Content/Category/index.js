import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import Pagination from '../../Pagination';
import ShortDescriptionArticle from '../../ShortDescriptionArticle';
import Context from '../../../Context';
import Separator from '../../Separator';
import { currentArt } from '../../../data/actions';

import styles from "./styles.module.scss";


function Category () {
    const { dispatch, state, data } = useContext(Context);
    const { category } = useParams();
    const { currentListArt, lang } = state;
    const { categories } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const articlesCurrent = cat && cat.filter(item => item.link === category)[0];
    const { name, article } = articlesCurrent;
    const LIMITART = 5;

    const handleClickArticle = (id) => {
        dispatch(currentArt(id));
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.contentBox}>
                <h2 className={styles.categoryTitle}>{name}</h2>
                <Separator />
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
            <Pagination artChangeable={article} limit={LIMITART} />
        </div>
    );
}

export default Category;