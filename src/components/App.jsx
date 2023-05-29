import { useState } from 'react';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export const App = () => {
  const [titleImg, setTitleImg] = useState('');

  const handleSearchSubmit = titleImg => {
    setTitleImg(titleImg);
  };

  return (
    <div className={css.app}>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery titleImg={titleImg} />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
