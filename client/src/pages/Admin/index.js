import React, { useState } from 'react';

import Navbar from './components/Navbar';
import MenuList from '../Admin/components/Menu/MenuList';
import TextSiteList from '../Admin/components/TextSite/TextSiteList';
import ArticleList from '../Admin/components/Article/ArticleList';
import CategoryList from '../Admin/components/Category/CategoryList';
import ContentList from './components/Article/components/Content/ContentList';
import Container from '../../components/Container';

import styles from './styles.module.scss';

function Admin() {
  const [active, setActive] = useState({
    menu: null,
    articleTitle: null,
    articleDescription: null,
    category: null,
    textSite: null,
  });

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Navbar setActive={setActive} />
      </div>
      <div className={styles.list}>
        <Container active={active.menu}>
          <MenuList setActive={setActive} />
        </Container>
        <Container active={active.textSite}>
          <TextSiteList setActive={setActive} />
        </Container>
        <Container active={active.category}>
          <CategoryList setActive={setActive} />
        </Container>
        <Container active={active.articleTitle}>
          <ArticleList setActive={setActive} />
        </Container>
        <Container active={active.articleDescription}>
          <ContentList setActive={setActive} />
        </Container>
      </div>
    </div>
  );
};

export default Admin;
