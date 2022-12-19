import React from 'react';
import { useLocation } from 'react-router-dom';

import PrivacyPolicy from './PrivacyPolicy';
import About from './About';

import styles from './styles.module.scss';

function Pages({ name }) {
  const { pathname } = useLocation();
  const link = pathname.slice(1);

  return (
    <div className={styles.container}>
      {link === 'about' && (<About name={name} />)}
      {link === 'privacy_policy' && (<PrivacyPolicy name={name} />)}
    </div>
  );
}

export default Pages;
