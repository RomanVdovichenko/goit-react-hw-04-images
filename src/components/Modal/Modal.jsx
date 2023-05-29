import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({ onClose, largeURL }) => {
  useEffect(() => {
    const handleKeyClose = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyClose);

    return () => {
      // console.log(2);
      window.removeEventListener('keydown', handleKeyClose);
    };
  }, [onClose]);

  const handleClose = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleClose}>
      <div className={css.modal}>
        <img src={largeURL} alt="hello" width="600" height="600" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeURL: PropTypes.string.isRequired,
};
