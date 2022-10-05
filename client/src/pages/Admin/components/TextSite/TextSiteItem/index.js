import React, { useState } from 'react';

import styles from './styles.module.scss';

function TextSiteItem({ 
    id, 
    titleSite,
    descriptionSite,
    titleSearch,
    titlePopularArticles, 
    onUpdate, 
    onRemove 
}) {
    const [input, setInput] = useState({
        id: id,
        titleSite: titleSite,
        descriptionSite: descriptionSite,
        titleSearch: titleSearch,
        titlePopularArticles: titlePopularArticles,
    });

    const handleUpdateTextSite = () => {
        onUpdate({
            variables: {
                id: input.id,
                titleSite: input.titleSite,
                descriptionSite: input.descriptionSite,
                titleSearch: input.titleSearch,
                titlePopularArticles: input.titlePopularArticles,
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
                type="text" value={input.titleSite}
            />
            <input 
                onChange={(e) => setInput({ ...input, descriptionSite: e.target.value })}
                className={styles.input}
                type="text" value={input.descriptionSite}
            />
            <input 
                onChange={(e) => setInput({ ...input, titleSearch: e.target.value })}
                className={styles.input}
                type="text" value={input.titleSearch}
            />
            <input 
                onChange={(e) => setInput({ ...input, titlePopularArticles: e.target.value })}
                className={styles.input}
                type="text" value={input.titlePopularArticles}
            />
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
    );
};

export default TextSiteItem;