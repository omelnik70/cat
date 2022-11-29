import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ref, onValue, child, push, update } from "firebase/database";

import { database } from '../../../../../../firebase';
import Comment from '../comment';

import styles from "./styles.module.scss";

function CommentList ({ 
    isUser, 
    articleId, 
    userId, 
    avatar, 
    email, 
    articleTitle, 
    uid, 
    more,
    info,
    cancel,
    confirm,
    register,
    loginText,
    add
}) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [commentsIndex, setCommentsIndex] = useState(5);
    const { category, post } = useParams();
    const at = email.indexOf("@");
    const login = email.substring(0, at).trim();
    const articleLink = `/${category}/${post}`;
    const timestamp = new Date().getTime();

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
                        onChange={(e) => setText(e.target.value)}
                        name="comment" 
                        id="comment"
                        placeholder='Добавьте комментарий'
                        value={text}
                    ></textarea>
                    <button onClick={handleClickAddComment}>{add}</button>
                </div>
            )}
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
                    confirm={confirm}
                    cancel={cancel}
                />
            ))}
            {(comments.length > commentsIndex) && (<button className={styles.more} onClick={handleClickMore}>{more}</button>)}
        </div>
    );
}

export default CommentList;