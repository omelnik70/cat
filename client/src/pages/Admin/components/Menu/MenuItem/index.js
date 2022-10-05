import React, { useState } from 'react';

import styles from './styles.module.scss';

function MenuItem({ id, name, link, onUpdate, onRemove }) {
    const [input, setInput] = useState({
        id: id,
        name: name,
        link: link,
    });

    const handleUpdateMenu = () => {
        onUpdate({
            variables: {
                id: input.id,
                name: input.name,
                link: input.link,
            },
        });
    };

    const handleRemoveMenu = () => {
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
                onClick={handleUpdateMenu}
                className={styles.update}>
                &#10004;
            </div>
            <div 
                onClick={handleRemoveMenu}
                className={styles.close}>
                &times;
            </div>
        </div>
    );
};

export default MenuItem;