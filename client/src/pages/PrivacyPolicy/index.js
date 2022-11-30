import React, { useContext } from 'react';

import Context from '../../Context';
import styles from './styles.module.scss';

function PrivacyPolicy() {
  const { state } = useContext(Context);
  const { policy, lang } = state;
  const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
  const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
  const { ua, en, ru  } = policy;
  const title = langUa ? ua.title : langRu ? ru.title : en.title;
  const contents = langUa ? ua.contents : langRu ? ru.contents : en.contents;

  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      {contents.map((item, index) => (
        <div key={index} className={styles.container}>
          {item.subtitle && (<h3>{item.subtitle}</h3>)}
          <p>{item.pOne}
            {item.a.link && (<a href={item.a.link}>{item.a.text}</a>)}
            {item.pTwo}
          </p>
        </div>
      ))}
    </>
  );
}

export default PrivacyPolicy;
