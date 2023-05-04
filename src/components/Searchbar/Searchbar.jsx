import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Searchbar({ setNewQuery }) {
  const [query, setQuery] = useState('');
  const onInputChange = e => {
    setQuery(e.target.value);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    setNewQuery(query.trim().toLowerCase());
    setQuery('');
  };
  return (
    <header className={s.searchbar}>
      <form onSubmit={onFormSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchFormButton}>
          <span className={s.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.searchFormInput}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onInputChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  setQuery: PropTypes.func,
};
