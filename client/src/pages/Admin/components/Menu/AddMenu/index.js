import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import { ADD_MENU_MUTATION } from '../../../../../apollo/mutations';
import { MENUS_QUERY } from '../../../../../apollo/queries';
import styles from './styles.module.scss';

function AddMenu() {
    const { dataLangs, lang } = useContext(Context);

    const [inputs, setInputs] = useState({
        name: "Введите название ссылки",
        link: "Введите ссылку",
        langId: lang
    });

    const [addMenu, { error }] = useMutation(ADD_MENU_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: MENUS_QUERY }
        // ],

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newMenu } }) {
            const { menus } = cache.readQuery({ query: MENUS_QUERY });
            cache.writeQuery({ 
                query: MENUS_QUERY,
                data: {
                    menus: [...menus, newMenu]
                },
            });
        },
    });

    const handleAddMenu = () => {
        addMenu({
            variables: {
                name: inputs.name,
                link: inputs.link,
                langId: inputs.langId
            },
        });
        setInputs({
            ...inputs,
            name: "Введите название ссылки",
            link: "Введите ссылку",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddMenu();
    };

    if (error) return `Error! ${error.message}`;
    
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <input 
                    onChange={(e) => setInputs({...inputs, name: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.name}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, link: e.target.value})}
                    className={styles.input} 
                    type="text" 
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
                    onClick={handleAddMenu}
                    onKeyPress={handleKey}
                >
                    Добавить пункт меню
                </button>
            </div>
        </div>
    );
};

export default AddMenu;