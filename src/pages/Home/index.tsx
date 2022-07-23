import React from 'react';
import Card from '../../components/Card';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../redux/store';
import { countrySelect, fetchCountry } from '../../redux/slices/countrySlice';
import { nanoid } from 'nanoid';
import styles from './home.module.scss';
import { searchSelector, sortSelector } from '../../redux/slices/sortSlice';

const Home: React.FC = () => {
  const country = useSelector(countrySelect);
  const sort = useSelector(sortSelector);
  const search = useSelector(searchSelector);

  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(fetchCountry());
    // eslint-disable-next-line
  }, []);

  // const searchReg = new RegExp(`${search}`, 'gi');

  const countryCard = country
    .map((elem) => <Card key={nanoid()} {...elem} />)
    .filter((elem) => (elem.props.region === sort ? elem : sort === 'All' ? elem : null))
    .filter((elem) => elem.props.name.common.toLowerCase().includes(search.toLowerCase()));

  return <div className={styles.container}>{countryCard}</div>;
};

export default Home;
