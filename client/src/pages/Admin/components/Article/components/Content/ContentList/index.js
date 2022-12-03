import React, { useContext } from 'react';

import Context from '../../../../../../../Context';
import ContentItem from '../ContentItem';
import AddContent from '../AddContent';

import styles from './styles.module.scss';

function ContentList({ setActive }) {
    const { data, state } = useContext(Context);
    const { art, lang, cat } = state;

    const currentCatLang = data && lang ? data.categories.filter(item => item.lang.id === lang) : [];
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
                    {...cont}
                />
            ))}
        </div>
    );
};

export default ContentList;