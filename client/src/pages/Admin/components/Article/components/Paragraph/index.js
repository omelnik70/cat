import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { UPDATE_PARAGRAPH_MUTATION, REMOVE_PARAGRAPH_MUTATION } from '../../../../../../apollo/mutations';

import styles from './styles.module.scss';

function Paragraph() {
    const [input, setInput] = useState({
        id: "",
        text: "",
    });

    const [onUpdate] = useMutation(UPDATE_PARAGRAPH_MUTATION);
    const [onRemove] = useMutation(REMOVE_PARAGRAPH_MUTATION, {
        update(cache, { data: { deleteParagraph } }) {
            cache.modify({
                fields: {
                    paragraphs(currentParagraphs = []) {
                        return currentParagraphs.filter(paragraph => paragraph.__ref !== `Paragraph:${deleteParagraph.id}`)
                    },
                },
            });
        },
    });

    const handleUpdateParagraph = () => {
        onUpdate({
            variables: {
                id: input.id,
                text: input.text,
            },
        });
    };

    const handleRemoveParagraph = () => {
        onRemove({
            variables: {
                id: input.id,
            },
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputBlock}>
                <textarea 
                    onChange={(e) => setInput({ ...input, text: e.target.value })}
                    className={styles.input}
                    type="text" value={input.title}
                />
            </div>
            <div 
                onClick={handleUpdateParagraph}
                className={styles.update}>
                &#10004;
            </div>
            <div 
                onClick={handleRemoveParagraph}
                className={styles.close}>
                &times;
            </div>
        </div>
    );
};

export default Paragraph;