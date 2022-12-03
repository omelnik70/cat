import React, { useContext } from 'react';

import Context from '../../../../../Context';
import ArticleItem from '../ArticleItem';
import AddArticle from '../AddArticle';

import styles from './styles.module.scss';

function ArticleList({ setActive }) {
    const { data, state } = useContext(Context);
    const { cat, lang } = state;
    const currentCategoriesLang = data.categories.filter(item => item.lang.id === lang);
    const selectCategory = currentCategoriesLang ? currentCategoriesLang.filter(item => item.id === cat)[0] : {};
    const {article} = selectCategory ? selectCategory : [];

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
                    {...art}
                />
            ))}
        </div>
    );
};

export default ArticleList;