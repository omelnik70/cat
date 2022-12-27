import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LazyLoad from '../../../LazyLoad';
import ShortDescriptionArticle from '../../../ShortDescriptionArticle';
import { resultSearchArticles, currentSearch } from '../../../../data/actions';
import Context from '../../../../Context';
import Pagination from '../../../Pagination';
import Separator from '../../../Separator';

import styles from './styles.module.scss';


function SearchResult () {
    const { data, state, dispatch } = useContext(Context);
    const { lang, search, currentListArt, resultSearchArt, searchTexts } = state;
    const articleLang = data.categories.filter(item => lang === item.lang.id);
    const articles = articleLang.map(item => item.article.map(i => i)).flat();
    const LIMITART = 12;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = searchTexts;
    const title = langUa ? ua.result : langRu ? ru.result : en.result;
    const text = langUa ? ua.found : langRu ? ru.found : en.found;

    useEffect(() => {
        dispatch(resultSearchArticles(articles.filter(art => {
            return art.title.toLowerCase().includes(search.toLowerCase());
        })))
    }, [search, lang]);

    
    const handleClickArticle = () => {
        dispatch(currentSearch(''));
    };

    return (
        <div className={search ? styles.container : styles.hide}>
            <div className={styles.contentBox}>
                {search && Boolean(currentListArt.length) && (
                    <>
                        <h2 className={styles.searchTitle}>{title}</h2>
                        <Separator />
                    </>
                )}

                <div className={styles.desktop}>
                    {search && currentListArt.map(art => (
                        <div key={art.id} >
                            <Link 
                                to={`/${art.category.link}/${art.link}`}
                            >
                                <h3 
                                    onClick={handleClickArticle}
                                    className={styles.articleTitle}
                                >
                                    {art.title}
                                </h3>
                            </Link>
                            <ShortDescriptionArticle item={art} />
                        </div>
                    ))}
                </div>

                <LazyLoad arr={resultSearchArt} int={10} lang={lang} flag={'art'} fn={handleClickArticle} />

                {!currentListArt.length && (
                    <>
                        <h2 className={styles.searchTitle}>{title}</h2>
                        <Separator />
                        <p className={styles.searchText}>{text}</p>
                    </>
                )}
            </div>

            <div className={styles.desktop}>
                {search && (<Pagination artChangeable={resultSearchArt} limit={LIMITART} />)}
            </div>
        </div>
    );
}

export default SearchResult;