import React from 'react';

import styles from './styles.module.scss';


function Container ({ active, children }) {

    return (
        <div 
            className={active ? "": `${styles.none}`}>
            {children}
        </div>
    );
}

export default Container;