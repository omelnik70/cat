import React from 'react';

import styles from './styles.module.scss';


function Modal ({ active, setActive, children }) {

    return (
        <div 
            onClick={() => setActive(false)}
            className={active ?
            `${styles.overlay} ${styles.open}`:
            `${styles.overlay}`}>
            <div 
                onClick={e => e.stopPropagation()}
                className={active ?
                `${styles.window} ${styles.open}`:
                `${styles.window}`}>
                    <div 
                        onClick={() => setActive(false)}
                        className={styles.close}>
                        &times;
                    </div>
                    {children}
            </div>
        </div>
    );
}

export default Modal;