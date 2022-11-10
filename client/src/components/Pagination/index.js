import React, { useState, useContext, useEffect } from 'react';

import assets from '../../assets';
import Context from '../../Context';
import { currentListArticles } from '../../data/actions';

import styles from "./styles.module.scss";


function Pagination ({ articles, limit }) {
    const [currentPage, setCurrentPege] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState();
    const { dispatch } = useContext(Context);
    const { ICONS } = assets;
    const { FIRSTPAGE, LASTPAGE, NEXTPAGE, PREVPAGE } = ICONS;

    const lastArticleIndex = currentPage * articlesPerPage;
    const firstArticleIndex = lastArticleIndex - articlesPerPage;
    const totalArticles = articles.length;
    const totalNumberPages = Math.ceil(totalArticles / articlesPerPage);

    useEffect(() => {
        dispatch(currentListArticles(articles.slice(firstArticleIndex, lastArticleIndex)));
        setArticlesPerPage(limit);
    }, [firstArticleIndex, lastArticleIndex, limit]);

    const pageNumbers = [];

    for (let i = 1; i <= totalNumberPages; i++) {
        pageNumbers.push(i);
    };

    const paginate = (pageNumber) => {
        setCurrentPege(pageNumber);
    };

    const nextPage = () => setCurrentPege(next => next !== totalNumberPages ? next + 1 : next);
    const prevPage = () => setCurrentPege(prev => prev !== 1 ? prev - 1 : prev);
    const lastPage = () => setCurrentPege(totalNumberPages);
    const firstPage = () => setCurrentPege(1);

    return (
        <div className={styles.container}>
            <img className={styles.arrow} onClick={firstPage} src={FIRSTPAGE} alt="" />
            <img className={styles.arrow} onClick={prevPage} src={PREVPAGE} alt="" />
            {currentPage > 3 && (<p>...</p>)}
            {pageNumbers.map(number => 
                ((number <= currentPage + 2) || (number <= 5)) && ((number >= currentPage - 2) || (number >= totalNumberPages - 5)) && 
                (
                    <p 
                        className={`${currentPage === number ? styles.activNumber : ""}`} 
                        key={number} 
                        onClick={() => paginate(number)}
                    >
                        {number}
                    </p>
                ))}
            {currentPage < totalNumberPages - 2 && (<p>...</p>)}
            <img className={styles.arrow} onClick={nextPage} src={NEXTPAGE} alt="" />
            <img className={styles.arrow} onClick={lastPage} src={LASTPAGE} alt="" />
        </div>
    );
}

export default Pagination;