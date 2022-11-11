import React, { 
    useState, 
    useContext, 
    useRef, 
    useEffect 
} from 'react';
import { useMutation } from '@apollo/client';

import { storage } from '../../../../../../../firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import Context from '../../../../../../../Context';
import { ADD_CONTENT_MUTATION } from '../../../../../../../apollo/mutations';
import { CONTENTS_QUERY } from '../../../../../../../apollo/queries';
import { currentArt, currentCat } from '../../../../../../../data/actions';

import styles from './styles.module.scss';

function AddContent() {
    
    const { dataCat, state, dispatch } = useContext(Context);
    const { lang, cat } = state;
    const catCurrent = dataCat.categories.filter(cat => cat.lang.id === lang);
    const artCurrent = catCurrent.filter(art => art.id === cat)[0];
    const {article} = artCurrent ? artCurrent : [];

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
        arrImg: [],
        file: null,
        uploaded: false,
    });

    const inputRef = useRef();
    const { arrImg, file, uploaded } = inputs;

    useEffect(() => {
        dispatch(currentArt(articleRef.current.value));
        //dispatch(currentCat(categoryRef.current.value));
    }, [lang, cat, dispatch]);

    const [addContent, { error }] = useMutation(ADD_CONTENT_MUTATION, {
        //новый запрос всего списка с сервера 
        // refetchQueries: [
        //     { query: CONTENTS_QUERY }
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
                li_2: inputs.li_2,
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
            arrImg: [],
            file: null,
            uploaded: false,
        });
        const files = inputRef.current;
        files.value = "";
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleAddContent();
    };

    if (error) return `Error! ${error.message}`;

    const changeArticle = (e) => dispatch(currentArt(e.target.value));
    const changeCat = (e) => dispatch(currentCat(e.target.value));

    const handleChangeImg = (e) => {
        const files = Array.from(e.target.files);
        setInputs({ 
            ...inputs, 
            arrImg: [],
            file: null,
         });
        files.forEach(file => {
            //проверяем, является ли файл картинкой
            if(!file.type.match('image')) {
                return;
            };
            const reader = new FileReader();
            reader.onload = ev => {
                const src = ev.currentTarget.result;
                arrImg.push(src);
                setInputs({
                    ...inputs, 
                    arrImg: arrImg,
                    file: file,
                });
            }
            reader.readAsDataURL(file);
        })
    };

    const handleCloseImg = (index) => {
        const desertRef = ref(storage, `images/${file.name}`);
        (uploaded &&
        deleteObject(desertRef).then(() => {
            //console.log('File deleted successfully');
          }).catch((error) => {
            //console.log('Uh-oh, an error occurred!', error)
          }));
        arrImg.splice(index, 1);
        setInputs({
            ...inputs, 
            arrImg: arrImg,
            imgSrc: "",
            file: null
        });
        const files = inputRef.current;
        files.value = "";
    };

    const handleUploadImg = () => {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadBytes(storageRef, file).then((snapshot) => {
            //console.log('Uploaded a blob or file!');
        });
        uploadTask.on('state_changed', 
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                // case 'paused':
                //     //console.log('Upload is paused');
                //     break;
                // case 'running':
                //     //console.log('Upload is running');
                //     break;
                // }
            }, 
            (error) => {
                //console.log('error', error);
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs({
                        ...inputs, 
                        imgSrc: downloadURL,
                        uploaded: true,
                    });
                    //console.log('File available at', imgSrc);
                });
            }
        );
    };

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
                <div className={styles.uploadBlock}>
                    <input 
                        ref={inputRef}
                        onChange={(e) => handleChangeImg(e)}
                        type="file" 
                        accept=".jpeg,.png,.webp,.svg,.jpg,.gif"
                    />
                    {Boolean(arrImg.length) && (<button onClick={handleUploadImg}>Загрузить</button>)}
                </div>
                <div className={styles.imgPreviews}>
                    {arrImg && arrImg.map((item, index) => (
                    <div key={index} className={styles.imgBlock}>
                        <img src={item} alt=''></img>
                        <div 
                            onClick={() => handleCloseImg(index)}
                            className={styles.close}>
                            &times;
                        </div>
                    </div>
                    ))}
                </div>
                <div className={styles.srcImgBlock}>
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
            </div>
            
            <div className={styles.linkBlock}>
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
                        {article && article.map(art => (
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