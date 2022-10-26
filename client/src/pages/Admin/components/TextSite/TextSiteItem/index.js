import React, { useState } from 'react';

import styles from './styles.module.scss';

function TextSiteItem({ 
    id, 
    titleSite,
    descriptionSite,
    titleSearch,
    titlePopularArticles, 
    likeInfo,
    like,
    dislike,
    onUpdate, 
    onRemove 
}) {
    const [input, setInput] = useState({
        id: id,
        titleSite: titleSite,
        descriptionSite: descriptionSite,
        titleSearch: titleSearch,
        titlePopularArticles: titlePopularArticles,
        likeInfo: likeInfo,
        like: like,
        dislike: dislike,
    });

    const handleUpdateTextSite = () => {
        onUpdate({
            variables: {
                id: input.id,
                titleSite: input.titleSite,
                descriptionSite: input.descriptionSite,
                titleSearch: input.titleSearch,
                titlePopularArticles: input.titlePopularArticles,
                likeInfo: input.likeInfo,
                like: input.like,
                dislike: input.dislike,
            },
        });
    };

    const handleRemoveTextSite = () => {
        onRemove({
            variables: {
                id: input.id,
            },
        });
    };

    return (
        <div className={styles.container}>
            <input 
                onChange={(e) => setInput({ ...input, titleSite: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.titleSite}
            />
            <input 
                onChange={(e) => setInput({ ...input, descriptionSite: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.descriptionSite}
            />
            <input 
                onChange={(e) => setInput({ ...input, titleSearch: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.titleSearch}
            />
            <input 
                onChange={(e) => setInput({ ...input, titlePopularArticles: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.titlePopularArticles}
            />
            <input 
                onChange={(e) => setInput({ ...input, likeInfo: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.likeInfo}
            />
            <input 
                onChange={(e) => setInput({ ...input, like: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.like}
            />
            <input 
                onChange={(e) => setInput({ ...input, dislike: e.target.value })}
                className={styles.input}
                type="text" 
                value={input.dislike}
            />
            <div className={styles.btn}>
                <div 
                    onClick={handleUpdateTextSite}
                    className={styles.update}>
                    &#10004;
                </div>
                <div 
                    onClick={handleRemoveTextSite}
                    className={styles.close}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default TextSiteItem;