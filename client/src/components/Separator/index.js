import React from 'react';

import styles from "./styles.module.scss";


function Separator () {

    return (
            <div className={styles.lines}>
                <div className={styles.line1}></div>
                <div className={styles.line2}></div>
                <div className={styles.line3}></div>
            </div>
    );
}

export default Separator;