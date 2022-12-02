import React, { useContext, useState } from 'react';
import { ref, update, remove } from "firebase/database";
import { Link } from 'react-router-dom';

import { database } from '../../../../../../firebase';
import { dateConverter, timeConverter } from '../../../../../Helper/Helper';
import Context from '../../../../../../Context';
import { ReactComponent as Nophoto } from '../../../../../../assets/icons/nophoto.svg';
import { ReactComponent as Like } from '../../../../../../assets/icons/like.svg';
import { ReactComponent as DisLike } from '../../../../../../assets/icons/dislike.svg';
import { ReactComponent as Update } from '../../../../../../assets/icons/update.svg';
import { ReactComponent as Editdoc } from '../../../../../../assets/icons/editDoc.svg';
import { ReactComponent as Delete } from '../../../../../../assets/icons/delete.svg';
import styles from "./styles.module.scss";

function Comment ({ 
    timestamp, 
    text, 
    like, 
    dislike, 
    articleId, 
    userId,
    articleTitle,
    articleLink,
    keyId, 
    flag = false,
    confirm,
    cancel
}) {
    const [input, setInput] = useState(text);
    const [edit, setEdit] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const { state } = useContext(Context);
    const { commentsList, lang, email, uid, avatar } = state;
    const at = email.indexOf("@");
    const login = email.substring(0, at).trim();
    const { ua, en, ru } = commentsList;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const loginTitle = langUa ? ua.loginTitle : langRu ? ru.loginTitle : en.loginTitle;
    const dateTtitle = langUa ? ua.dateTtitle : langRu ? ru.dateTtitle : en.dateTtitle;
    const timeTitle = langUa ? ua.timeTitle : langRu ? ru.timeTitle : en.timeTitle;
    const articleRef = ref(database, `data/comments/${articleId}/${keyId}`);
    const userRef = ref(database, `data/comments/${userId}/${keyId}`);

    const timestampNew = new Date().getTime();
    const date = dateConverter(timestamp);
    const time = timeConverter(timestamp);

    const handleClickLikesIncrement = (value) => {
        if(value) {
            update((articleRef), {
                like: like + 1
            });
            update((userRef), {
                like: like + 1
            });
            setDisabled(true);
        } else {
            update((articleRef), {
                dislike: dislike + 1
            });
            update((userRef), {
                dislike: dislike + 1
            });
            setDisabled(true);
        };
    };

    const handleClickUpdate = () => {
        update((articleRef), {
            timestamp: timestampNew
        });
        update((userRef), {
            timestamp: timestampNew
        });
    };

    const handleClickEditdoc = () => {
        setEdit(true);
    };

    const resultEditText = () => {
        update((articleRef), {
            text: input
        });
        update((userRef), {
            text: input
        });
        setEdit(false);
    };

    const resetEditText = () => {
        setEdit(false);
    };

    const handleClickDeleteCom = () => {
        remove(articleRef);
        remove(userRef);
    };
    
    return (
        <div className={styles.container}>
            {flag && (<Link to={articleLink}><h3 className={styles.title}>{articleTitle}</h3></Link>)}
            <div className={styles.articleBox}>
                <div className={styles.avatarEditMobile}>
                    <div className={styles.avatar}>
                        {avatar ? (<img src={avatar} alt="avatar" />) : <Nophoto />}
                    </div>
                    {flag && (
                        <div className={styles.editBoxMobile}>
                            <Update onClick={handleClickUpdate} className={styles.update} />
                            <Editdoc onClick={handleClickEditdoc} className={styles.edit} />
                            <Delete onClick={handleClickDeleteCom} className={styles.deleteCom} />
                        </div>
                    )}
                </div>
                <div className={styles.info}>
                    <div className={styles.user}>
                        <div className={styles.userBox}>
                            <div className={styles.login}>
                                <h4>{loginTitle}</h4>
                                <p>{`@_${login}`}</p>
                            </div>
                            <div className={styles.date}>
                                <h4>{dateTtitle}</h4>
                                <p>{date}</p>
                            </div>
                            <div className={styles.time}>
                                <h4>{timeTitle}</h4>
                                <p>{time}</p>
                            </div>
                            {flag && (
                                <>
                                    <div className={styles.userlike}>
                                        <Like className={styles.likeImg} />
                                        <p>{like}</p>
                                    </div>
                                    <div className={styles.userdislike}>
                                        <DisLike className={styles.likeImg} />
                                        <p>{dislike}</p>
                                    </div>
                                </>
                                
                            )}
                        </div>
                        {flag && (
                            <div className={styles.editBox}>
                                <Update onClick={handleClickUpdate} className={styles.update} />
                                <Editdoc onClick={handleClickEditdoc} className={styles.edit} />
                                <Delete onClick={handleClickDeleteCom} className={styles.deleteCom} />
                            </div>
                        )}
                    </div>
                    {!edit ? (<div className={styles.text}><p>{text}</p></div>) :
                    (<>
                        <textarea onChange={(e) => setInput(e.target.value)} type="text" value={input} />
                        <div className={styles.btn}>
                            <button onClick={resultEditText}>{confirm}</button>
                            <button onClick={resetEditText}>{cancel}</button>
                        </div>
                    </>)}
                    {!flag &&(<div className={styles.rate}>
                        <div 
                            onClick={() => (uid !== userId || !disabled) && handleClickLikesIncrement(true)}
                            className={(uid === userId || disabled) ? styles.disabled : styles.like}
                        >
                            <Like className={styles.likeImg} />
                            <p>{like}</p>
                        </div>
                        <div 
                            onClick={() => (uid !== userId || !disabled) && handleClickLikesIncrement(false)}
                            className={(uid === userId || disabled) ? styles.disabled : styles.like}
                        >
                            <DisLike className={styles.likeImg} />
                            <p>{dislike}</p>
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
}

export default Comment;