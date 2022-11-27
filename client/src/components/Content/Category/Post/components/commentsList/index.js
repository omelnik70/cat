import React from 'react';
import { Link } from 'react-router-dom';

import Comment from '../comment';

import styles from "./styles.module.scss";

function CommentList ({ isUser }) {
    

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
                    <textarea name="comment" id="comment"></textarea>
                    <button>Добавить</button>
                </div>
            )}
            <Comment isUser={isUser} />
        </div>
    );
}

export default CommentList;