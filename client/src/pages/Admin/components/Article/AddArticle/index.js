import React, { 
    useState, 
    useContext, 
    useRef,
    useEffect,
} from 'react';

import Context from '../../../../../Context';
import { currentCat } from '../../../../../data/actions';

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

    const handleAddArticle = () => {
        setInputs({
            ...inputs,
            title: "",
            link: "",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddArticle();
    };

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