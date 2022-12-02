import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { currentSearch } from '../../data/actions';
import { ReactComponent as Account } from '../../assets/icons/account.svg';
import { ReactComponent as Avatar } from '../../assets/icons/avatar.svg';
import Navigation from './Navigation';
import Context from '../../Context';
import Lang from './Lang';

import styles from './styles.module.scss';

function Header () {
    const { state, data, dispatch } = useContext(Context);
    const { lang, header, isUser, userValid, avatar } = state;
    const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
    const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
    const { ua, en, ru } = header;
    const title = langUa ? ua.logo : langRu ? ru.logo : en.logo;

    return (
        <div className={styles.container}>
            <Link to="/">
            <h1 className={styles.titleSite}>{title}</h1>
            </Link>
            <div className={styles.navigation}>
                <Navigation />
            </div>
            <ul className={styles.lang}>
                <Lang data={data} />
            </ul>
            <Link onClick={() => dispatch(currentSearch(''))} to={userValid}>
                    {(isUser && !avatar) && (<Avatar className={styles.account} />)}
                    {(isUser && avatar) && (<img className={styles.avatar} src={avatar} alt=''></img>)}
                    {!isUser && (<Account className={styles.account} />)}
            </Link>
        </div>
    );
}

export default Header;