import React, { useEffect, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Context from '../../Context';
import { onAuthStateChanged  } from "firebase/auth";

import { userValidStatus } from '../../data/actions';
import { auth } from '../../firebase';
import { LANGS_QUERY, USERS_QUERY, CATEGORIES_QUERY} from '../../apollo/queries';
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

import styles from './styles.module.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, DATA);
  const { loading, error, data: dataLangs } = useQuery(LANGS_QUERY);
  const { loading: loadCat, error: errorCat, data: dataCat } = useQuery(CATEGORIES_QUERY);
  const { loading: loadUser, error: errorUser, data: dataUsers } = useQuery(USERS_QUERY);
  const { lang, header } = state;
  const langUa = lang === '6311a2434690f0b08bf74075' ? true : false;
  const langRu = lang === '6311a25b4690f0b08bf74077' ? true : false;
  const { ua, en, ru } = header;
  const description = langUa ? ua.description : langRu ? ru.description : en.description;
  const title = langUa ? ua.logo : langRu ? ru.logo : en.logo;

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid } = user;
        dispatch(userValidStatus(`/users/${uid}`));
      };
    });
  }, []);

  if (loading || loadCat || loadUser ) return <Loading />;
  if (error || errorCat || errorUser ) return `Error! ${error.message} ${errorCat.message}`;

  const head = document.querySelector('title');
  const metaDiscription = document.getElementsByName("description")[0];
  const metaContent = dataCat.categories.filter(lan => lan.lang.id === lang).map(meta => `${meta.name} AliExpress`).join(', ');
  head.textContent = `${title} | ${description}`;
  metaDiscription.content = `${metaContent}`;

  const value = {
    state, 
    dispatch,
    dataLangs,
    dataCat,
    dataUsers,
  };

  return (
    <Context.Provider value={value}>
      <div className={styles.container}>
        <div className={styles.header}><Header /></div>
          <Routes>
            <Route path="/" element={<Content/>} />
            <Route path="/admin" element={<Admin />} />
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
