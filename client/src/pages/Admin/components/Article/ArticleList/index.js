import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import ArticleItem from '../ArticleItem';
import AddArticle from '../AddArticle';
import { UPDATE_ARTICLE_MUTATION, REMOVE_ARTICLE_MUTATION } from '../../../../../apollo/mutations';

import styles from './styles.module.scss';

function ArticleList({ setActive }) {
    const { dataCat, state } = useContext(Context);
    const { cat, lang } = state;
    const currentCategoriesLang = dataCat.categories.filter(item => item.lang.id === lang);
    const selectCategory = currentCategoriesLang ? currentCategoriesLang.filter(item => item.id === cat)[0] : {};
    const {article} = selectCategory ? selectCategory : [];
    const [updateArticle] = useMutation(UPDATE_ARTICLE_MUTATION);
    const [removeArticle] = useMutation(REMOVE_ARTICLE_MUTATION, {
        update(cache, { data: { deleteArticle } }) {
            cache.modify({
                fields: {
                    articles(currentArticles = []) {
                        return currentArticles.filter(article => article.__ref !== `Article:${deleteArticle.id}`)
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
            <AddArticle />
            {article && article.map(art => (
                <ArticleItem 
                    key={art.id}
                    onUpdate={updateArticle}
                    onRemove={removeArticle}
                    {...art}
                />
            ))}
        </div>
    );
};

export default ArticleList;