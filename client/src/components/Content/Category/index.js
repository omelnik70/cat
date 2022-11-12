import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Pagination from '../../Pagination';
import ShortDescriptionArticle from '../../ShortDescriptionArticle';
import Context from '../../../Context';
import Separator from '../../Separator';
import { currentArt } from '../../../data/actions';

import styles from "./styles.module.scss";


function Category ({ data, href }) {
    const { dispatch, state } = useContext(Context);
    const { currentListArt } = state;
    const { name, article } = data;
    const LIMITART = 5;
    
    return (
        <div className={styles.container}>
            <h2 className={styles.categoryTitle}>{name}</h2>
            <Separator />
            {currentListArt.map(art => (
                <div key={art.id} >
                    <Link 
                        key={art.id} 
                        to={`/${href}/${art.link}`}
                    >
                        <h3 onClick={() => dispatch(currentArt(art.id))}>{art.title}</h3>
                    </Link>
                    <ShortDescriptionArticle item={art} />
                </div>
            ))}
            <Pagination artChangeable={article} limit={LIMITART} />
        </div>
    );
}

export default Category;