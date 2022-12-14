import React, { 
    useState, 
    useContext, 
    useRef, 
    useEffect 
} from 'react';

import { storage } from '../../../../../../../firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import Context from '../../../../../../../Context';
import { currentArt, currentCat } from '../../../../../../../data/actions';

import styles from './styles.module.scss';

function AddContent() {
    
    const { data, state, dispatch } = useContext(Context);
    const { lang, cat } = state;
    const catCurrent = data.categories.filter(cat => cat.lang.id === lang);
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

    const handleAddContent = () => {
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
            //??????????????????, ???????????????? ???? ???????? ??????????????????
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
        deleteObject(desertRef).then(() => {}).catch((error) => {}));
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
        uploadBytes(storageRef, file).then((snapshot) => {});
        uploadTask.on('state_changed', 
            (snapshot) => {}, 
            (error) => {}, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs({
                        ...inputs, 
                        imgSrc: downloadURL,
                        uploaded: true,
                    });
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
                    placeholder='?????????????? ?????????? 1'
                    value={inputs.text_1}
                />
            </div>

            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, text_2: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='?????????????? ?????????? 2'
                    value={inputs.text_2}
                />
            </div>
            
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, li_1: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='?????????????? ?????????? ?????? ???????????? 1'
                    value={inputs.li_1}
                />
            </div>
            
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, li_2: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='?????????????? ?????????? ?????? ???????????? 2'
                    value={inputs.li_2}
                />
            </div>
            
            <div className={styles.textBlock}>
                <textarea 
                    onChange={(e) => setInputs({ ...inputs, strong: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='?????????????? ???????????? ??????????'
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
                    {Boolean(arrImg.length) && (<button onClick={handleUploadImg}>??????????????????</button>)}
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
                        placeholder='?????????????? ???????????? ?????? ????????????????'
                        value={inputs.imgSrc}
                    />
                    <input 
                        onChange={(e) => setInputs({ ...inputs, imgTitle: e.target.value })}
                        className={styles.input}
                        type="text" 
                        placeholder='?????????????? ?????????? ????????????????'
                        value={inputs.imgTitle}
                    />
                </div>
            </div>
            
            <div className={styles.linkBlock}>
                <input 
                    onChange={(e) => setInputs({ ...inputs, aHref: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='?????????????? ???????????? ?????? ????????????'
                    value={inputs.aHref}
                />
                <input 
                    onChange={(e) => setInputs({ ...inputs, aText: e.target.value })}
                    className={styles.input}
                    type="text" 
                    placeholder='?????????????? ?????????? ?????? ????????????'
                    value={inputs.aText}
                />
            </div>
            <div className={styles.selectBlock}>
                <div className={styles.category}>
                    <h3>???????????????? ??????????????????</h3>
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
                    <h3>???????????????? ????????????</h3>
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
                ???????????????? ?????????????????? ?? ????????????
            </button>
        </div>
    );
};

export default AddContent;