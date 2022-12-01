import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './styles.module.scss';

function Navbar ( { data, fn } ) {
    const { category } = useParams();

    return (
        <nav className={styles.navbar}>
            <ul className={styles.menu}>
                {data.map(item => 
                    <Link 
                        onClick={fn}
                        key={item.id} 
                        to={`/${item.link}`}
                    >
                        <li
                            className={item.link === category ? `${styles.link} ${styles.activ}` : styles.link}
                        >
                            {item.name}
                        </li>
                    </Link>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;