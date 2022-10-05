import React, { useRef, useState, useContext } from 'react';

import Context from '../../../Context';

import styles from './styles.module.scss';


function Navigation () {

    const { state, dataMenu } = useContext(Context);
    const { lang } = state;
    const [currentWidth, setCurrentWidth] = useState(window.screen.width);
    const divRef = useRef();

    function addStyle() {
        divRef.current.classList.toggle(styles.change);
    };

    window.addEventListener('resize', () => setCurrentWidth(window.screen.width));

    return (
        <nav className={styles.container}>
            {currentWidth > state.global.SCREENWIDTH ? (
            <ul className={styles.nav}>
                {dataMenu.menus.filter(men => men.lang.id === lang)
                .map(item => <li key={item.id}><a className={styles.mainMenu} href={item.link}>{item.name}</a></li>)}
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
