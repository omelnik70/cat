import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { signOut, deleteUser, updateEmail, updatePassword } from "firebase/auth";
//import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

import { currentAvatar, userValidStatus } from '../../data/actions';
import { auth } from '../../firebase';
import Modal from '../../components/Modal';
//import { UPDATE_USER_MUTATION, REMOVE_USER_MUTATION } from '../../apollo/mutations';
import { storage } from '../../firebase';
import { ReactComponent as Nophoto } from '../../assets/icons/nophoto.svg';
import { ReactComponent as Addphoto } from '../../assets/icons/addphoto.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import styles from "./styles.module.scss";

function User ({ data, user, link, dispatch, lang, usersPage }) {
    const [focus, setFocus] = useState(false);
    const [editLoginFocus, setEditLoginFocus] = useState(false);
    const [editEmailFocus, setEditEmailFocus] = useState(false);
    const [editPasswordFocus, setEditPasswordFocus] = useState(false);
    const [logoutFocus, setLogoutFocus] = useState(false);
    const [deleteFocus, setDeleteFocus] = useState(false);
    const [modal, setModal] = useState(true);
    const [modalLogin, setModalLogin] = useState(true);
    const [modalEmail, setModalEmail] = useState(true);
    const [modalPassword, setModalPassword] = useState(true);
    const [modalUser, setModalUser] = useState(true);
    const [modalEmailInfo, setModalEmailInfo] = useState(true);
    const [modalPasswordInfo, setModalPasswordInfo] = useState(true);
    const [prevent, setPrevent] = useState({
        prevention: false,
        editLogin: false,
        editEmail: false,
        editPassword: false,
        inputLogin: '',
        inputEmail: '',
        inputPassword: '',
        checkLogin: true,
        checkEmail: true,
        checkPassword: true,
        validLogin: false,
        validEmail: false,
        changeEmailInfo: false,
        changePasswordInfo: false,
        deleteUserInfo: false,
    });
    const { 
        prevention, 
        editLogin, 
        editEmail, 
        editPassword,
        inputLogin, 
        inputEmail, 
        inputPassword,
        checkLogin, 
        checkEmail, 
        checkPassword,  
        validLogin, 
        validEmail,
        changeEmailInfo,
        changePasswordInfo,
        deleteUserInfo,
    } = prevent;

    let searchLogin, searchEmail;

    useEffect(() => {
        searchLogin = data.filter(item => item.login === inputLogin).length;
        searchEmail = data.filter(item => item.email === inputEmail).length;
    }, []);

    const lengthInput = inputLogin.length;
    const novigate = useNavigate();
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = usersPage;
    const title = langUa ? ua.title : langRu ? ru.title : en.title;
    const logout = langUa ? ua.logout : langRu ? ru.logout : en.logout;
    const change = langUa ? ua.change : langRu ? ru.change : en.change;
    const warningImgOne = langUa ? ua.warningImgOne : langRu ? ru.warningImgOne : en.warningImgOne;

    useEffect(() => {
        setPrevent({...prevent, 
            checkLogin: (lengthInput > 2 && lengthInput < 11) ? false : true,
            checkEmail: (inputEmail.includes('@') && inputEmail.includes('.') && inputEmail.length >= 8) ? false : true,
            checkPassword: inputPassword.length >= 6 ? false : true,
            validLogin: searchLogin ? true : false,
            validEmail: searchEmail ? true : false
        });
    }, [inputLogin, inputEmail, inputPassword]);

    // const [updateUser] = useMutation(UPDATE_USER_MUTATION);
    // const [removeUser] = useMutation(REMOVE_USER_MUTATION, {
    //     update(cache, { data: { deleteUser } }) {
    //         cache.modify({
    //             fields: {
    //                 users(currentUsers = []) {
    //                     return currentUsers.filter(user => user.__ref !== `User:${deleteUser.id}`)
    //                 },
    //             },
    //         });
    //     },
    // });

    const { avatar, email, login, password, avatarDeleteLink } = user;

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
                        // updateUser({
                        //     variables: {
                        //         id,
                        //         avatar: downloadURL,
                        //         avatarDeleteLink: name,
                        //     },
                        // });     
                        dispatch(currentAvatar(downloadURL));
                    });
                }
            );
        } else {
            setPrevent({ ...prevent, prevention: true });
            setModal(true);
        }
    };

    const handleClickDeleteAvatar = () => {
        const desertRef = ref(storage, `users/${avatarDeleteLink}`);
        deleteObject(desertRef).then(() => {
            // updateUser({
            //     variables: {
            //         id,
            //         avatar: "",
            //         avatarDeleteLink: "",
            //     },
            // });
            dispatch(currentAvatar(''));
        }).catch((error) => {
        });
    };

    const handleClickEditLogin = () => {
        setPrevent({ ...prevent, editLogin: true });
        setModalLogin(true);
    };

    const handleClickEditEmail = () => {
        setPrevent({ ...prevent, editEmail: true });
        setModalEmail(true);
    };

    const handleClickEditPassword = () => {
        setPrevent({ ...prevent, editPassword: true });
        setModalPassword(true);
    };

    const handleClickLogin = () => {
        // updateUser({
        //     variables: {
        //         id,
        //         login: inputLogin,
        //     },
        // });
        setPrevent({...prevent, inputLogin: ''});
        setModalLogin(false);
    };

    const handleClickEmail = () => {
        updateEmail(auth.currentUser, inputEmail).then(() => {
            console.log('Email updated!');
            // updateUser({
            //     variables: {
            //         id,
            //         email: inputEmail,
            //     },
            // });
            setPrevent({
                ...prevent, 
                inputEmail: '',
                changeEmailInfo: false,
            });
            setModalEmail(false);
          }).catch((error) => {
            console.log('An error occurred');
            setPrevent({
                ...prevent, 
                changeEmailInfo: true,
            });
            setModalEmail(false);
            setModalEmailInfo(true);
          });
    };

    const handleClickPassword = () => {
        const user = auth.currentUser;
        updatePassword(user, inputPassword).then(() => {
            console.log('Password updated!');
            // updateUser({
            //     variables: {
            //         id,
            //         password: inputPassword,
            //     },
            // });
            setPrevent({
                ...prevent, 
                inputPassword: '',
                changePasswordInfo: false,
            });
            setModalPassword(false);
          }).catch((error) => {
            console.log('An error occurred');
            setPrevent({
                ...prevent, 
                changePasswordInfo: true,
            });
            setModalPassword(false);
            setModalPasswordInfo(true);
          });
    };

    const handleKey = (e) => {
        if (e.key === "Enter") handleClickLogin();
    };

    const handleClickLogout = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful.');
          }).catch((error) => {
            console.log('An error happened.')
          });
          dispatch(userValidStatus("/login"));
    };

    const handleClickDeleteUser = () => {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            console.log('User deleted.');
            // removeUser({
            //     variables: {
            //         id,
            //     },
            // });
            dispatch(userValidStatus("/login"));
            setPrevent({
                ...prevent, 
                deleteUserInfo: false,
            });
            novigate('/');
        }).catch((error) => {
            console.log('An error ocurred');
            setPrevent({
                ...prevent, 
                deleteUserInfo: true,
            });
            setModalUser(true);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.titleLogin}>
                    <h2>{title}</h2>
                    {login ? (<p>{`@_${login}:`}</p>) : (<p>{`@_${loginDefault}`}</p>)}
                </div>
                <div 
                    className={styles.logoutBlock}
                    onPointerEnter={() => setLogoutFocus(true)} 
                    onPointerLeave={() => setLogoutFocus(false)}
                    onClick={handleClickLogout}
                >
                    <Logout />
                    {logoutFocus && (
                        <span className={styles.logoutMessage}>{logout}</span>
                    )}
                </div>
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
                                <span className={styles.message}>{change}</span>
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
                                {warningImgOne.map((item, index) => (<p key={index}>{item}</p>))}
                            </div>
                        </>
                    )}
                    {(avatar && !focus) && (<img src={avatar} alt="" />)}
                    {(avatar && focus) && (
                        <>
                            <label htmlFor="avatar"><span  className={styles.message}>Удалить</span>
                                <img onClick={handleClickDeleteAvatar} id="avatar" src={avatar} alt="" />
                                <Delete className={styles.delete} />
                            </label>
                        </>
                    )}
                </div>
                <div   
                    onPointerEnter={() => setEditLoginFocus(true)} 
                    onPointerLeave={() => setEditLoginFocus(false)}
                    onClick={handleClickEditLogin}
                    className={styles.border}
                >
                    <div className={styles.loginBlock}>
                        <div className={styles.block}>
                            <h4>Логин:</h4>
                            {login ? (<p>{`@_${login}`}</p>) : (<p>{`@_${loginDefault}`}</p>)}
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        {editLoginFocus && (
                            <>
                                <Edit />
                                <span className={styles.editMessage}>{change}</span>
                            </>
                        )}
                    </div>
                </div>
                <div 
                    onPointerEnter={() => setEditEmailFocus(true)} 
                    onPointerLeave={() => setEditEmailFocus(false)}
                    onClick={handleClickEditEmail}
                    className={styles.border}
                >
                    <div className={styles.emailBlock}>
                        <div className={styles.block}>
                            <h4>Email:</h4>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        {editEmailFocus && (
                            <>
                                <Edit />
                                <span className={styles.editMessage}>{change}</span>
                            </>
                        )}
                    </div>
                </div>
                <div 
                    onPointerEnter={() => setEditPasswordFocus(true)} 
                    onPointerLeave={() => setEditPasswordFocus(false)}
                    onClick={handleClickEditPassword}
                    className={styles.border}>
                    <div className={styles.passwordBlock}>
                        <div className={styles.block}>
                            <h4>Пароль:</h4>
                            {!editPasswordFocus ? (<p>*******</p>) : (<p>{password}</p>)}
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        {editPasswordFocus && (
                            <>
                                <Edit />
                                <span className={styles.editMessage}>{change}</span>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <h3>Комментарии (0):</h3>
            <p className={styles.listComments}>-- Вы пока ничего не комментировали --</p>
            <div 
                className={styles.deleteBlock}
                onPointerEnter={() => setDeleteFocus(true)} 
                onPointerLeave={() => setDeleteFocus(false)}
            >
                <div 
                    onClick={handleClickDeleteUser}
                    className={styles.deleteIcon}>
                    <Delete />
                    {deleteFocus && (
                        <span className={styles.deleteMessage}>Удалить</span>
                    )}
                </div>   
            </div>
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
            {changeEmailInfo && (
                <Modal active={modalEmailInfo} setActive={setModalEmailInfo} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Чтобы изменить email:</p>
                            <p>1. Выйдите из аккаунта.</p>
                            <p>2. Зайдите снова в аккаунт.</p>
                            <p>3. Нажмите "Изменить email".</p>
                        </div>
                        <button onClick={() => setModalEmailInfo(false)}>Понятно</button>
                    </div>
                </Modal>
            )}
            {changePasswordInfo && (
                <Modal active={modalPasswordInfo} setActive={setModalPasswordInfo} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Чтобы изменить пароль:</p>
                            <p>1. Выйдите из аккаунта.</p>
                            <p>2. Зайдите снова в аккаунт.</p>
                            <p>3. Нажмите "Изменить пароль".</p>
                        </div>
                        <button onClick={() => setModalPasswordInfo(false)}>Понятно</button>
                    </div>
                </Modal>
            )}
            {deleteUserInfo && (
                <Modal active={modalUser} setActive={setModalUser} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Чтобы удалить аккаунт:</p>
                            <p>1. Выйдите из аккаунта.</p>
                            <p>2. Зайдите снова в аккаунт.</p>
                            <p>3. Нажмите "Удалить аккаунт".</p>
                        </div>
                        <button onClick={() => setModalUser(false)}>Понятно</button>
                    </div>
                </Modal>
            )}
            {editLogin && (
                <Modal active={modalLogin} setActive={setModalLogin} link={link}>
                    <div className={styles.prevention}>
                        {checkLogin && !validLogin && (<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Логин должен содержать</p>
                            <p>от 3-х до 10-ти символов.</p>
                        </div>)}
                        {validLogin && ((<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Такой логин уже есть!</p>
                        </div>))}
                        <input 
                            onChange={(e) => setPrevent({...prevent, inputLogin: e.target.value})}
                            type="text" 
                            placeholder='Ведите Ваш логин'
                            onKeyPress={(e) => handleKey(e)}
                            value={inputLogin}
                        />
                        <button 
                            className={(!checkLogin && !validLogin) ? '' : `${styles.disabled}`}
                            onClick={handleClickLogin}
                            disabled={(!checkLogin && !validLogin) ? false : true}
                        >
                            Подтвердить
                        </button>
                    </div>
                </Modal>
            )}
            {editEmail && (
                <Modal active={modalEmail} setActive={setModalEmail} link={link}>
                    <div className={styles.prevention}>
                        {checkEmail && !validEmail && (<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Email введен некорректно!</p>
                        </div>)}
                        {validEmail && ((<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Такой email уже есть!</p>
                        </div>))}
                        <input 
                            onChange={(e) => setPrevent({...prevent, inputEmail: e.target.value})}
                            type="text" 
                            placeholder='Ведите Ваш Email'
                            onKeyPress={(e) => handleKey(e)}
                            value={inputEmail}
                        />
                        <button 
                            className={(!checkEmail && !validEmail) ? '' : `${styles.disabled}`}
                            onClick={handleClickEmail}
                            disabled={(!checkEmail && !validEmail) ? false : true}
                        >
                            Подтвердить
                        </button>
                    </div>
                </Modal>
            )}
            {editPassword && (
                <Modal active={modalPassword} setActive={setModalPassword} link={link}>
                    <div className={styles.prevention}>
                        {checkPassword && (<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>Пароль должен содержать</p>
                            <p>более 5 символов!</p>
                        </div>)}
                        <input 
                            onChange={(e) => setPrevent({...prevent, inputPassword: e.target.value})}
                            type="text" 
                            placeholder='Ведите Ваш пароль'
                            onKeyPress={(e) => handleKey(e)}
                            value={inputPassword}
                        />
                        <button 
                            className={!checkPassword ? '' : `${styles.disabled}`}
                            onClick={handleClickPassword}
                            disabled={!checkPassword ? false : true}
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