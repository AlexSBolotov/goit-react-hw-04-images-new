import { useEffect } from 'react';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ closeModal, imageURL }) {
  const handleKeydown = e => {
    if (e.code === 'Escape') closeModal();
    console.log(e.code);
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  });

  return createPortal(
    <div onClick={handleBackdropClick} className={s.overlay}>
      <div className={s.modal}>
        <img src={imageURL} alt={imageURL} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  imageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func,
};
