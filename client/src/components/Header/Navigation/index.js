import React, { useState, useContext } from 'react';

import MobileMenu from './MobileMenu';
import Context from '../../../Context';

import styles from './styles.module.scss';

function Navigation () {
    const [focusClick, setFocusClick] = useState(false);
    const { state, data } = useContext(Context);
    const { lang, header } = state;
    const { categories } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const menu = langUa ? ua.menu : langRu ? ru.menu : en.menu;
    const submenu = langUa ? ua.submenu : langRu ? ru.submenu : en.submenu;
    const allMenu = menu.concat(submenu).filter(item => item.link !== '');

    return (
        <nav className={styles.container}>
            <ul className={styles.navMax}>
                {allMenu.map((item, index) => (<li key={index}><a className={styles.mainMenu} href={item.link}>{item.text}</a></li>))}
            </ul>
            <ul className={styles.nav}>
                {menu.map((item, index) => index < 2 ? 
                    <li key={index}><a className={styles.mainMenu} href={item.link}>{item.text}</a></li> :
                    <div  
                        className={styles.mainMenu}
                        onClick={() => setFocusClick(!focusClick)}
                        key={index}>
                        {item.text}
                        {focusClick && 
                        (<ul>
                            {submenu.map((item, index) => <li key={index}><a href={item.link}>{item.text}</a></li>)}
                        </ul>)}
                    </div>
                )}
            </ul>
            <div className={styles.mobileMenu}>
                <MobileMenu cat={cat} />
            </div>
        </nav>
    );
}

export default Navigation;
