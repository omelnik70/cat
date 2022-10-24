import React, { useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import CategoryItem from '../CategoryItem';
import AddCategory from '../AddCategory';
import { UPDATE_CATEGORY_MUTATION, REMOVE_CATEGORY_MUTATION } from '../../../../../apollo/mutations';

import styles from './styles.module.scss';

function CategoryList({ setActive }) {
    const { state, dataCat } = useContext(Context);
    const { lang } = state;
    const [updateCategory] = useMutation(UPDATE_CATEGORY_MUTATION);
    const [removeCategory] = useMutation(REMOVE_CATEGORY_MUTATION, {
        update(cache, { data: { deleteCategory } }) {
            cache.modify({
                fields: {
                    categories(currentCategories = []) {
                        return currentCategories.filter(category => category.__ref !== `Category:${deleteCategory.id}`)
                    },
                },
            });
        },
    });

    return (
        <div className={styles.container}>
            <div
                onClick={() => setActive({ category: false })}
                className={styles.close}
            >
                &times;
            </div>
            <AddCategory />
            {dataCat.categories.filter(cat => cat.lang.id === lang)
            .map(category => (
                <CategoryItem 
                    key={category.id}
                    onUpdate={updateCategory}
                    onRemove={removeCategory}
                    {...category}
                />
            ))}
        </div>
    );
};

export default CategoryList;