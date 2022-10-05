import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import ArticleItem from '../ArticleItem';
import AddArticle from '../AddArticle';
import { UPDATE_ARTICLE_MUTATION, REMOVE_ARTICLE_MUTATION } from '../../../../../apollo/mutations';

import styles from './styles.module.scss';

function ArticleList({ setActive }) {
    const { dataArt, state } = useContext(Context);
    const { cat } = state;
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
            {dataArt.articles.filter(art => art.category.id === cat)
            .map(article => (
                <ArticleItem 
                    key={article.id}
                    onUpdate={updateArticle}
                    onRemove={removeArticle}
                    {...article}
                />
            ))}
        </div>
    );
};

export default ArticleList;