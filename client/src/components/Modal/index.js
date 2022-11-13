import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Context from '../../Context';
import { emailInput, passwordInput } from '../../data/actions';

import styles from './styles.module.scss';


function Modal ({ active, setActive, children }) {
    const { dispatch } = useContext(Context);

    const navigate = useNavigate();
    const goBack = () => navigate('/');

    const handleClick = () => {
        setActive(false);
        dispatch(emailInput(''));
        dispatch(passwordInput(''));
        goBack();
    };

    return (
        <div 
            onClick={handleClick}
            className={active ?
            `${styles.overlay} ${styles.open}`:
            `${styles.overlay}`}>
            <div 
                onClick={e => e.stopPropagation()}
                className={active ?
                `${styles.window} ${styles.open}`:
                `${styles.window}`}>
                    <Link to='/'>
                        <div 
                            onClick={handleClick}
                            className={styles.close}>
                            &times;
                        </div>
                    </Link>
                    {children}
            </div>
        </div>
    );
}

export default Modal;