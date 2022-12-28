import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../../Context';

import styles from './styles.module.scss';


function Menu () {

    const { state } = useContext(Context);
    const { lang, footer } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = footer;
    const dataMenu = langUa ? ua.menu : langRu ? ru.menu : en.menu;

    return (
        <nav className={styles.container}>
                {dataMenu.map((item, index) => <Link key={index} className={styles.fotterMenu} to={`/${lang === "6311a2434690f0b08bf74075" ? `ua`: lang === "6311a25b4690f0b08bf74077" ? `ru` : `en`}${item.link}`}>{item.text}</Link>)}
        </nav>
    );
}

export default Menu;
