import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useMutation } from '@apollo/client';

import { UPDATE_USER_MUTATION } from '../../apollo/mutations';
import { storage } from '../../firebase';
import { ReactComponent as Nophoto } from '../../assets/icons/nophoto.svg';
import { ReactComponent as Addphoto } from '../../assets/icons/addphoto.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import styles from "./styles.module.scss";

function User ({ user }) {
    const [focus, setFocus] = useState(false);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    const { avatar, email, login, password, id, avatarDeleteLink } = user;
    const avatarRef = useRef();

    console.log(focus, avatar)

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        const { size, name } = file;
        console.log(size); //size > 2000 - сделать сообщение, что размер превышает 2 киллоБайта. Подумать, где и как показать и убрать!
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

    return (
        <div className={styles.container}>
            <h2>Пользователь:</h2>
            <div className={styles.info}>
                <div 
                    onPointerEnter={() => setFocus(true)} 
                    onPointerLeave={() => setFocus(false)}
                    className={styles.photo}
                >
                    {(!avatar && !focus) && (<Nophoto />)}
                    {(!avatar && focus) && (
                        <label className={styles.file} htmlFor="file"><span className={styles.message}>Добавить аватар</span>
                            <Addphoto />
                            <input 
                                id="file"
                                onChange={(e) => handleChangeImg(e)}
                                ref={avatarRef}
                                type="file" 
                                accept=".jpeg,.png,.webp,.svg,.jpg,.gif"
                            />
                        </label>
                    )}
                    {(avatar && !focus) && (<img src={avatar} alt="" />)}
                    {(avatar && focus) && (
                        <label htmlFor="avatar"><span  className={styles.message}>Удалить аватар</span>
                            <img onClick={handleClickDelete} id="avatar" src={avatar} alt="" />
                            <Delete className={styles.delete} />
                        </label>)}
                </div>
                <div className={styles.block}>
                    <h4>Логин:</h4>
                    {login ? (<p>{login}:</p>) : (<p>Логин:</p>)}
                </div>
                <div className={styles.block}>
                    <h4>Email:</h4>
                    <p>{email}</p>
                </div>
                <div className={styles.block}>
                    <h4>Пароль:</h4>
                    <p>{password}</p>
                </div>
            </div>
            <h3>Комментарии (0):</h3>
            <p className={styles.line}></p>
        </div>
    );
};

export default User;