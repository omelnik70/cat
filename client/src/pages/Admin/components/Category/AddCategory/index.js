import React, { useState, useContext } from 'react';

import Context from '../../../../../Context';
import styles from './styles.module.scss';

function AddCategory() {
    const { data, lang } = useContext(Context);

    const [inputs, setInputs] = useState({
        name: "",
        link: "",
        langId: lang,
    });

    const handleAddCategory = () => {
        setInputs({
            ...inputs,
            name: "",
            link: "",
        });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddCategory();
    };

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
                    {data.langs.map(lang => (
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