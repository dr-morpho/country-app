import React from 'react';
import { CountryItemType } from '../../redux/slices/countrySlice';
import styles from './card.module.scss';
import { useNavigate } from 'react-router-dom';

const Card: React.FC<CountryItemType> = ({ capital, flags, name, population, region }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/country/${name.common}`)} className={styles.container}>
      <img className={styles.img} src={flags.svg} alt="Country" />
      <div className={styles.cardbody}>
        <h3>{name.common}</h3>
        <ul className={styles.list}>
          <li>
            <span>Region:</span> {region}
          </li>
          <li>
            <span>Capital:</span> {capital}
          </li>
          <li>
            <span>Population:</span> {population}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Card;
