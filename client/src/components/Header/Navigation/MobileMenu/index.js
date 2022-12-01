import React, { useRef, useState, useContext } from 'react';

import Context from '../../../../Context';
import { currentSearch } from '../../../../data/actions';
import Navbar from '../../../Content/Navbar';

import styles from './styles.module.scss';


function MobileMenu ({ cat }) {
    const { dispatch } = useContext(Context);
    const [visible, setVisible] = useState(false);
    const divRef = useRef();

    function addStyle() {
        divRef.current.classList.toggle(styles.change);
        setVisible(!visible);
    };

    const resetSearchResult = () => {
        divRef.current.classList.toggle(styles.change);
        dispatch(currentSearch(''));
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
                <Navbar data={cat} fn={resetSearchResult} />
            </div>
        </>
    );
}

export default MobileMenu;
