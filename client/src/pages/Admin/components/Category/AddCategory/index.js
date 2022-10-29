import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import { ADD_CATEGORY_MUTATION } from '../../../../../apollo/mutations';
import { CATEGORIES_QUERY } from '../../../../../apollo/queries';
import styles from './styles.module.scss';

function AddCategory() {
    const { dataLangs, lang } = useContext(Context);

    const [inputs, setInputs] = useState({
        name: "",
        link: "",
        langId: lang,
    });

    const [AddCategory, { error }] = useMutation(ADD_CATEGORY_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: MENUS_QUERY }
        // ],

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newCategory }  }) {
            const { categories } = cache.readQuery({ query: CATEGORIES_QUERY });
            cache.writeQuery({ 
                query: CATEGORIES_QUERY,
                data: {
                    categories: [...categories, newCategory]
                },
            });
        },
    });

    const handleAddCategory = () => {
        AddCategory({
            variables: {
                name: inputs.name,
                link: inputs.link,
                langId: inputs.langId
            },
        });
        setInputs({
            ...inputs,
            name: "",
            link: "",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddCategory();
    };

    if (error) return `Error! ${error.message}`;

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <input 
                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    placeholder="Введите название категории"
                    value={inputs.name}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, link: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    placeholder="Введите ссылку"
                    value={inputs.link}
                />
                <div className={styles.lang}>
                    {dataLangs.langs.map(lang => (
                        <p key={lang.id}>
                            <input 
                                onChange={(e) => setInputs({...inputs, langId: e.target.value})}
                                type="radio" 
                                name="1" 
                                value={lang.id}
                            />
                                {lang.name}
                        </p>
                    ))}
                </div>
                <button 
                    onClick={handleAddCategory}
                    onKeyPress={handleKey}
                >
                    Добавить категорию
                </button>
            </div>
        </div>
    );
};

export default AddCategory;