import React, { useState, useRef } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useMutation } from '@apollo/client';

import { UPDATE_USER_MUTATION } from '../../apollo/mutations';
import { storage } from '../../firebase';
import { ReactComponent as Nophoto } from '../../assets/icons/nophoto.svg';
import { ReactComponent as Addphoto } from '../../assets/icons/addphoto.svg';
import styles from "./styles.module.scss";

function User ({ user }) {
    const [focus, setFocus] = useState(false);
    const [updateUser] = useMutation(UPDATE_USER_MUTATION);

    const { avatar, email, login, password, id } = user;
    const avatarRef = useRef();

    const handleChangeImg = (e) => {
        const file = e.target.files[0];
        console.log(file);
        const storageRef = ref(storage, `users/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed', 
            (snapshot) => {}, 
            (error) => {}, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    updateUser({
                        variables: {
                            id,
                            avatar: downloadURL,
                        },
                    });
                });
            }
        );
    };

    return (
        <div className={styles.container}>
            <h2>Пользователь:</h2>
            <div className={styles.info}>
                <div 
                    onPointerEnter={() => setFocus(!focus)} 
                    onPointerLeave={() => setFocus(!focus)}
                    className={styles.photo}
                >
                    {avatar ? (<img src={avatar} alt="" />) : !focus ? (<Nophoto />) : 
                    focus && (
                        <label htmlFor="file">
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