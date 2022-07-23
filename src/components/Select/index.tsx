import React from 'react';
import styles from './select.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setSort, sortSelector } from '../../redux/slices/sortSlice';
import { nanoid } from 'nanoid';

const continents = ['All', 'Africa', 'Americas', 'Europe', 'Asia', 'Oceania'];

const Select: React.FC = () => {
  const [popup, setPopup] = React.useState(false);
  const sort = useSelector(sortSelector);
  const dispatch = useDispatch();
  const popupRef = React.useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    const outsideClick = (event: MouseEvent) => {
      const double = event as MouseEvent & {
        path: Node[];
      };
      if (!double.path.includes(popupRef.current)) {
        setPopup(false);
      }
    };
    document.body.addEventListener('click', outsideClick);
    return () => document.body.removeEventListener('click', outsideClick);
  }, []);

  const togglePopup = () => setPopup((state) => !state);
  const toggleSort = (elem: string) => {
    dispatch(setSort(elem));
    setPopup(false);
  };

  const arrCountry = continents.map((elem) => (
    <li key={nanoid()} onClick={() => toggleSort(elem)} className={styles.list}>
      {elem}
    </li>
  ));
  return (
    <div ref={popupRef} className={styles.container}>
      <div onClick={togglePopup} className={styles.sortby}>
        <p>Sort by: </p>
        <span>{sort}</span>
      </div>
      {popup && (
        <div className={styles.popup}>
          <ul>{arrCountry}</ul>
        </div>
      )}
    </div>
  );
};

export default Select;
