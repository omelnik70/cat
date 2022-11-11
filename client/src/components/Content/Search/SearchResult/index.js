import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import ShortDescriptionArticle from '../../../ShortDescriptionArticle';
import { resultSearchArticles } from '../../../../data/actions';
import Context from '../../../../Context';
import Pagination from '../../../Pagination';
import Separator from '../../../Separator';

import styles from './styles.module.scss';


function SearchResult () {
    const { dataCat, state, dispatch } = useContext(Context);
    const { lang, search, currentListArt, resultSearchArt } = state;
    const articleLang = dataCat.categories.filter(item => lang === item.lang.id);
    const articles = articleLang.map(item => item.article.map(i => i)).flat();
    const LIMITART = 5;

    useEffect(() => {
        dispatch(resultSearchArticles(articles.filter(art => {
            return art.title.toLowerCase().includes(search.toLowerCase());
        })))
    }, [search]);

    return (
        <div className={styles.container}>
            {search && Boolean(currentListArt.length) && (
                <>
                    <h2 className={styles.searchTitle}>Результаты поиска</h2>
                    <Separator />
                </>
            )}
            {search && currentListArt.map(art => (
                <div key={art.id} >
                    <Link 
                        to={`/${art.category.link}/${art.link}`}
                    >
                        <h3 className={styles.articleTitle}>{art.title}</h3>
                    </Link>
                    <ShortDescriptionArticle item={art} />
                </div>
            ))}
            {!currentListArt.length && (
                <>
                    <h2 className={styles.searchTitle}>Результаты поиска</h2>
                    <Separator />
                    <p>Ничего не найдено, попробуйте изменить запрос.</p>
                </>
            )}
            {search && (<Pagination artChangeable={resultSearchArt} limit={LIMITART} />)}
        </div>
    );
}

export default SearchResult;