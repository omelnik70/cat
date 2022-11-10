import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../../../Context';
import Pagination from '../../../Pagination';
import Separator from '../../../Separator';

import styles from './styles.module.scss';


function SearchResult () {
    const { dataCat, state } = useContext(Context);
    const { lang, search, currentListArticles } = state;
    const articleLang = dataCat.categories.filter(item => lang === item.lang.id);
    const articles = articleLang.map(item => item.article.map(i => i)).flat();
    const resultSearchArticles = articles.filter(art => {
        return art.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className={styles.container}>
            {search && Boolean(currentListArticles.length) && (
                <>
                    <h3>Результаты поиска:</h3>
                    <Separator />
                </>
            )}
            {search && currentListArticles.map(art => (
                <div key={art.id} >
                    <Link 
                        to={`/${art.category.link}/${art.link}`}
                    >
                        <h3>{art.title}</h3>
                    </Link>
                </div>
            ))}
            {!currentListArticles.length && (
                <>
                    <h3>Результаты поиска:</h3>
                    <Separator />
                    <p>Ничего не найдено, попробуйте изменить запрос.</p>
                </>
            )}
            {search && <Pagination articles={resultSearchArticles} limit={6} />}
        </div>
    );
}

export default SearchResult;