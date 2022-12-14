import React, { useEffect, useState, useReducer } from 'react';
import Context from '../../Context';
import { onAuthStateChanged  } from "firebase/auth";
import { ref, onValue } from "firebase/database";

import { userValidStatus, currentUid, currentAvatar, emailInput, isUser } from '../../data/actions';
import { auth, database } from '../../firebase';
import Header from '../Header';
import Footer from '../Footer';
import DATA from '../../data';
import Loading from '../Loading';
import reducer from '../../data/reducer';
import Routing from '../../Routing';

import styles from './styles.module.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(()=>{
    const allContent = ref(database, '/data');
    onValue(allContent, (snapshot) => {
      const data = snapshot.val();
      setData(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid, photoURL, email } = user;
        dispatch(userValidStatus(`/users/${uid}`));
        dispatch(currentUid(uid));
        dispatch(currentAvatar(photoURL));
        dispatch(emailInput(email));
        dispatch(isUser(true));
      } else {
        dispatch(isUser(false));
      };
    });
  }, []);

  if(isLoading) return <Loading />;

  const { lang, header } = state;
  const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
  const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
  const { ua, en, ru } = header;
  const description = langUa ? ua.description : langRu ? ru.description : en.description;
  const title = langUa ? ua.logo : langRu ? ru.logo : en.logo;
  const head = document.querySelector('title');
  const html = document.getElementsByTagName('html')[0];
  const linkRu = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "ru");
  const linkUa = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "uk");
  const linkEn = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "en");
  const metaDiscription = document.getElementsByName("description")[0];
  const metaKeywords = document.getElementsByName("keywords")[0];
  const metaContent = data.categories.filter(lan => lan.lang.id === lang).map(meta => `${meta.name} AliExpress`).join(', ');
  html.lang = lang === "6311a2434690f0b08bf74075" ? "ua" : lang === "6311a25b4690f0b08bf74077" ? "ru" : "en";
  metaKeywords.content = `${metaContent}`;
  metaDiscription.content = `${title} - ${description}`;
  head.textContent = `${title} | ${description}`;
  linkRu.href = `ru`;
  linkUa.href = `ua`;
  linkEn.href = `en`;

  const value = { state, dispatch, data };

  return (
    <Context.Provider value={value}>
      <div className={styles.container}>
        <div className={styles.header}><Header /></div>
            <Routing title={title} lang={lang} />
        <div className={styles.footer}><Footer /></div>
      </div>
    </Context.Provider>
  );
};

export default App;
