import React, { 
    useState, 
    useContext, 
    useRef, 
    useEffect 
} from 'react';
import { useMutation } from '@apollo/client';

import Context from '../../../../../../../Context';
import { ADD_CONTENT_MUTATION } from '../../../../../../../apollo/mutations';
import { CONTENTS_QUERY } from '../../../../../../../apollo/queries';
import { currentArt, currentCat } from '../../../../../../../data/actions';

import styles from './styles.module.scss';

function AddContent() {
    
    const { dataArt, dataCat, state, dispatch } = useContext(Context);
    const { lang, cat } = state;
    const catCurrent = dataCat.categories.filter(cat => cat.lang.id === lang);
    const artCurrent = dataArt.articles.filter(art => art.category.id === cat);
    const articleRef = useRef();
    const categoryRef = useRef();
    const [inputs, setInputs] = useState({
        text_1: "",
        text_2: "",
        li_1: "",
        li_2: "",
        strong: "",
        imgSrc: "",
        imgTitle: "",
        aHref: "",
        aText: "",
    });

    useEffect(() => {
        dispatch(currentArt(articleRef.current.value));
        dispatch(currentCat(categoryRef.current.value));
    }, [lang, cat, dispatch]);

    const [addContent, { error }] = useMutation(ADD_CONTENT_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: MENUS_QUERY }
        // ],

        //обновление кэша без запроса на сервер 
        update(cache, { data: { newContent } }) {
            const { contents } = cache.readQuery({ query: CONTENTS_QUERY });
            cache.writeQuery({ 
                query: CONTENTS_QUERY,
                data: {
                    contents: [...contents, newContent]
                },
            });
        },
    });

    const handleAddContent = () => {
        addContent({
            variables: {
                text_1: inputs.text_1,
                text_2: inputs.text_2,
                li_1: inputs.li_1,
                li_2: inputs.text_2,
                strong: inputs.strong,
                imgSrc: inputs.imgSrc,
                imgTitle: inputs.imgTitle,
                aHref: inputs.aHref,
                aText: inputs.aText,
                articleId: state.art
            },
        });
        setInputs({
            ...inputs,
            text_1: "",
            text_2: "",
            li_1: "",
            li_2: "",
            strong: "",
            imgSrc: "",
            imgTitle: "",
            aHref: "",
            aText: "",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddContent();
    };

    if (error) return `Error! ${error.message}`;

    const changeArticle = (e) => dispatch(currentArt(e.target.value));
    const changeCat = (e) => dispatch(currentCat(e.target.value));

    return (
        <div className={styles.container}>
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, text_1: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите текст 1'
                    value={inputs.text_1}
                />
            </div>

            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, text_2: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите текст 2'
                    value={inputs.text_2}
                />
            </div>
            
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, li_1: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите текст для списка 1'
                    value={inputs.li_1}
                />
            </div>
            
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, li_2: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите текст для списка 2'
                    value={inputs.li_2}
                />
            </div>
            
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, strong: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите жирный текст'
                    value={inputs.strong}
                />
            </div>
            
            <div className={styles.inputBlock}>
                <input 
                    onChange={(e) => setInputs({ ...inputs, imgSrc: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите ссылку для картинки'
                    value={inputs.imgSrc}
                />
                <input 
                    onChange={(e) => setInputs({ ...inputs, imgTitle: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите текст картинки'
                    value={inputs.imgTitle}
                />
            </div>
            
            <div className={styles.inputBlock}>
                <input 
                    onChange={(e) => setInputs({ ...inputs, aHref: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите ссылку для текста'
                    value={inputs.aHref}
                />
                <input 
                    onChange={(e) => setInputs({ ...inputs, aText: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='Введите текст для ссылки'
                    value={inputs.aText}
                />
            </div>
            <div className={styles.selectBlock}>
                <div className={styles.category}>
                    <h3>Выберите категорию</h3>
                    <select
                        ref={categoryRef}
                        onChange={changeCat}
                    >
                        {catCurrent.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.article}>
                    <h3>Выберите статью</h3>
                    <select
                        ref={articleRef}
                        onChange={changeArticle}
                    >
                        {artCurrent.map(art => (
                            <option key={art.id} value={art.id}>{art.title}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button 
                onClick={handleAddContent}
                onKeyPress={handleKey}
            >
                Добавить соержимое к статье
            </button>
        </div>
    );
};

export default AddContent;