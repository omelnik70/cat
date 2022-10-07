import React, { useState, useContext } from 'react';

import Search from './Search';
import Faq from './Faq';
import Context from '../../Context';

import styles from './styles.module.scss';


function Content () {
    const { state, dataCat, dataArt, dataContent, dataSite } = useContext(Context);
    const { lang } = state;
    const [screenWidth, setScreenWidth] = useState(window.screen.width);

    window.addEventListener('resize', () => setScreenWidth(window.screen.width));

    const content = dataSite.textsites.filter(title => title.lang.id === lang)[0];

    return (
        <div className={styles.container}>
            {screenWidth > state.global.SCREENWIDTH ? 
            (<>
            <nav className={styles.navbar}>
                <ul className={styles.menu}>
                    {dataCat.categories.filter(cat => cat.lang.id === lang)
                    .map(item => 
                        <li key={item.id} className={styles.link}><a href={`${item.link}`}>{item.name}</a></li>
                    )}
                </ul>
            </nav>

            <div className={styles.contentBox}>
                <Search titleSearch={content} />
                <Faq titlePopularArticles={content} article={dataArt} content={dataContent} />
            </div>
            </>) :
            (<div className={styles.contentBox}>
                <Search titleSearch={content} />
                <Faq titlePopularArticles={content} />
            </div>)}
        </div>
    );
}

export default Content;