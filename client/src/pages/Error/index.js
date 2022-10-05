import React from 'react';

import styles from './styles.module.scss';

function Error () {
  return (
    <div className={styles.title}>
        <p>
          Error 404. This page is not find.
        </p>
    </div>
  );
}

export default Error;
