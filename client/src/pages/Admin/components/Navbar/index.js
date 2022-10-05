import React from 'react';

import styles from './styles.module.scss';

function Navbar({ setActive }) {

  return (
    <div className={styles.container}>
        <ul className={styles.list}>
          <li onClick={()=> setActive({ menu: true })}>Меню</li>
          <li onClick={()=> setActive({ textSite: true })}>Тексты на сайте</li>
          <li onClick={()=> setActive({ category: true })}>Категории</li>
          <li onClick={()=> setActive({ article: true })}>Статьи</li>
          {/* <ul className={styles.sublist}>
              <li onClick={()=> setActive({ add: true })}>Добавить</li>
              <li onClick={()=> setActive({ update: true })}>Редактировать</li>
          </ul> */}
        </ul>
    </div>
  );
};

export default Navbar;