import React, { 
    useState, 
    useContext, 
    useRef, 
    useEffect 
} from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../Context';
import { ADD_ARTICLE_MUTATION } from '../../../../../apollo/mutations';
import { ARTICLES_QUERY } from '../../../../../apollo/queries';
import { currentCat } from '../../../../../data/actions';
import Paragraph from '../components/Paragraph';

import styles from './styles.module.scss';

function AddArticle() {
    
    const { dataCat, state, dispatch } = useContext(Context);
    const { lang } = state;
    const catCurrent = dataCat.categories.filter(cat => cat.lang.id === lang);
    const categoryRef = useRef();
    const [inputs, setInputs] = useState({
        title: "Введите название статьи",
    });

    useEffect(() => {
        dispatch(currentCat(categoryRef.current.value))
    }, [lang, dispatch]);

    const [addArticle, { error }] = useMutation(ADD_ARTICLE_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: MENUS_QUERY }
        // ],

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newArticle } }) {
            const { articles } = cache.readQuery({ query: ARTICLES_QUERY });
            cache.writeQuery({ 
                query: ARTICLES_QUERY,
                data: {
                    articles: [...articles, newArticle]
                },
            });
        },
    });

    const handleAddArticle = () => {
        addArticle({
            variables: {
                title: inputs.title,
                rating: 0,
                previews: 0,
                like: 0,
                dislike: 0,
                categoryId: state.cat
            },
        });
        setInputs({
            ...inputs,
            title: "Введите название статьи",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddArticle();
    };

    if (error) return `Error! ${error.message}`;

    const changeCat = (e) => dispatch(currentCat(e.target.value));

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <input 
                    onChange={(e) => setInputs({...inputs, title: e.target.value})}
                    className={styles.input} 
                    type="text" 
                    value={inputs.title}
                />
                <div className={styles.category}>
                    <select
                        ref={categoryRef}
                        onChange={changeCat}
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
            <Paragraph />
        </div>
    );
};

export default AddArticle;