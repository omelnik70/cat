import React, { useContext } from 'react';

import Context from '../../../Context';
import { currentSearch } from '../../../data/actions';
import assets from '../../../assets';
import styles from './styles.module.scss';


function Search () {
    const { state, dispatch } = useContext(Context);
    const { lang, search, searchTexts } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = searchTexts;
    const titleSearch = langUa ? ua.title : langRu ? ru.title : en.title;
    const text = langUa ? ua.textInput : langRu ? ru.textInput : en.textInput;

    const handleSearch = (e) => {
        dispatch(currentSearch(e.target.value));
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{titleSearch}</h2>
            <div className={styles.search}>
                <div className={styles.searchIcon}>
                    <img src={assets.ICONS.SEARCH} alt="" />
                </div>
                <input 
                    onChange={(e) => handleSearch(e)}
                    className={styles.searchInput} 
                    type='text' 
                    placeholder={text}
                    value={search}
                />
            </div>
        </div>
    );
}

export default Search;