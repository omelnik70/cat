import React from 'react';
import { useContext } from 'react';

import Context from '../../Context';
import assets from '../../assets';
import styles from './styles.module.scss';


function Footer() {
  const { state, dataSite } = useContext(Context);
  const { lang } = state;

  const copyright = dataSite.textsites.filter(lan => lan.lang.id === lang)[0].titleSite;

  return (
    <div className={styles.container}>
        <div className={styles.copyrightBox}>
          <img src={assets.ICONS.COPYRIGHT} alt="" className={styles.copyrightImg} />
          <p className={styles.copyrightText}>{`${copyright} 2022`}</p>
        </div>
        <ul className={styles.socialLink}>
          {state.socialUrl.map((item, index) => 
          <li key={index}><a href={item.url}><img src={item.img} alt="" /></a></li>
          )}
        </ul>
    </div>
  );
}

export default Footer;
