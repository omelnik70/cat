import React, { useRef, useState, useContext } from 'react';

import Context from '../../../Context';

import styles from './styles.module.scss';


function Navigation () {

    const { state } = useContext(Context);
    const { lang, header } = state;
    const [currentWidth, setCurrentWidth] = useState(window.screen.width);
    const divRef = useRef();
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const dataMenu = langUa ? ua.menu : langRu ? ru.menu : en.menu;

    function addStyle() {
        divRef.current.classList.toggle(styles.change);
    };

    window.addEventListener('resize', () => setCurrentWidth(window.screen.width));

    return (
        <nav className={styles.container}>
            {currentWidth > state.global.SCREENWIDTH ? (
            <ul className={styles.nav}>
                {dataMenu.map((item, index) => <li key={index}><a className={styles.mainMenu} href={item.link}>{item.text}</a></li>)}
            </ul>
            ) :
            (
            <div ref={divRef} className={styles.cont} onClick={addStyle}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            )}
        </nav>
    );
}

export default Navigation;
