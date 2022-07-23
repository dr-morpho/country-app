import React from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import styles from './app.module.scss';
import wrapper from '.././styles/wrapper.module.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import NotFound from '../pages/NotFound';

const App: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <div className={styles.main}>
        <div className={wrapper.wrapper}>
          {pathname === '/' ? <Controls /> : null}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:name" element={<Detail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
