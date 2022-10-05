import React, { useState } from 'react';

import styles from './styles.module.scss';

function ArticleItem({ id, title, onUpdate, onRemove }) {
    const [input, setInput] = useState({
        id: id,
        title: title,
    });

    const handleUpdateArticle = () => {
        onUpdate({
            variables: {
                id: input.id,
                title: input.title,
            },
        });
    };

    const handleRemoveArticle = () => {
        onRemove({
            variables: {
                id: input.id,
            },
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <input 
                    onChange={(e) => setInput({ ...input, title: e.target.value })}
                    className={styles.input}
                    type="text" value={input.title}
                />
            </div>
            <div 
                onClick={handleUpdateArticle}
                className={styles.update}>
                &#10004;
            </div>
            <div 
                onClick={handleRemoveArticle}
                className={styles.close}>
                &times;
            </div>
        </div>
    );
};

export default ArticleItem;