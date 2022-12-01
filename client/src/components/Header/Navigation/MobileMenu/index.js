import React, { useRef, useState } from 'react';
//import { Link } from 'react-router-dom';

import Navbar from '../../../Content/Navbar';

import styles from './styles.module.scss';


function MobileMenu ({ cat }) {
    const [visible, setVisible] = useState(false);
    const divRef = useRef();

    function addStyle() {
        divRef.current.classList.toggle(styles.change);
        setVisible(!visible);
    };

    return (
        <>
            <div ref={divRef} className={styles.cont} onClick={addStyle}>
                <div className={styles.bar1}></div>
                <div className={styles.bar2}></div>
                <div className={styles.bar3}></div>
            </div>
            <div className={visible ? styles.menuBox : styles.menuBoxHide}>
                <Navbar data={cat}  onClick={addStyle} />
            </div>
        </>
    );
}

export default MobileMenu;
