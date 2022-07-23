import React from 'react';
import axios from 'axios';
import styles from './info.module.scss';
import { nanoid } from 'nanoid';
import { useNavigate, useParams } from 'react-router-dom';
import { filterByCode, searchByCountry } from '../../pages/config';

interface InfolInt {
  flags: { svg: string };
  name: { common: string; official: string };
  capital: string;
  population: number;
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: { name: string } };
  borders: string[];
}

const Info: React.FC = () => {
  const [details, setDetails] = React.useState<InfolInt>();
  const [countryBorder, setBorders] = React.useState<InfolInt[]>();
  const navigate = useNavigate();
  const { name } = useParams();

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const { data } = await axios.get(searchByCountry(name!));
        for (let i = 0; i < data.length; i++) {
          if (data[i].name.common === name) {
            setDetails(data[i]);
          }
        }
      } catch (error) {
        console.log('Not foud country..');
        navigate('/');
      }
    };
    fetchDetail();
    // eslint-disable-next-line
  }, [name]);

  React.useEffect(() => {
    const fetchBorders = async () => {
      try {
        const { data } = await axios.get(filterByCode(details?.borders!));
        setBorders(data);
      } catch (error) {
        console.log('Get call');
      }
    };
    fetchBorders();
  }, [details?.borders]);

  const isLoading = () => {
    if (details?.borders) {
      return countryBorder
        ? countryBorder?.map((elem) => (
            <button
              className={styles.borders}
              onClick={() => navigate(`/country/${elem.name.common}`)}
              key={nanoid()}>
              {elem.name.common}
            </button>
          ))
        : 'Loading...';
    } else return 'This country has no neighbors';
  };

  if (!details) {
    return <></>;
  } else
    return (
      <div className={styles.container}>
        <img className={styles.img} src={details.flags.svg} alt="Flag" />
        <div className={styles.details}>
          <h2>{details.name.common}</h2>
          <ul>
            <li>
              <b>Official name:</b>
              <span>{details.name.official},</span>
            </li>
            <li>
              <b>Capital:</b>
              <span>{details.capital},</span>
            </li>
            <li>
              <b>Population:</b>
              <span>{details.population},</span>
            </li>
            <li>
              <b>Region:</b>
              <span>{details.region},</span>
            </li>
            <li>
              <b>Sub Region:</b>
              <span>{details.subregion},</span>
            </li>
            <li>
              <b>languages:</b>
              {Object.values(details.languages)
                .toString()
                .split(',')
                .map((elem) => (
                  <span key={nanoid()}>{elem}, </span>
                ))}
            </li>
            <li>
              <>
                <b>Currencies:</b>
                {`${Object.values(details.currencies)[0].name},`}
              </>
            </li>
          </ul>
          <div className={styles.borderlist}>
            <b className={styles.bold}>Border country:</b>
            {isLoading()}
          </div>
        </div>
      </div>
    );
};

export default Info;
