import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Context from '../../../Context';

import styles from './styles.module.scss';


function Header () {
    const [screenWidth, setScreenWidth] = useState(window.screen.width);
    const value = useContext(Context);

    window.addEventListener('resize', () => setScreenWidth(window.screen.width));

    return (
        <div className={styles.container}>
            {screenWidth > value.DATA.global.SCREENWIDTH ? 
            (<>
                <h1 className={styles.title}>{value.DATA.header.title}</h1>
                <div className={styles.navigation}>
                    <Navigation data={value.DATA} />
                </div>
                <ul className={styles.lang}>
                    {value.DATA.header.lang.map((item, index) => <li key={index} className={styles.link}><a href='https://www.google.com.ua'>{item}</a></li>)}
                </ul>
                <ul className={styles.login}>
                    <li><Link to="/register">register</Link></li>
                    <li><Link to="/login">sign up</Link></li>
                </ul>
            </>) :
            (<>
                <h1 className={styles.title}>{value.DATA.header.title}</h1>
                <div className={styles.navigation}>
                    <Navigation data={value.DATA} />
                </div>
            </>)}   
        </div>
    );
}

export default Header;