import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [titleImg, setTitleImg] = useState('');

  const handleTitleImgChange = event => {
    setTitleImg(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (titleImg.trim() === '') {
      toast.warn('Please enter a request', { theme: 'colored' });
      return;
    }
    onSubmit(titleImg);
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button type="submit" className={css.button}>
          <span className={css.button_label}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleTitleImgChange}
          value={titleImg}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
