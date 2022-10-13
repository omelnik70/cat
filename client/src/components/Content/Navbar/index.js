import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

function Navbar ( {data} ) {

    return (
        <nav className={styles.navbar}>
            <ul className={styles.menu}>
                {data.map(item => 
                    <Link key={item.id} to={`/${item.link}`}><li className={styles.link}>{item.name}</li></Link>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;