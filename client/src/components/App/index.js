import React, { useEffect, useState, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import Context from '../../Context';
import { onAuthStateChanged  } from "firebase/auth";
import { ref, onValue } from "firebase/database";

import { userValidStatus, currentUid, currentAvatar, emailInput, isUser } from '../../data/actions';
import { auth, database } from '../../firebase';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';
import Admin from '../../pages/Admin';
import Error from '../../pages/Error';
import DATA from '../../data';
import Loading from '../Loading';
import reducer from '../../data/reducer';
import Login from '../../pages/Form/Login';
import Register from '../../pages/Form/Register';
import Pages from '../../pages';

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
  const metaDiscription = document.getElementsByName("description")[0];
  const metaContent = data.categories.filter(lan => lan.lang.id === lang).map(meta => `${meta.name} AliExpress`).join(', ');
  metaDiscription.content = `${metaContent}`;
  head.textContent = `${title} | ${description}`;

  const value = { state, dispatch, data };

  return (
    <Context.Provider value={value}>
      <div className={styles.container}>
        <div className={styles.header}><Header /></div>
          <Routes>
            <Route path="/" element={<Content/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/privacy_policy" element={<Pages />} />
            <Route path="/about" element={<Pages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/:category" element={<Content />} />
            <Route path="/:category/:post" element={<Content />} />
            <Route path="/users/:id" element={<Content />} />
            <Route path="*" element={<Error />} />
          </Routes>
        <div className={styles.footer}><Footer /></div>
      </div>
    </Context.Provider>
  );
};

export default App;
