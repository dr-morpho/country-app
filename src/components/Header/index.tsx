import React from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';
import wrapper from '../../styles/wrapper.module.scss';

const Header: React.FC = () => {
  const [mood, setMood] = React.useState('light');

  const changeMood = () => {
    setMood(mood === 'light' ? 'dark' : 'light');
  };

  React.useEffect(() => {
    document.body.setAttribute('theme', mood);
  }, [mood]);

  React.useEffect(() => {
    const data = window.localStorage.getItem('MOOD_VALUE');
    setMood(JSON.parse(data!));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('MOOD_VALUE', JSON.stringify(mood));
  }, [mood]);

  const whatMood = () => {
    if (mood === 'light') {
      return (
        <>
          <IoSunnyOutline size="16px" />
          <span>Light theme</span>
        </>
      );
    } else if (mood === 'dark') {
      return (
        <>
          <IoMoonOutline size="16px" />
          <span>Dark theme</span>
        </>
      );
    }
  };
  return (
    <header className={styles.header}>
      <div className={wrapper.wrapper}>
        <div className={styles.header__container}>
          <Link className={styles.link} to="/">
            Where is the world?
          </Link>
          <div onClick={changeMood} className={styles.theme}>
            {whatMood()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
