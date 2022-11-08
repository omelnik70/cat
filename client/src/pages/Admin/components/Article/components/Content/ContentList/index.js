import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../../../Context';
import ContentItem from '../ContentItem';
import AddContent from '../AddContent';
import { UPDATE_CONTENT_MUTATION, REMOVE_CONTENT_MUTATION } from '../../../../../../../apollo/mutations';

import styles from './styles.module.scss';

function ContentList({ setActive }) {
    const { dataCat, state } = useContext(Context);
    const { art, lang, cat } = state;
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

    const currentCatLang = dataCat && lang ? dataCat.categories.filter(item => item.lang.id === lang) : [];
    const currentArticles = cat && currentCatLang ? currentCatLang.filter(item => item.id === cat)[0] : {};
    const {article} = currentArticles ? currentArticles : [];
    const selectArticle = art && article ? article.filter(item => item.id === art)[0] : {};
    const {content} = selectArticle ? selectArticle : [];

    return (
        <div className={styles.container}>
            <div
                onClick={() => setActive({ menu: false })}
                className={styles.close}>
                &times;
            </div>
            <AddContent />
            {content && content.map(cont => (
                <ContentItem 
                    key={cont.id}
                    onUpdate={updateContent}
                    onRemove={removeContent}
                    {...cont}
                />
            ))}
        </div>
    );
};

export default ContentList;