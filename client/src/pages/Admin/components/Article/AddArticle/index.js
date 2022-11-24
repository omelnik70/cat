import React, { 
    useState, 
    useContext, 
    useRef,
    useEffect,
} from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import { ADD_ARTICLE_MUTATION } from '../../../../../apollo/mutations';
import { CATEGORIES_QUERY } from '../../../../../apollo/queries';
import { currentCat } from '../../../../../data/actions';
import { createLink } from '../../../../../components/Helper/Helper';

import styles from './styles.module.scss';

function AddArticle() {
    
    const { data, state, dispatch } = useContext(Context);
    const { lang, cat } = state;
    const catCurrent = data.categories.filter(cat => cat.lang.id === lang);
    const categoryRef = useRef();
    const [inputs, setInputs] = useState({
        title: "",
        link: "",
    });

    useEffect(() => {
        dispatch(currentCat(categoryRef.current.value));
    }, [lang, dispatch]);
    
    const [addArticle, { error }] = useMutation(ADD_ARTICLE_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: MENUS_QUERY }
        // ],

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newCategory } }) {
            const { categories } = cache.readQuery({ query: CATEGORIES_QUERY });
            cache.writeQuery({ 
                query: CATEGORIES_QUERY,
                data: {
                    categories: [...categories, newCategory]
                },
            });
        },
    });

    const handleAddArticle = () => {
        addArticle({
            variables: {
                title: inputs.title,
                link: createLink(inputs.link),
                rating: 0,
                previews: 0,
                like: 0,
                dislike: 0,
                categoryId: cat
            },
        });
        setInputs({
            ...inputs,
            title: "",
            link: "",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddArticle();
    };

    if (error) return `Error! ${error.message}`;

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <input 
                    onChange={(e) => setInputs({...inputs, title: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    placeholder="Введите название статьи"
                    value={inputs.title}
                />
                <input 
                    onChange={(e) => setInputs({...inputs, link: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    placeholder="Введите название статьи на английском"
                    value={inputs.link}
                />
                <div className={styles.category}>
                    <h3>Выберите категорию</h3>
                    <select
                        ref={categoryRef}
                        onChange={() => dispatch(currentCat(categoryRef.current.value))}
                    >
                        {catCurrent.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <button 
                    onClick={handleAddArticle}
                    onKeyPress={handleKey}
                >
                    Добавить статью
                </button>
            </div>
        </div>
    );
};

export default AddArticle;