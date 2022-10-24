import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../../../Context';
import ContentItem from '../ContentItem';
import AddContent from '../AddContent';
import { UPDATE_CONTENT_MUTATION, REMOVE_CONTENT_MUTATION } from '../../../../../../../apollo/mutations';

import styles from './styles.module.scss';

function ContentList({ setActive }) {
    const { dataContent, state } = useContext(Context);
    const { art } = state;
    const [updateContent] = useMutation(UPDATE_CONTENT_MUTATION);
    const [removeContent] = useMutation(REMOVE_CONTENT_MUTATION, {
        update(cache, { data: { deleteContent } }) {
            cache.modify({
                fields: {
                    contents(currentContents = []) {
                        return currentContents.filter(content => content.__ref !== `Content:${deleteContent.id}`)
                    },
                },
            });
        },
    });

    return (
        <div className={styles.container}>
            <div
                onClick={() => setActive({ menu: false })}
                className={styles.close}>
                &times;
            </div>
            <AddContent />
            {dataContent.contents.filter(content => content.article.id === art)
            .map(content => (
                <ContentItem 
                    key={content.id}
                    onUpdate={updateContent}
                    onRemove={removeContent}
                    {...content}
                />
            ))}
        </div>
    );
};

export default ContentList;