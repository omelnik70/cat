import React from 'react';

import styles from './styles.module.scss';

function Navbar({ setActive }) {

  return (
    <div className={styles.container}>
        <ul className={styles.list}>
          <li onClick={()=> setActive({ category: true })}>Категории</li>
          <li onClick={()=> setActive({ articleTitle: true })}>Статьи - заголовки</li>
          <li onClick={()=> setActive({ articleDescription: true })}>Статьи - содержание</li>
        </ul>
    </div>
  );
};

export default Navbar;