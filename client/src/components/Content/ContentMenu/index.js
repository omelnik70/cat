import React from 'react';
import { Link, useParams } from 'react-router-dom';

import styles from './styles.module.scss';

function ContentMenu ( { data, fn } ) {
    const { category } = useParams();

    return (
        <nav className={styles.navbar}>
            {data.map(item => 
            <div className={styles.linkBox}>
                <Link 
                    onClick={fn}
                    key={item.id} 
                    to={`/${item.link}`}
                >
                    {item.name}
                </Link>
            </div>
            )}
        </nav>
    );
}

export default ContentMenu;