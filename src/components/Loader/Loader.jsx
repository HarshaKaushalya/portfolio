import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loaderContent}>
        <div className={styles.logoLoader}>HK</div>
        <div className={styles.loaderText}>Initializing Systems...</div>
      </div>
    </div>
  );
};

export default React.memo(Loader);
