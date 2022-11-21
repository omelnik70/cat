import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Account } from '../../assets/icons/account.svg';
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg';
import Navigation from './Navigation';
import Context from '../../Context';
import Lang from './Lang';

import styles from './styles.module.scss';


function Header () {
    const { state, dataLangs, dataUsers } = useContext(Context);
    const { lang, header, userValid, uid, avatar } = state;
    const [currentWidth, setCurrentWidth] = useState(window.screen.width);

    window.addEventListener('resize', () => setCurrentWidth(window.screen.width));
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const title = langUa ? ua.logo : langRu ? ru.logo : en.logo;
    //const avatar = uid ? dataUsers.users.filter(item => item.uid === uid)[0].avatar : '';
    

    return (
        <div className={styles.container}>
            {currentWidth > state.global.SCREENWIDTH ? 
            (<>
                <Link to="/">
                <h1 className={styles.titleSite}>{title}</h1>
                </Link>
                <div className={styles.navigation}>
                    <Navigation />
                </div>
                <ul className={styles.lang}>
                    <Lang data={dataLangs} />
                </ul>
                <Link to={userValid}>
                        {(userValid !== "/login" && !avatar) && (<Avatar className={styles.account} />)}
                        {(userValid !== "/login" && avatar) && (<img className={styles.avatar} src={avatar} alt=''></img>)}
                        {userValid === "/login" && (<Account className={styles.account} />)}
                </Link>
            </>) :
            (<>
                <Link to="/">
                    <h1 className={styles.titleSite}>{title}</h1>
                </Link>
                <div className={styles.navigation}>
                    <Navigation />
                </div>
            </>)}   
        </div>
    );
}

export default Header;