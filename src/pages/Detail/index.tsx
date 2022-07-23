import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import styles from './detail.module.scss';
import Info from '../../components/Info';

const Detail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => navigate('/')}>
        <IoArrowBack />
        Go back
      </button>
      <Info />
    </div>
  );
};

export default Detail;
