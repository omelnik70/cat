import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useMutation } from '@apollo/client';

//import { transliter } from '../../components/Helper/Helper';
//скрыть пароль
//добавить фото юзера в хэдэр
//подключить в инпут transliter
//переходить в комментариям
import Modal from '../../components/Modal';
import { UPDATE_USER_MUTATION } from '../../apollo/mutations';
import { storage } from '../../firebase';
import { ReactComponent as Nophoto } from '../../assets/icons/nophoto.svg';
import { ReactComponent as Addphoto } from '../../assets/icons/addphoto.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import styles from "./styles.module.scss";

function User ({ user, link }) {
    const [focus, setFocus] = useState(false);
    const [modal, setModal] = useState(true);
    const [modalLogin, setModalLogin] = useState(true);
    const [editFocus, setEditFocus] = useState(false);
    const [prevent, setPrevent] = useState({
        prevention: false,
        editLogin: false,
        inputLogin: '',
        btnDisabled: true,
    });
    const { prevention, editLogin, inputLogin, btnDisabled } = prevent;
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    const { avatar, email, login, password, id, avatarDeleteLink } = user;

    const at = email.indexOf("@");
    const loginDefault = email.substring(0, at).trim();

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        const { size, name } = file;
        if (size < 2001) {
            const storageRef = ref(storage, `users/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', 
                (snapshot) => {}, 
                (error) => {}, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        updateUser({
                            variables: {
                                id,
                                avatar: downloadURL,
                                avatarDeleteLink: name,
                            },
                        });
                    });
                }
            );
        } else {
            setPrevent({ ...prevent, prevention: true });
            setModal(true);
        }
    };

    const handleClickDelete = () => {
        const desertRef = ref(storage, `users/${avatarDeleteLink}`);
        deleteObject(desertRef).then(() => {
            updateUser({
                variables: {
                    id,
                    avatar: "",
                    avatarDeleteLink: "",
                },
            });
        }).catch((error) => {
        });
    };

    const handleClickEdit = () => {
        setPrevent({ ...prevent, editLogin: true });
        setModal(true);
    };

    useEffect(() => {
        const length = inputLogin.length;
        if(length > 2 && length < 11) {
            setPrevent({...prevent, btnDisabled: false});
        } else {
            setPrevent({...prevent, btnDisabled: true});
        };
        if(!modal) {
            setPrevent({...prevent, inputLogin: ''});
        };
    }, [inputLogin, modal]);

    const handleClickLogin = () => {
        updateUser({
            variables: {
                id,
                login: inputLogin,
            },
        });
        setPrevent({...prevent, inputLogin: ''});
        setModal(false);
    };

    const handleKey = (e) => {
        console.log(e.key);
        if (e.key === "Enter") handleClickLogin();
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Пользователь:</h2>
                {login ? (<p>{`@_${login}:`}</p>) : (<p>{`@_${loginDefault}`}</p>)}
            </div>
            <div className={styles.info}>
                <div 
                    onPointerEnter={() => setFocus(true)} 
                    onPointerLeave={() => setFocus(false)}
                    className={styles.photo}
                >
                    {(!avatar && !focus) && (<Nophoto />)}
                    {(!avatar && focus) && (
                        <>
                            <label className={styles.file} htmlFor="file">
                                <span className={styles.message}>Изменить</span>
                                <Addphoto />
                                <input 
                                    id="file"
                                    onChange={(e) => handleChangeImg(e)}
                                    type="file" 
                                    accept=".jpeg,.png,.webp,.svg,.jpg,.gif"
                                />
                            </label>
                            <div className={styles.warning}>
                                <Info className={styles.warningSvg} />
                                <p>Рекомендуемый размер: 100 x 100 px;</p>
                                <p>Максимальный объем: 2 киллобайта.</p>
                            </div>
                        </>
                    )}
                    {(avatar && !focus) && (<img src={avatar} alt="" />)}
                    {(avatar && focus) && (
                        <>
                            <label htmlFor="avatar"><span  className={styles.message}>Удалить</span>
                                <img onClick={handleClickDelete} id="avatar" src={avatar} alt="" />
                                <Delete className={styles.delete} />
                            </label>
                        </>
                    )}
                </div>
                <div   
                    onPointerEnter={() => setEditFocus(true)} 
                    onPointerLeave={() => setEditFocus(false)}
                    onClick={handleClickEdit}
                    className={styles.border}
                >
                    <div className={styles.loginBlock}>
                        <div className={styles.block}>
                            <h4>Логин:</h4>
                            {login ? (<p>{`@_${login}`}</p>) : (<p>{`@_${loginDefault}`}</p>)}
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        {editFocus && (
                            <>
                                <Edit className={styles.edit} />
                                <span className={styles.editMessage}>Изменить</span>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.border}>
                    <div className={styles.borderBold}>
                        <div className={styles.block}>
                            <h4>Email:</h4>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <div className={styles.border}>
                    <div className={styles.borderBold}>
                        <div className={styles.block}>
                            <h4>Пароль:</h4>
                            <p>{password}</p>
                        </div>
                    </div>
                </div>
            </div>
            <h3>Комментарии (0):</h3>
                {prevention && (
                    <Modal active={modal} setActive={setModal} link={link}>
                        <div className={styles.prevention}>
                            <p>Размер Вашего автар превышает лимит 2 киллобайта.</p>
                            <p>Пожалуйста выберите другой.</p>
                            <div className={styles.preventionWarning}>
                                <Info className={styles.svg} />
                                <p>Рекомендуемый размер: 100 x 100 px;</p>
                                <p>Максимальный объем: 2 киллобайта.</p>
                            </div>
                            <button onClick={() => setModal(false)}>Понятно</button>
                        </div>
                    </Modal>
                )}
                {editLogin && (
                    <Modal active={modalLogin} setActive={setModalLogin} link={link}>
                        <div className={styles.prevention}>
                            {btnDisabled && (<div className={styles.preventionWarning}>
                                <Info className={styles.svg} />
                                <p>Логин должен содержать</p>
                                <p>от 3-х до 10-ти символов.</p>
                            </div>)}
                            <input 
                                onChange={(e) => setPrevent({...prevent, inputLogin: e.target.value})}
                                type="text" 
                                placeholder='Ведите Ваш логин'
                                onKeyPress={(e) => handleKey(e)}
                                value={inputLogin}
                            />
                            <button 
                                className={!btnDisabled ? '' : `${styles.disabled}`}
                                onClick={handleClickLogin}
                                onKeyPress={(event) => console.log(event.key)}
                                disabled={!btnDisabled ? false : true}
                            >
                                Подтвердить
                            </button>
                        </div>
                    </Modal>
                )}
        </div>
    );
};

export default User;