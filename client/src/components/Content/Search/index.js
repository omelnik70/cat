import React from 'react';

import assets from '../../../assets';
import styles from './styles.module.scss';


function Search ({ titleSearch }) {

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{titleSearch.titleSearch}</h2>
            <div className={styles.search}>
                <div className={styles.searchIcon}>
                    <img src={assets.ICONS.SEARCH} alt="" />
                </div>
                <input className={styles.searchInput} type='search' name='search' />
            </div>
        </div>
    );
}

export default Search;