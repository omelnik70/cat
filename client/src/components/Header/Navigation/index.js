import React, { useRef, useState, useContext } from 'react';

import Context from '../../../Context';

import styles from './styles.module.scss';


function Navigation () {
    const [focus, setFocus] = useState(false);
    const { state } = useContext(Context);
    const { lang, header } = state;
    const [currentWidth, setCurrentWidth] = useState(window.screen.width);
    const divRef = useRef();
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const menu = langUa ? ua.menu : langRu ? ru.menu : en.menu;
    const submenu = langUa ? ua.submenu : langRu ? ru.submenu : en.submenu;

    function addStyle() {
        divRef.current.classList.toggle(styles.change);
    };

    window.addEventListener('resize', () => setCurrentWidth(window.screen.width));

    return (
        <nav className={styles.container}>
            {currentWidth > state.global.SCREENWIDTH ? (<>
            <ul className={styles.nav}>
                {menu.map((item, index) => index < 2 ? 
                    <li key={index}><a className={styles.mainMenu} href={item.link}>{item.text}</a></li> :
                    <li  
                        className={styles.mainMenu}
                        onMouseEnter={() => setFocus(true)}
                        onMouseLeave={() => setFocus(false)}
                        key={index}>
                        <p>{item.text}</p>
                    </li>
                )}
            </ul>
            {focus && 
            (<ul className={styles.subnav}>
                {submenu.map((item, index) => <li className={styles.subMenu} key={index}><a href={item.link}>{item.text}</a></li>)}
            </ul>)}
            </>) :
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
