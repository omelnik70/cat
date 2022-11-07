import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import assets from "../../assets";
import Navigation from './Navigation';
import Context from '../../Context';
import Lang from './Lang';

import styles from './styles.module.scss';


function Header () {
    const { state, dataLangs, dataSite } = useContext(Context);
    const { lang } = state;
    const [currentWidth, setCurrentWidth] = useState(window.screen.width);

    window.addEventListener('resize', () => setCurrentWidth(window.screen.width));

    const title = dataSite.textsites.filter(lan => lan.lang.id === lang)[0].titleSite;

    return (
        <div className={styles.container}>
            {currentWidth > state.global.SCREENWIDTH ? 
            (<>
                <Link to="/">
                    <h1 className={styles.titleSite}>{title}</h1>
                </Link>
                <div className={styles.navigation}>
                    <Navigation />
                </div>
                <ul className={styles.lang}>
                    <Lang data={dataLangs} />
                </ul>
                <ul className={styles.login}>
                    <Link to="/login">
                        <img className={styles.account} src={assets.ICONS.ACCOUNT} alt="" />
                    </Link>
                </ul>
            </>) :
            (<>
                <Link to="/">
                    <h1 className={styles.titleSite}>{title}</h1>
                </Link>
                <div className={styles.navigation}>
                    <Navigation />
                </div>
            </>)}   
        </div>
    );
}

export default Header;