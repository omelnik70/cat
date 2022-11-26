import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { signOut, deleteUser, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { ref as refData, update, remove } from "firebase/database";
import { useNavigate } from 'react-router';

import { database } from '../../firebase';
import { currentAvatar, userValidStatus } from '../../data/actions';
import { auth } from '../../firebase';
import Modal from '../../components/Modal';
import { storage } from '../../firebase';
import { ReactComponent as Nophoto } from '../../assets/icons/nophoto.svg';
import { ReactComponent as Addphoto } from '../../assets/icons/addphoto.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import styles from "./styles.module.scss";

function User ({ user, link, dispatch, lang, usersPage, avatar }) {
    const [focus, setFocus] = useState(false);
    const [editEmailFocus, setEditEmailFocus] = useState(false);
    const [editPasswordFocus, setEditPasswordFocus] = useState(false);
    const [logoutFocus, setLogoutFocus] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);
    const [deleteFocus, setDeleteFocus] = useState(false);
    const [modal, setModal] = useState(true);
    const [modalEmail, setModalEmail] = useState(true);
    const [modalPassword, setModalPassword] = useState(true);
    const [modalUser, setModalUser] = useState(true);
    const [modalEmailInfo, setModalEmailInfo] = useState(true);
    const [modalPasswordInfo, setModalPasswordInfo] = useState(true);
    const [prevent, setPrevent] = useState({
        prevention: false,
        editEmail: false,
        editPassword: false,
        inputEmail: '',
        inputPassword: '',
        checkEmail: true,
        checkPassword: true,
        validEmail: false,
        changeEmailInfo: false,
        changePasswordInfo: false,
        deleteUserInfo: false,
    });
    const { 
        prevention, 
        editEmail, 
        editPassword,
        inputEmail, 
        inputPassword,
        checkEmail, 
        checkPassword, 
        validEmail,
        changeEmailInfo,
        changePasswordInfo,
        deleteUserInfo,
    } = prevent;

    const { email, password, uid, avatar: avatarDelete } = user;

    let searchEmail;

    console.log(email, password, uid, avatarDelete);

    // useEffect(() => {
    //     searchEmail = data.filter(item => item.email === inputEmail).length;
    // }, []);

    const novigate = useNavigate();
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = usersPage;
    const title = langUa ? ua.title : langRu ? ru.title : en.title;
    const logout = langUa ? ua.logout : langRu ? ru.logout : en.logout;
    const change = langUa ? ua.change : langRu ? ru.change : en.change;
    const remove = langUa ? ua.remove : langRu ? ru.remove : en.remove;
    const comments = langUa ? ua.comments : langRu ? ru.comments : en.comments;
    const confirm = langUa ? ua.confirm : langRu ? ru.confirm : en.confirm;
    const understand = langUa ? ua.understand : langRu ? ru.understand : en.understand;
    const warningEmailOne = langUa ? ua.warningEmailOne : langRu ? ru.warningEmailOne : en.warningEmailOne;
    const warningEmailTwo = langUa ? ua.warningEmailTwo : langRu ? ru.warningEmailTwo : en.warningEmailTwo;
    const commentsText = langUa ? ua.commentsText : langRu ? ru.commentsText : en.commentsText;
    const passwordName = langUa ? ua.passwordName : langRu ? ru.passwordName : en.passwordName;
    const warningImgOne = langUa ? ua.warningImgOne : langRu ? ru.warningImgOne : en.warningImgOne;
    const warningImgTwo = langUa ? ua.warningImgTwo : langRu ? ru.warningImgTwo : en.warningImgTwo;
    const warningEmail = langUa ? ua.warningEmail : langRu ? ru.warningEmail : en.warningEmail;
    const warningPasswordOne = langUa ? ua.warningPasswordOne : langRu ? ru.warningPasswordOne : en.warningPasswordOne;
    const warningPasswordTwo = langUa ? ua.warningPasswordTwo : langRu ? ru.warningPasswordTwo : en.warningPasswordTwo;
    const warningUserDelete = langUa ? ua.warningUserDelete : langRu ? ru.warningUserDelete : en.warningUserDelete;
    const warningLogin = langUa ? ua.warningLogin : langRu ? ru.warningLogin : en.warningLogin;
    const linkRef = `data/users/${uid}`;
    const userRef = refData(database, linkRef);

    useEffect(() => {
        setPrevent({...prevent, 
            checkEmail: (inputEmail.includes('@') && inputEmail.includes('.') && inputEmail.length >= 8) ? false : true,
            checkPassword: inputPassword.length >= 6 ? false : true,
            validEmail: searchEmail ? true : false
        });
    }, [inputEmail, inputPassword]);

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
                        updateProfile(auth.currentUser, {
                            photoURL: downloadURL
                        }).then(() => {
                            const user = auth.currentUser;
                            console.log('Profile updated!', user);
                            // ...
                        }).catch((error) => {
                            console.log('An error occurred');
                            // ...
                        }); 
                        update(userRef, {
                            avatar: name
                        });
                        dispatch(currentAvatar(downloadURL));
                    });
                }
            );
        };
        setPrevent({ ...prevent, prevention: true });
    };

    const handleClickDeleteAvatar = () => {
        const desertRef = ref(storage, `users/${avatarDelete}`);
        deleteObject(desertRef).then(() => {
            update(userRef, {
                avatar: ''
            });
            updateProfile(auth.currentUser, {
                photoURL: ''
              }).then(() => {}).catch((error) => {});
            dispatch(currentAvatar(''));
        }).catch((error) => {});
    };

    const handleClickEditEmail = () => {
        setPrevent({ ...prevent, editEmail: true });
        setModalEmail(true);
    };

    const handleClickEditPassword = () => {
        setPrevent({ ...prevent, editPassword: true });
        setModalPassword(true);
    };

    const handleClickEmail = () => {
        updateEmail(auth.currentUser, inputEmail).then(() => {
            update(userRef, {
                email: inputEmail
            });
            console.log('Email updated!');
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
            update(userRef, {
                password: inputPassword
            });
            console.log('Password updated!');
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

    const handleClickLogout = () => {
        signOut(auth).then(() => {
            console.log('Sign-out successful.');
          }).catch((error) => {
            console.log('An error happened.')
          });
          dispatch(userValidStatus("/login"));
          novigate('/');
    };

    const handleClickDeleteUser = () => {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            remove(userRef);
            console.log('User deleted.');
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

    const handleKey = (e) => {
        if (e.key === "Enter" && prevention) setModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <div className={styles.titleLogin}>
                    <h2>{title}</h2>
                    {<p
                        className={styles.nameLogin}
                        onPointerEnter={() => setLoginFocus(true)} 
                        onPointerLeave={() => setLoginFocus(false)}
                    >
                        {`@_${loginDefault}`}
                    </p>}
                    
                    {loginFocus && (<div className={styles.warning}>
                        <Info className={styles.warningSvg} />
                        {warningLogin.map((item, index) => (<p key={index}>{item}</p>))}
                    </div>)}
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
                            <label htmlFor="avatar"><span  className={styles.message}>{remove}</span>
                                <img onClick={handleClickDeleteAvatar} id="avatar" src={avatar} alt="" />
                                <Delete className={styles.delete} />
                            </label>
                        </>
                    )}
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
                            <h4>{passwordName}</h4>
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
            <h3>{comments} (0):</h3>
            <p className={styles.listComments}>{commentsText}</p>
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
                        <span className={styles.deleteMessage}>{remove}</span>
                    )}
                </div>   
            </div>
            {prevention && (
                <Modal active={modal} setActive={setModal} link={link}>
                    <div className={styles.prevention}>
                        {warningImgTwo.map((item, index) => (<p key={index}>{item}</p>))}
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            {warningImgOne.map((item, index) => (<p key={index}>{item}</p>))}
                        </div>
                        <button onClick={() => setModal(false)}>{understand}</button>
                    </div>
                </Modal>
            )}
            {changeEmailInfo && (
                <Modal active={modalEmailInfo} setActive={setModalEmailInfo} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            {warningEmail.map((item, index) => (<p key={index}>{item}</p>))}
                        </div>
                        <button onClick={() => setModalEmailInfo(false)}>{understand}</button>
                    </div>
                </Modal>
            )}
            {changePasswordInfo && (
                <Modal active={modalPasswordInfo} setActive={setModalPasswordInfo} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            {warningPasswordOne.map((item, index) => (<p key={index}>{item}</p>))}
                        </div>
                        <button onClick={() => setModalPasswordInfo(false)}>{understand}</button>
                    </div>
                </Modal>
            )}
            {deleteUserInfo && (
                <Modal active={modalUser} setActive={setModalUser} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            {warningUserDelete.map((item, index) => (<p key={index}>{item}</p>))}
                        </div>
                        <button onClick={() => setModalUser(false)}>{understand}</button>
                    </div>
                </Modal>
            )}
            {editEmail && (
                <Modal active={modalEmail} setActive={setModalEmail} link={link}>
                    <div className={styles.prevention}>
                        {checkEmail && !validEmail && (<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>{warningEmailOne}</p>
                        </div>)}
                        {validEmail && ((<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>{warningEmailTwo}</p>
                        </div>))}
                        <input 
                            onChange={(e) => setPrevent({...prevent, inputEmail: e.target.value})}
                            type="text" 
                            placeholder='Ведите Ваш Email'
                            //onKeyPress={(e) => handleKey(e)}
                            value={inputEmail}
                        />
                        <button 
                            className={(!checkEmail && !validEmail) ? '' : `${styles.disabled}`}
                            onClick={handleClickEmail}
                            disabled={(!checkEmail && !validEmail) ? false : true}
                        >
                            {confirm}
                        </button>
                    </div>
                </Modal>
            )}
            {editPassword && (
                <Modal active={modalPassword} setActive={setModalPassword} link={link}>
                    <div className={styles.prevention}>
                        {checkPassword && (<div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            {warningPasswordTwo.map((item, index) => (<p key={index}>{item}</p>))}
                        </div>)}
                        <input 
                            onChange={(e) => setPrevent({...prevent, inputPassword: e.target.value})}
                            type="text" 
                            placeholder='Ведите Ваш пароль'
                            //onKeyPress={(e) => handleKey(e)}
                            value={inputPassword}
                        />
                        <button 
                            className={!checkPassword ? '' : `${styles.disabled}`}
                            onClick={handleClickPassword}
                            disabled={!checkPassword ? false : true}
                        >
                            {confirm}
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default User;