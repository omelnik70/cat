import React, { useState } from 'react';

import styles from './styles.module.scss';

function CategoryItem({ id, name, link, onUpdate, onRemove }) {
    const [input, setInput] = useState({
        id: id,
        name: name,
        link: link,
    });

    const handleUpdateCategory = () => {
        onUpdate({
            variables: {
                id: input.id,
                name: input.name,
                link: input.link,
            },
        });
    };

    const handleRemoveCategory = () => {
        onRemove({
            variables: {
                id: input.id,
            },
        });
    };

    return (
        <div className={styles.container}>
            <input 
                onChange={(e) => setInput({ ...input, name: e.target.value })}
                className={styles.input}
                type="text" value={input.name}
            />
            <input 
                onChange={(e) => setInput({ ...input, link: e.target.value })}
                className={styles.input}
                type="text" value={input.link}
            />
            <div 
                onClick={handleUpdateCategory}
                className={styles.update}>
                &#10004;
            </div>
            <div 
                onClick={handleRemoveCategory}
                className={styles.close}>
                &times;
            </div>
        </div>
    );
};

export default CategoryItem;