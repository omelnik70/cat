import React from 'react';

import styles from './styles.module.scss';

function Loading () {

    return (
        <div className={styles.container}>
            <div className={styles.element}>
                <div className={styles.loding}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Loading;