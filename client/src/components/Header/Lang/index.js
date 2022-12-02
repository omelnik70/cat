import React, { useContext } from 'react';

import Context from '../../../Context';
import { currentLang } from '../../../data/actions';
import assets from '../../../assets';

import styles from './styles.module.scss';


function Lang ({ data }) {
    const { state, dispatch } = useContext(Context);
    const { lang } = state;
    const { ICONS } = assets;
    const { RU, UA, GB } = ICONS;
    const { langs } = data;

    return (
        <div className={styles.activeLang}>
            <img src={
                lang === "6311a25b4690f0b08bf74077" ? RU :
                lang === "6311a2434690f0b08bf74075" ? UA : GB
                } 
                alt=""
            />
            <ul className={styles.list}>
            {langs.filter(item => item.id !== lang).map(item => (
                <div key={item.id} onClick={() => dispatch(currentLang(item.id))} className={styles.img}>
                    <img src={
                        item.country === "RU" ? RU :
                        item.country === "UA" ? UA : GB
                    } 
                    alt=""
                />
                </div>
                ))}
            </ul>
        </div>
    );
}

export default Lang;