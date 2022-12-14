import React from 'react';

import styles from "./styles.module.scss";


function Separator ({ style }) {

    return (
            <div className={styles.lines}>
                <div className={styles.line1} style={style}></div>
                <div className={styles.line2} style={style}></div>
                <div className={styles.line3} style={style}></div>
            </div>
    );
}

export default Separator;