import React from 'react';
import Search from '../Search';
import Select from '../Select';
import styles from './controls.module.scss';

const Controls: React.FC = () => {
  return (
    <div className={styles.container}>
      <Search />
      <Select />
    </div>
  );
};

export default Controls;
