import React, { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { signOut, deleteUser, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { ref as refData, update, remove, onValue } from "firebase/database";
import { useNavigate } from 'react-router';

import LazyLoad from '../../components/LazyLoad';
import Comment from '../../components/Content/Category/Post/components/comment';
import { database } from '../../firebase';
import { currentAvatar, userValidStatus, currentUid } from '../../data/actions';
import { auth } from '../../firebase';
import Modal from '../../components/Modal';
import { storage } from '../../firebase';
import assets from '../../assets';
import { ReactComponent as Addphoto } from '../../assets/icons/addphoto.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Info } from '../../assets/icons/info.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import styles from "./styles.module.scss";

function User ({ user, link, dispatch, lang, usersPage, avatar }) {

    const [editPasswordFocus, setEditPasswordFocus] = useState(false);
    const [loginFocus, setLoginFocus] = useState(false);
    const [modal, setModal] = useState(true);
    const [modalEmail, setModalEmail] = useState(true);
    const [commentsIndex, setCommentsIndex] = useState(5);
    const [modalPassword, setModalPassword] = useState(true);
    const [modalUser, setModalUser] = useState(true);
    const [modalDeleteUser, setModalDeleteUser] = useState(true);
    const [modalEmailInfo, setModalEmailInfo] = useState(true);
    const [modalPasswordInfo, setModalPasswordInfo] = useState(true);
    const [commentsData, setCommentsData] = useState([]);
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
        deleteUserWarning: false,
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
        deleteUserWarning
    } = prevent;

    const { email, password, uid, avatar: avatarDelete } = user;
    const { ICONS } = assets;
    const { VISIBILITY, VISIBILITYOFF } = ICONS;
    let searchEmail;

    const novigate = useNavigate();

    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = usersPage;
    const pass = langUa ? ua.password : langRu ? ru.password : en.password;
    const title = langUa ? ua.title : langRu ? ru.title : en.title;
    const removeText = langUa ? ua.remove : langRu ? ru.remove : en.remove;
    const comments = langUa ? ua.comments : langRu ? ru.comments : en.comments;
    const confirm = langUa ? ua.confirm : langRu ? ru.confirm : en.confirm;
    const understand = langUa ? ua.understand : langRu ? ru.understand : en.understand;
    const warningEmailOne = langUa ? ua.warningEmailOne : langRu ? ru.warningEmailOne : en.warningEmailOne;
    const warningEmailTwo = langUa ? ua.warningEmailTwo : langRu ? ru.warningEmailTwo : en.warningEmailTwo;
    const commentsText = langUa ? ua.commentsText : langRu ? ru.commentsText : en.commentsText;
    const passwordName = langUa ? ua.passwordName : langRu ? ru.passwordName : en.passwordName;
    const warningImgOne = langUa ? ua.warningImgOne : langRu ? ru.warningImgOne : en.warningImgOne;
    const warningImgTwo = langUa ? ua.warningImgTwo : langRu ? ru.warningImgTwo : en.warningImgTwo;
    const more = langUa ? ua.more : langRu ? ru.more : en.more;
    const warningEmail = langUa ? ua.warningEmail : langRu ? ru.warningEmail : en.warningEmail;
    const warningPasswordOne = langUa ? ua.warningPasswordOne : langRu ? ru.warningPasswordOne : en.warningPasswordOne;
    const warningPasswordTwo = langUa ? ua.warningPasswordTwo : langRu ? ru.warningPasswordTwo : en.warningPasswordTwo;
    const warningUserDelete = langUa ? ua.warningUserDelete : langRu ? ru.warningUserDelete : en.warningUserDelete;
    const warningLogin = langUa ? ua.warningLogin : langRu ? ru.warningLogin : en.warningLogin;
    const warningdeleteUser = langUa ? ua.deleteUser : langRu ? ru.deleteUser : en.deleteUser;
    const reset = langUa ? ua.reset : langRu ? ru.reset : en.reset;
    const linkRef = `data/users/${uid}`;
    const userRef = refData(database, linkRef);

    useEffect(() => {
        const commentsRef = refData(database, `data/comments/${uid}`);
        onValue(commentsRef, (snapshot) => {
            const data = snapshot.val();
            data ? setCommentsData(Object.values(data).sort((a, b) => b.timestamp - a.timestamp)) : 
            setCommentsData([]);
        });
    }, []);

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
        console.log(file);
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
                        }).catch((error) => {}); 
                        update(userRef, {
                            avatar: name
                        });
                        dispatch(currentAvatar(downloadURL));
                    });
                }
            );
        } else {
            setPrevent({ ...prevent, prevention: true });
        };
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
            setPrevent({
                ...prevent, 
                inputEmail: '',
                changeEmailInfo: false,
            });
            setModalEmail(false);
          }).catch((error) => {
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
            setPrevent({
                ...prevent, 
                inputPassword: '',
                changePasswordInfo: false,
            });
            setModalPassword(false);
          }).catch((error) => {
            setPrevent({
                ...prevent, 
                changePasswordInfo: true,
            });
            setModalPassword(false);
            setModalPasswordInfo(true);
          });
    };

    const handleClickLogout = () => {
        signOut(auth).then(() => {}).catch((error) => {});
          dispatch(userValidStatus("/login"));
          dispatch(currentUid(''));
          novigate('/');
    };

    const handleClickDeleteUserWarning = () => {
        setPrevent({ ...prevent, deleteUserWarning: true });
        setModalDeleteUser(true);
    };

    const handleClickDeleteUserReset = () => {
        setModalDeleteUser(false);
        setPrevent({ ...prevent, deleteUserWarning: true });
    };

    const handleClickDeleteUser = () => {
        const user = auth.currentUser;
        deleteUser(user).then(() => {
            remove(userRef);
            dispatch(userValidStatus("/login"));
            setPrevent({
                ...prevent, 
                deleteUserInfo: false,
                deleteUserWarning: false
            });
            novigate('/');
        }).catch((error) => {
            setPrevent({
                ...prevent, 
                deleteUserInfo: true,
                deleteUserWarning: false
            });
            setModalUser(true);
        });
    };

    const handleClickMore = () => {
        setCommentsIndex(commentsIndex + 5);
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

                    <div className={styles.photoMobile}>
                        {!avatar && (
                            <>
                                <label htmlFor="file"><Addphoto /></label>
                                <input 
                                    id="file"
                                    onChange={(e) => handleChangeImg(e)}
                                    type="file" 
                                    name={'+'}
                                    accept=".jpeg,.png,.webp,.svg,.jpg,.gif"
                                />
                            </>
                        )}
                        {avatar && (
                            <>
                                <img id="avatar" src={avatar} alt="" />
                                <Delete onClick={handleClickDeleteAvatar} className={styles.delete} />
                            </>
                        )}
                    </div>
                    
                    {loginFocus && (<div className={styles.warning}>
                        <Info className={styles.warningSvg} />
                        {warningLogin.map((item, index) => (<p key={index}>{item}</p>))}
                    </div>)}
                </div>

                <div 
                    className={styles.logoutBlock}
                    onClick={handleClickLogout}
                >
                    <Logout />
                </div>
            </div>
            <div className={styles.info}>
                <div className={styles.photo}>
                    {!avatar && (
                        <>
                            <label className={styles.file} htmlFor="file">
                                <Addphoto />
                                <input 
                                    id="file"
                                    onChange={(e) => handleChangeImg(e)}
                                    type="file" 
                                    accept=".jpeg,.png,.webp,.svg,.jpg,.gif"
                                />
                            </label>
                        </>
                    )}
                    {avatar && (
                        <>
                            <img id="avatar" src={avatar} alt="" />
                            <Delete onClick={handleClickDeleteAvatar} className={styles.delete} />
                        </>
                    )}
                </div>
                <div className={styles.border}>
                    <div className={styles.emailBlock}>
                        <div className={styles.block}>
                            <h4>Email:</h4>
                            <p>{email}</p>
                        </div>
                    </div>
                    <div className={styles.editBlock}><Edit onClick={handleClickEditEmail} className={styles.edit} /></div>
                </div>
                <div className={styles.border}>
                    <div className={styles.passwordBlock}>
                        <div className={styles.block}>
                            <h4>{passwordName}</h4>
                            {!editPasswordFocus ? (<p>*******</p>) : (<p>{password}</p>)}
                        </div>
                    </div>
                    <div className={styles.editBlock}>
                        <img onClick={() => setEditPasswordFocus(!editPasswordFocus)} src={editPasswordFocus ? VISIBILITY : VISIBILITYOFF} alt=""  className={styles.visibil} />
                        <Edit onClick={handleClickEditPassword} className={styles.edit} />
                    </div>
                </div>
            </div>
            <h3>{comments} ({commentsData.length}):</h3>

            <div className={styles.desktop}>
                {commentsData && commentsData.map((item, index) => index < commentsIndex && (
                        <Comment 
                            key={index} 
                            avatar={item.avatar} 
                            login={item.login} 
                            timestamp={item.timestamp} 
                            text={item.text} 
                            like={item.like} 
                            dislike={item.dislike} 
                            articleId={item.articleId} 
                            userId={item.userId}
                            articleTitle={item.articleTitle}
                            articleLink={item.articleLink}
                            keyId={item.keyId} 
                            flag={true}
                            confirm={confirm}
                            cancel={reset}
                        />
                ))}
            </div>

            <LazyLoad arr={commentsData} int={5} lang={lang} flag={'user'} uid={uid} confirm={confirm} reset={reset} />

            {!commentsData.length && (<p className={styles.listComments}>{commentsText}</p>)}

            <div className={styles.desktop}>
                {(commentsData.length > commentsIndex) && (<p className={styles.more} onClick={handleClickMore}>{more}</p>)}
            </div>

            <div className={styles.deleteBlock}>
                <div 
                    onClick={handleClickDeleteUserWarning}
                    className={styles.deleteIcon}>
                    <Delete />
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
            {deleteUserWarning && (
                <Modal active={modalDeleteUser} setActive={setModalDeleteUser} link={link}>
                    <div className={styles.prevention}>
                        <div className={styles.preventionWarning}>
                            <Info className={styles.svg} />
                            <p>{warningdeleteUser}</p>
                        </div>
                        <div className={styles.btn}>
                            <button onClick={handleClickDeleteUser}>{removeText}</button>
                            <button onClick={handleClickDeleteUserReset}>{reset}</button>
                        </div>
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
                            placeholder='Email'
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
                            placeholder={pass}
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