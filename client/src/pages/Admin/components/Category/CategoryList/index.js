import React, { useContext } from 'react';

import Context from '../../../../../Context';
import CategoryItem from '../CategoryItem';
import AddCategory from '../AddCategory';

import styles from './styles.module.scss';

function CategoryList({ setActive }) {
    const { state, data } = useContext(Context);
    const { lang } = state;

    return (
        <div className={styles.container}>
            <div
                onClick={() => setActive({ category: false })}
                className={styles.close}
            >
                &times;
            </div>
            <AddCategory />
            {data.categories.filter(cat => cat.lang.id === lang)
            .map(category => (
                <CategoryItem 
                    key={category.id}
                    {...category}
                />
            ))}
        </div>
    );
};

export default CategoryList;