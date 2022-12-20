import React, { useContext } from 'react';

import MobileMenu from './MobileMenu';
import Context from '../../../Context';

import styles from './styles.module.scss';

function Navigation () {
    const { state, data } = useContext(Context);
    const { lang, header } = state;
    const { categories } = data;
    const cat = categories && categories.filter(cat => cat.lang.id === lang);
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const menu = langUa ? ua.menu : langRu ? ru.menu : en.menu;

    return (
        <nav className={styles.container}>
            {menu.map((item, index) =>
                (<a className={styles.menuDesctop} key={index} href={item.link}>{item.text}</a>)
            )}
            <div className={styles.mobileMenu}>
                <MobileMenu cat={cat} />
            </div>
        </nav>
    );
}

export default Navigation;
