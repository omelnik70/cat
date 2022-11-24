import React, { useState, useContext, useEffect } from 'react';

import assets from '../../assets';
import Context from '../../Context';
import { currentListArticles } from '../../data/actions';

import styles from "./styles.module.scss";

function Pagination ({ artConstant, artChangeable, limit }) {

    const [currentPage, setCurrentPege] = useState(1);
    const [articlesPerPage] = useState(limit);
    const { dispatch, state } = useContext(Context);
    const { lang } = state;
    const { ICONS } = assets;
    const { FIRSTPAGE, LASTPAGE, NEXTPAGE, PREVPAGE } = ICONS;

    const lastArticleIndex = currentPage * articlesPerPage;
    const firstArticleIndex = lastArticleIndex - articlesPerPage;
    const totalArticles = artConstant ? artConstant.length : artChangeable.length;
    const totalNumberPages = Math.ceil(totalArticles / articlesPerPage);

    useEffect(() => {
            artConstant ? 
            dispatch(currentListArticles(artConstant.slice(firstArticleIndex, lastArticleIndex))) :
            dispatch(currentListArticles(artChangeable.slice(firstArticleIndex, lastArticleIndex)));
    }, [lang, firstArticleIndex, lastArticleIndex, artChangeable]);

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

    if ((artConstant && artConstant.length <= limit) || (artChangeable && artChangeable.length <= limit)) return;

    return (
        <div className={styles.container}>
            <img className={styles.arrow} onClick={firstPage} src={FIRSTPAGE} alt="" />
            <img className={styles.arrow} onClick={prevPage} src={PREVPAGE} alt="" />
            {currentPage > 3 && (<p>...</p>)}
            {pageNumbers.map(number => 
                ((number <= currentPage + 2) || (number <= 5)) && ((number >= currentPage - 2) || (number >= totalNumberPages - 4)) && 
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