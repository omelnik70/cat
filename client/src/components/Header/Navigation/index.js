import React, { useState, useContext } from 'react';

import MobileMenu from './MobileMenu';
import Context from '../../../Context';

import styles from './styles.module.scss';


function Navigation () {
    const [focus, setFocus] = useState(false);
    const { state, data } = useContext(Context);
    const { lang, header } = state;
    const [currentWidth, setCurrentWidth] = useState(window.screen.width);
    const { categories } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const menu = langUa ? ua.menu : langRu ? ru.menu : en.menu;
    const submenu = langUa ? ua.submenu : langRu ? ru.submenu : en.submenu;

    window.addEventListener('resize', () => setCurrentWidth(window.screen.width));

    return (
        <nav className={styles.container}>
            {currentWidth > state.global.SCREENWIDTH ? (<>
            <ul className={styles.nav}>
                {menu.map((item, index) => index < 2 ? 
                    <li key={index}><a className={styles.mainMenu} href={item.link}>{item.text}</a></li> :
                    <div  
                        className={styles.mainMenu}
                        onMouseEnter={() => setFocus(true)}
                        key={index}>
                        {item.text}
                        {focus && 
                        (<ul onMouseLeave={() => setFocus(false)}>
                            {submenu.map((item, index) => <li key={index}><a href={item.link}>{item.text}</a></li>)}
                        </ul>)}
                    </div>
                )}
            </ul>
            </>) :
            (
            <MobileMenu menu={menu} submenu={submenu} cat={cat} />
            )}
        </nav>
    );
}

export default Navigation;
