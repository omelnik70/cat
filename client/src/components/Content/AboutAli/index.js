import React, { useContext } from 'react';

import Context from '../../../Context';
import assets from '../../../assets';
import Separator from '../../Separator';

import styles from './styles.module.scss';

function AboutAli () {
    const { state } = useContext(Context);
    const { aboutAli, lang } = state;
    const { ru, en, ua } = aboutAli;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const title = langUa ? ua.title : langRu ? ru.title : en.title;
    const text = langUa ? ua.text : langRu ? ru.text : en.text;

    const { ICONS } = assets;
    const { BASKET } = ICONS;

    const style = {
        backgroundColor: `#F98866`
    };

    return (
        <div className={styles.container}>
            <div className={styles.titleBox}>
                <img src={BASKET} alt="basket" />
                <h2>{title}</h2>
            </div>
            <Separator style={style} />
            <div className={styles.textBox}>
                {text.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
    );
}

export default AboutAli;