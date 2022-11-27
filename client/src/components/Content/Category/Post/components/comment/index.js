import React, { useContext } from 'react';

import Context from '../../../../../../Context';
import { ReactComponent as Nophoto } from '../../../../../../assets/icons/nophoto.svg';
import { ReactComponent as Like } from '../../../../../../assets/icons/like.svg';
import { ReactComponent as DisLike } from '../../../../../../assets/icons/dislike.svg';
import styles from "./styles.module.scss";

function Comment ({ avatar, login, date, time, text, like, dislike }) {
    const { state } = useContext(Context);
    const { commentsList, lang } = state;
    const { ua, en, ru } = commentsList;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const loginTitle = langUa ? ua.loginTitle : langRu ? ru.loginTitle : en.loginTitle;
    const dateTtitle = langUa ? ua.dateTtitle : langRu ? ru.dateTtitle : en.dateTtitle;
    const timeTitle = langUa ? ua.timeTitle : langRu ? ru.timeTitle : en.timeTitle;
    
    return (
        <div className={styles.container}>
            <div className={styles.avatar}>
                {avatar ? (<img src={avatar} alt="avatar" />) : <Nophoto />}
            </div>
            <div className={styles.info}>
                <div className={styles.user}>
                    <div className={styles.login}>
                        <h4>{loginTitle}</h4>
                        <p>{login}</p>
                    </div>
                    <div className={styles.date}>
                        <h4>{dateTtitle}</h4>
                        <p>{date}</p>
                    </div>
                    <div className={styles.time}>
                        <h4>{timeTitle}</h4>
                        <p>{time}</p>
                    </div>
                </div>
                <div className={styles.text}>
                    <p>{text}</p>
                </div>
                <div className={styles.rate}>
                    <div className={styles.like}>
                        <Like className={styles.likeImg} />
                        <p>{like}</p>
                    </div>
                    <div className={styles.disLike}>
                        <DisLike className={styles.likeImg} />
                        <p>{dislike}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;