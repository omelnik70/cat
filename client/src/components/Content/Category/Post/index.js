import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import styles from "./styles.module.scss";


function Post () {
    const { post } = useParams();
    const [article, setArticle] = useState();

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${post}`)
            .then(response => response.json())
            .then(data => setArticle(data))
    }, [post]);

    return (
        <div className={styles.container}>
            <h1>Post</h1>
            {
                article && (
                    <>
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                    </>
                )
            }
        </div>
    );
}

export default Post;