import { useEffect, useState, useRef } from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { imagesApi } from 'services/images';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

export const ImageGallery = ({ titleImg }) => {
  const [images, setImages] = useState([]);
  const [largeImg, setLargeImg] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const currentPage = useRef('');
  const perPage = 12;

  const handleLargeImg = event => {
    const img = event.currentTarget.id;
    setStatus('openModal');
    setLargeImg(img);
  };

  const handleToggle = () => {
    setStatus('succes');
  };

  const handleClickButton = () => {
    setPage(prev => prev + 1);
  };

  const fatchData = async (text, page = 1) => {
    setStatus('loading');
    try {
      const api = await imagesApi(text, perPage, page);
      setImages(prev => [...prev, ...api.hits]);
      setTotalHits(api.totalHits);
      setStatus('succes');
      if (api.totalHits === 0) {
        setImages([]);
        toast.error('Sorry...no images found', { theme: 'colored' });
      }
    } catch (error) {
      console.log(error);
      toast.error('Sorry...no images found', { theme: 'colored' });
    }
  };

  useEffect(() => {
    currentPage.current = titleImg;
    setPage(1);
    setImages([]);
    if (!currentPage.current) {
      return;
    }
    fatchData(currentPage.current, 1);
  }, [titleImg]);

  useEffect(() => {
    if (!currentPage.current || page === 1) {
      return;
    }
    fatchData(currentPage.current, page);
  }, [page]);

  return (
    <>
      <ul className={status === 'succes' ? css.gallery : css.gallery_none}>
        {images?.map(image => (
          <ImageGalleryItem
            key={image.id}
            imageURL={image.webformatURL}
            imageAlt={image.tags}
            largeURL={image.largeImageURL}
            onClick={handleLargeImg}
          />
        ))}
      </ul>

      {status === 'loading' && <Loader />}
      {totalHits / page > perPage && status === 'succes' && (
        <Button onClick={handleClickButton} />
      )}
      {status === 'openModal' && (
        <Modal onClose={handleToggle} largeURL={largeImg} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  titleImg: PropTypes.string.isRequired,
};
