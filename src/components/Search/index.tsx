import React from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/slices/sortSlice';
import styles from './search.module.scss';
import debounce from 'lodash.debounce';

const Search: React.FC = () => {
  const [localSearch, setLocalSearch] = React.useState('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    const data = window.localStorage.getItem('SEARCH_VALUE');
    setLocalSearch(JSON.parse(data!));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem('SEARCH_VALUE', JSON.stringify(localSearch));
  }, [localSearch]);

  const debounceSearch = React.useCallback(
    debounce((text) => dispatch(setSearch(text)), 1000),
    [],
  );

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(event.target.value);
    debounceSearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      <IoSearch />
      <input
        className={styles.container__input}
        placeholder="Search country"
        type="search"
        onChange={changeSearch}
        value={localSearch}
      />
    </div>
  );
};

export default Search;
