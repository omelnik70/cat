import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ref, onValue, child, push, update } from "firebase/database";

import LazyLoad from '../../../../../LazyLoad';
import Context from '../../../../../../Context';
import Modal from '../../../../../Modal';
import { database } from '../../../../../../firebase';
import { ReactComponent as Info } from '../../../../../../assets/icons/info.svg';
import Comment from '../comment';

import styles from "./styles.module.scss";

function CommentList ({ 
    articleId, 
    userId, 
    articleTitle, 
    more,
    info,
    register,
    loginText,
    add
}) {
    const { state } = useContext(Context);
    const { usersPage, lang, email, uid, avatar, isUser } = state;
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [invalidText, setInvalidText] = useState(false);
    const [modal, setModal] = useState(false);
    const [commentsIndex, setCommentsIndex] = useState(5);
    const { category, post } = useParams();
    const at = email.indexOf("@");
    const login = email.substring(0, at).trim();
    const articleLink = `/${category}/${post}`;
    const timestamp = new Date().getTime();

    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = usersPage;
    const understand = langUa ? ua.understand : langRu ? ru.understand : en.understand;
    const addComment = langUa ? ua.addComment : langRu ? ru.addComment : en.addComment;
    const warningValidComment = langUa ? ua.warningValidComment : langRu ? ru.warningValidComment : en.warningValidComment;

    useEffect(() => {
        const commentsRef = ref(database, 'data/comments/' + articleId);
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            data && setComments(Object.values(data).sort((a, b) => b.timestamp - a.timestamp));
          });
    }, []);

    const handleClickAddComment = () => {
        const newCommentKey = push(child(ref(database), `data/comments`)).key;
        update(ref(database, `data/comments/${articleId}/${newCommentKey}`), {
            keyId: newCommentKey,
            userId,
            avatar,
            login,
            text,
            articleId,
            articleLink,
            articleTitle,
            timestamp,
            like: 0,
            dislike: 0
        });
        update(ref(database, `data/comments/${userId}/${newCommentKey}`), {
            keyId: newCommentKey,
            userId,
            avatar,
            login,
            text,
            articleId,
            articleLink,
            articleTitle,
            timestamp,
            like: 0,
            dislike: 0
        });
        setText('');
    };

    const handleClickMore = () => {
        setCommentsIndex(commentsIndex + 5);
    };

    const inputValidText = (e) => {
        const valid = e.target.value.includes('http');
        if(valid) {
            setInvalidText(true);
            setModal(true);
            setText(e.target.value);
        } else {
            setText(e.target.value);
            setInvalidText(false);
            setModal(false);
        };
    };

    const handleClickUnderstand = () => {
        setModal(false);
    };

    console.log(comments);

    return (
        <div className={styles.container}>
            {!isUser && (
                <p className={styles.loginMessageBox}>
                    {info}
                    <span><Link to="/register">{register}</Link>
                    |
                    <Link to="/login">{loginText}</Link></span>
                </p>
            )}
            {isUser && (
                <div className={styles.commentBox}>
                    <textarea 
                        onChange={(e) => inputValidText(e)}
                        name="comment" 
                        id="comment"
                        placeholder={addComment}
                        value={text}
                    ></textarea>
                    <button 
                        className={invalidText ? styles.disabled : ''}
                        onClick={handleClickAddComment}
                        disabled={invalidText}
                    >
                            {add}
                    </button>
                </div>
            )}

            <div className={styles.desktop}>
                {Boolean(comments.length) && comments.map((item, index) => index < commentsIndex && (
                    <Comment 
                        key={index}
                        keyId={item.keyId} 
                        avatar={item.avatar} 
                        login={item.login} 
                        text={item.text} 
                        like={item.like} 
                        dislike={item.dislike} 
                        timestamp={item.timestamp}
                        articleId={item.articleId}
                        userId={item.userId}
                        uid={uid}
                    />
                ))}
            </div>

            <LazyLoad arr={comments} int={5} lang={lang} flag={'com'} uid={uid} />

            {invalidText && (
                <Modal active={modal} setActive={setModal} link={articleLink}>
                <div className={styles.prevention}>
                    <div className={styles.preventionWarning}>
                        <Info className={styles.svg} />
                        <p>{warningValidComment}</p>
                    </div>
                    <button onClick={handleClickUnderstand}>{understand}</button>
                </div>
                </Modal>
            )}

            <div className={styles.desktop}>
                {(comments.length > commentsIndex) && !invalidText && (<p className={styles.more} onClick={handleClickMore}>{more}</p>)}
            </div>

        </div>
    );
}

export default CommentList;