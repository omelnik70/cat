import React, { useContext } from 'react';

import Context from '../../../Context';
import { currentSearch } from '../../../data/actions';
import assets from '../../../assets';
import styles from './styles.module.scss';


function Search ({ titleSearch }) {
    const { state, dispatch } = useContext(Context);
    const { search } = state;

    console.log();

    const handleSearch = (e) => {
        dispatch(currentSearch(e.target.value));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{titleSearch.titleSearch}</h2>
            <div className={styles.search}>
                <div className={styles.searchIcon}>
                    <img src={assets.ICONS.SEARCH} alt="" />
                </div>
                <input 
                    onChange={(e) => handleSearch(e)}
                    className={styles.searchInput} 
                    type='text' 
                    placeholder='Начните вводить Ваш запрос'
                    value={search}
                />
            </div>
        </div>
    );
}

export default Search;