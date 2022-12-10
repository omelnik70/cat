import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import Context from '../../Context';
import Menu from './Menu';
import { ReactComponent as Copyright } from '../../assets/icons/copyright.svg';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg';
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg';
import { ReactComponent as Twitter } from '../../assets/icons/twitter.svg';
import { ReactComponent as Youtube } from '../../assets/icons/youtube.svg';
import { ReactComponent as Tiktok } from '../../assets/icons/tiktok.svg';
import { ReactComponent as Reddit } from '../../assets/icons/reddit.svg';

import styles from './styles.module.scss';

function Footer() {
  const { state } = useContext(Context);
  const { lang, header } = state;
  const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
  const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
  const { ua, en, ru } = header;
  const copyright = langUa ? ua.logo : langRu ? ru.logo : en.logo;
  const menu = langUa ? ua.menu : langRu ? ru.menu : en.menu;
  const submenu = langUa ? ua.submenu : langRu ? ru.submenu : en.submenu;
  const allMenu = menu.concat(submenu).filter(item => item.link !== '');

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <Link to="/">
          <div className={styles.copyrightBox}>
            <Copyright className={styles.copyrightImg} />
            <p className={styles.copyrightText}>{`${copyright} 2022`}</p>
          </div>
        </Link>
        <Menu />
        <div className={styles.socialLink}>
          <a href="https://www.facebook.com/groups/ali.ukraine"><Facebook className={styles.socialIcons} /></a>
          <a href="https://www.instagram.com/ali.in.ua"><Instagram className={styles.socialIcons} /></a>
          <a href="https://twitter.com/UaAliexpress"><Twitter className={styles.socialIcons} /></a>
          <a href="https://www.youtube.com/@Ali_Helper"><Youtube className={styles.socialIcons} /></a>
          <a href="https://www.tiktok.com/@ali.in.ua"><Tiktok className={styles.socialIcons} /></a>
          <a href="https://www.reddit.com/user/SWSCompany"><Reddit className={styles.socialIcons} /></a>
        </div>
      </div>
      <ul className={styles.navMax}>
        {allMenu.map((item, index) => (<li key={index}><a className={styles.mainMenu} href={item.link}>{item.text}</a></li>))}
      </ul>
      <div className={styles.authorBox}>
        <p>Creation of React applications for the Web</p>
        <a href="https://www.facebook.com/sergejomelnik/">Serhii Omelnik</a>
      </div>
    </div>
  );
}

export default Footer;
