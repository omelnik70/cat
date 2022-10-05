import React from 'react';
import { useSelector } from 'react-redux/es/exports';

import styles from './styles.module.scss';

function Articles() {

  const articles = useSelector(state => state.articles.data);
  console.log(articles);

  return (
    <div className={styles.title}>
        <p>Articles</p>
    </div>
  );
}

export default Articles;
