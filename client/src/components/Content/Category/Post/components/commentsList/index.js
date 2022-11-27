import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ref, onValue, set, push } from "firebase/database";

import { formatDate, formatTime } from '../../../../../Helper/Helper';
import { database } from '../../../../../../firebase';
import Comment from '../comment';

import styles from "./styles.module.scss";

function CommentList ({ isUser, articleId, userId, avatar, email }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const { category, post } = useParams();
    const at = email.indexOf("@");
    const login = email.substring(0, at).trim();
    const articleLink = `/${category}/${post}`;
    const date = formatDate(new Date);
    const time = formatTime(new Date);
    const timestamp = new Date().getTime();

    useEffect(() => {
        const commentsRef = ref(database, 'data/comments/' + articleId);
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            data && setComments(Object.values(data).sort((a, b) => b.timestamp - a.timestamp));
          });
    }, []);

    const handleClickAddComment = () => {
        const commentListRef = ref(database, 'data/comments/' + articleId);
        const newCommentRef = push(commentListRef);
        //const newCommentKey = push(child(ref(database), 'data/comments')).key;
        set(newCommentRef, {
            articleId,
            userId,
            avatar,
            login,
            text,
            articleLink,
            timestamp,
            date,
            time,
            like: 0,
            dislike: 0
        });
    //     const newComent = {
    //         articleId,
    //         userId,
    //         avatar,
    //         login,
    //         text,
    //         articleLink,
    //         like: 0,
    //         dislike: 0
    //   };
    //   const updates = {};
    //   updates['data/comments/' + articleId + '/' + newCommentKey] = newComent;
    //   update(ref(database), updates);
       setText('');
    };

    return (
        <div className={styles.container}>
            {!isUser && (
                <p className={styles.loginMessageBox}>
                    Чтобы оставить комментарий, нужно зарегистрироваться или войти! 
                    <span><Link to="/register">Зарегистрироваться</Link>
                    |
                    <Link to="/login">Войти</Link></span>
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
                    <button onClick={handleClickAddComment}>Добавить</button>
                </div>
            )}
            {comments && comments.map((item, index) => (
                <Comment 
                    key={index} 
                    avatar={item.avatar} 
                    login={item.login} 
                    date={item.date} 
                    time={item.time} 
                    text={item.text} 
                    like={item.like} 
                    dislike={item.dislike} 
                />
            ))}
        </div>
    );
}

export default CommentList;