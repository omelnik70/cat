import React, { useContext } from 'react';

import Context from '../../../Context';
import { currentLang } from '../../../data/actions';
import assets from '../../../assets';

import styles from './styles.module.scss';


function Lang ({ data }) {
    const { state, dispatch } = useContext(Context);
    const { lang } = state;

    return (
        <div className={styles.container}>
            <div className={styles.activeLang}>
                <img 
                src={
                    lang === "6311a25b4690f0b08bf74077" ?
                    assets.ICONS.RU :
                    lang === "6311a2434690f0b08bf74075" ?
                    assets.ICONS.UA : 
                    assets.ICONS.GB
                    } 
                    alt=""
                />
                <ul className={styles.list}>
                {data.langs.map(item => (
                    <li key={item.id} onClick={() => dispatch(currentLang(item.id))} className={styles.img}>
                        <img src={
                            item.country === "RU" ?
                            assets.ICONS.RU :
                            item.country === "UA" ?
                            assets.ICONS.UA : 
                            assets.ICONS.GB
                        } 
                        alt=""
                    />
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Lang;