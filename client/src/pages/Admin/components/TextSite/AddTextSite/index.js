import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import { ADD_TEXTSITE_MUTATION } from '../../../../../apollo/mutations';
import { TEXTSITES_QUERY } from '../../../../../apollo/queries';
import styles from './styles.module.scss';

function AddTextSite() {
    const { dataLangs, lang } = useContext(Context);

    const [inputs, setInputs] = useState({
        titleSite: "Введите название сайта",
        descriptionSite: "Введите краткое описание сайта до 50 символов",
        titleSearch: "Введите название поискового окна",
        titlePopularArticles: "Введите название популярных статей",
        likeInfo: "Была ли информация полезной?",
        like: "Полезно",
        dislike: "Бесполезно",
        langId: lang
    });

    const [addTextSite, { error }] = useMutation(ADD_TEXTSITE_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: MENUS_QUERY }
        // ],

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newTextSite } }) {
            const { textsites } = cache.readQuery({ query: TEXTSITES_QUERY });
            cache.writeQuery({ 
                query: TEXTSITES_QUERY,
                data: {
                    textsites: [...textsites, newTextSite]
                },
            });
        },
    });

    const handleAddTextSite = () => {
        addTextSite({
            variables: {
                titleSite: inputs.titleSite,
                descriptionSite: inputs.descriptionSite,
                titleSearch: inputs.titleSearch,
                titlePopularArticles: inputs.titlePopularArticles,
                likeInfo: inputs.likeInfo,
                like: inputs.like,
                dislike: inputs.dislike,
                langId: inputs.langId
            },
        });
        setInputs({
            ...inputs,
            titleSite: "Введите название сайта",
            descriptionSite: "Введите краткое описание сайта до 50 символов",
            titleSearch: "Введите название поискового окна",
            titlePopularArticles: "Введите название популярных статей",
            likeInfo: "Была ли информация полезной?",
            like: "Полезно",
            dislike: "Бесполезно",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddTextSite();
    };

    if (error) return `Error! ${error.message}`;
    
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <input 
                    onChange={(e) => setInputs({...inputs, titleSite: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.titleSite}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, descriptionSite: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.descriptionSite}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, titleSearch: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.titleSearch}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, titlePopularArticles: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.titlePopularArticles}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, likeInfo: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.likeInfo}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, like: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.like}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, dislike: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.dislike}
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
                    onClick={handleAddTextSite}
                    onKeyPress={handleKey}
                >
                    Добавить пункт меню
                </button>
            </div>
        </div>
    );
};

export default AddTextSite;