import React, { useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Context from '../../Context';

import { 
  TEXTSITES_QUERY, 
  LANGS_QUERY, 
  CATEGORIES_QUERY, 
  MENUS_QUERY,
  ARTICLES_QUERY
} from '../../apollo/queries';
import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';
import Category from '../Content/Category';
import Post from '../Content/Category/Post';
import Admin from '../../pages/Admin';
import Error from '../../pages/Error';
import DATA from '../../data';
import Loading from '../Loading';
import reducer from '../../data/reducer';

import styles from './styles.module.scss';

function App() {
  const [state, dispatch] = useReducer(reducer, DATA);
  const { loading ,error, data: dataSite } = useQuery(TEXTSITES_QUERY);
  const { loading: loadMenu, error: errorMenu, data: dataMenu } = useQuery(MENUS_QUERY);
  const { loading: loadCat, error: errorCat, data: dataCat } = useQuery(CATEGORIES_QUERY);
  const { loading: loadLang, error: errorLang, data: dataLangs } = useQuery(LANGS_QUERY);
  const { loading: loadArt, error: errorArt, data: dataArt } = useQuery(ARTICLES_QUERY);
  const { lang } = state;

  if (loading || loadLang || loadCat || loadMenu || loadArt) return <Loading />;
  if (error || errorLang || errorCat || errorMenu || errorArt) return `Error! ${error.message}`;

  const head = document.querySelector('title');
  const metaDiscription = document.getElementsByName("description")[0];
  const textsSite = dataSite.textsites.filter(lan => lan.lang.id === lang);
  const metaContent = dataCat.categories.filter(lan => lan.lang.id === lang).map(meta => `${meta.name} AliExpress`).join(', ');
  head.textContent = `${textsSite[0].titleSite} | ${textsSite[0].descriptionSite}`;
  metaDiscription.content = `${metaContent}`;

  const value = {
    state, 
    dispatch,
    dataSite,
    dataLangs,
    dataCat,
    dataMenu,
    dataArt,
  };

  return (
    <Context.Provider value={value}>
      <div className={styles.container}>
        <div className={styles.header}><Header /></div>
          <Routes>
            <Route exact path="/" element={<Content/>} />
            <Route path="/admin" element={<Admin />} />
              <Route path="/:category" element={<Category />} />
                <Route path="/:category/:post" element={<Post />} />
            <Route path="*" element={<Error />} />
          </Routes>
        <div className={styles.footer}><Footer /></div>
      </div>
    </Context.Provider>
  );
};

export default App;
