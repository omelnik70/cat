import React from 'react';
import { useLocation } from 'react-router-dom';

import PrivacyPolicy from './PrivacyPolicy';
import About from './About';

import styles from './styles.module.scss';

function Pages() {
  const { pathname } = useLocation();
  const link = pathname.slice(1);

  return (
    <div className={styles.container}>
      {link === 'about' && (<About />)}
      {link === 'privacy_policy' && (<PrivacyPolicy />)}
    </div>
  );
}

export default Pages;
