import React, { useContext } from 'react';

import assets from '../../assets';
import Context from '../../Context';
import styles from './styles.module.scss';

function About() {
  const { state } = useContext(Context);
  const { about, lang } = state;
  const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
  const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
  const { ua, en, ru  } = about;
  const title = langUa ? ua.title : langRu ? ru.title : en.title;
  const contents = langUa ? ua.contents : langRu ? ru.contents : en.contents;
  const contacts = langUa ? ua.contacts : langRu ? ru.contacts : en.contacts;
  const bye = langUa ? ua.bye : langRu ? ru.bye : en.bye;
  const socialNetworks = ru.socialNetworks;

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      {contents.map((item, index) => (
        <div key={index} className={styles.container}>
          {item.subtitle && (<h3>{item.subtitle}</h3>)}
          <p>{item.p}</p>
        </div>
      ))}
      <div className={styles.contactBox}>
        <div className={styles.infoBox}>
          <p>{contacts}</p>
          <div className={styles.linkBox}>
            {socialNetworks.map((item, index) => (<a key={index} href={item.link}><img width={20} height={20} src={item.img} alt='social networks' /></a>))}
          </div>
          <p>{bye}</p>
        </div>
        <img src={assets.IMAGES.AUTHOR} alt='author' />
      </div>
    </>
  );
}

export default About;
