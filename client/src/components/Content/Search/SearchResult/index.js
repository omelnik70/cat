import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../../../Context';
import Separator from '../../../Separator';

import styles from './styles.module.scss';


function SearchResult () {
    const { dataCat, state } = useContext(Context);
    const { lang, search } = state;
    const articleLang = dataCat.categories.filter(item => lang === item.lang.id);
    const articles = articleLang.map(item => item.article.map(i => i)).flat();
    const resultSearchArticles = articles.filter(art => {
        return art.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div className={styles.container}>
            {search && Boolean(resultSearchArticles.length) && (
                <>
                    <h3>Результаты поиска:</h3>
                    <Separator />
                </>
            )}
            {search && resultSearchArticles.map(art => (
                <>
                    <Link 
                        key={art.id} 
                        to={`/${art.category.link}/${art.link}`}
                    >
                        <h3>{art.title}</h3>
                    </Link>
                </>
            ))}
            {!resultSearchArticles.length && (
                <>
                    <h3>Результаты поиска:</h3>
                    <Separator />
                    <p>Ничего не найдено, попробуйте изменить запрос.</p>
                </>
            )}
        </div>
    );
}

export default SearchResult;