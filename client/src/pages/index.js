import React from 'react';
import { useLocation } from 'react-router-dom';

import PrivacyPolicy from './PrivacyPolicy';
import About from './About';

import styles from './styles.module.scss';

function Pages({ name }) {
  const { pathname } = useLocation();
  const link = pathname.slice(4);
  const linkRu = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "ru");
  const linkUa = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "uk");
  const linkEn = Object.values(document.querySelectorAll('link')).find(i => i.hreflang === "en");
  linkRu.href = `ru/${link}`;
  linkUa.href = `ua/${link}`;
  linkEn.href = `en/${link}`;

  return (
    <div className={styles.container}>
      {link === 'about' && (<About name={name} />)}
      {link === 'privacy_policy' && (<PrivacyPolicy name={name} />)}
    </div>
  );
}

export default Pages;
