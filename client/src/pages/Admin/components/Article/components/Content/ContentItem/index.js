import React, { useState } from 'react';

import styles from './styles.module.scss';

function ContentItem({ 
    id, 
    text_1,
    text_2,
    li_1,
    li_2,
    strong,
    imgSrc,
    imgTitle,
    aHref,
    aText,
    onUpdate, 
    onRemove 
}) {
    const [input, setInput] = useState({
        id: id,
        text_1: text_1,
        text_2: text_2,
        li_1: li_1,
        li_2: li_2,
        strong: strong,
        imgSrc: imgSrc,
        imgTitle: imgTitle,
        aHref: aHref,
        aText: aText,
    });

    const handleUpdateContent = () => {
        onUpdate({
            variables: {
                id: input.id,
                text_1: input.text_1,
                text_2: input.text_2,
                li_1: input.li_1,
                li_2: input.li_2,
                strong: input.strong,
                imgSrc: input.imgSrc,
                imgTitle: input.imgTitle,
                aHref: input.aHref,
                aText: input.aText,
            },
        });
    };

    const handleRemoveContent = () => {
        onRemove({
            variables: {
                id: input.id,
            },
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <div className={styles.textBlock}>
                    <textarea 
                        onChange={(e) => setInput({ ...input, text_1: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.text_1}
                    />
                </div>

                <div className={styles.textBlock}>
                    <textarea 
                        onChange={(e) => setInput({ ...input, text_2: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.text_2}
                    />
                </div>
                
                <div className={styles.textBlock}>
                    <textarea 
                        onChange={(e) => setInput({ ...input, li_1: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.li_1}
                    />
                </div>
                
                <div className={styles.textBlock}>
                    <textarea 
                        onChange={(e) => setInput({ ...input, li_2: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.li_2}
                    />
                </div>
                
                <div className={styles.textBlock}>
                    <textarea 
                        onChange={(e) => setInput({ ...input, strong: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.strong}
                    />
                </div>
                
                <div className={styles.inputBlock}>
                    <input 
                        onChange={(e) => setInput({ ...input, imgSrc: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.imgSrc}
                    />
                    <input 
                        onChange={(e) => setInput({ ...input, imgTitle: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.imgTitle}
                    />
                </div>
                
                <div className={styles.inputBlock}>
                    <input 
                        onChange={(e) => setInput({ ...input, aHref: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.aHref}
                    />
                    <input 
                        onChange={(e) => setInput({ ...input, aText: e.target.value })}
                        className={styles.input}
                        type="text" 
                        value={input.aText}
                    />
                </div>
            </div>
            <div className={styles.btnBlock}>
                <div 
                    onClick={handleUpdateContent}
                    className={styles.update}>
                    &#10004;
                </div>
                <div 
                    onClick={handleRemoveContent}
                    className={styles.close}>
                    &times;
                </div>
            </div>
        </div>
    );
};

export default ContentItem;