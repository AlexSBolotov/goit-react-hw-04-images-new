import s from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import getImages from 'helpers/cardsAPI';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import { useState, useEffect } from 'react';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const openModal = largeImageURL => {
    setShowModal(true);
    setImageURL(largeImageURL);
  };
  const closeModal = () => {
    setShowModal(false);
    setImageURL('');
  };
  const setQuery = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };
  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (page !== 0) {
      setIsLoading(true);
      getImages(searchQuery, page)
        .then(response => {
          setImages(prev => [...prev, ...response.hits]);
        })
        .catch(error => setError(error))
        .finally(() => setIsLoading(false));

      // try {
      //   const response = getImages(searchQuery, page);
      //   console.log(response);
      //   setImages(prev => [...prev, ...response.hits]);
      // } catch (error) {
      //   setError(error);
      // } finally {
      //   setIsLoading(true);
      // }
    }
  }, [page, searchQuery]);

  return (
    <div className={s.app}>
      <Searchbar setNewQuery={setQuery} />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {images.length >= 12 &&
        (isLoading ? <Loader /> : <Button loadMore={loadMore} />)}

      {showModal && <Modal imageURL={imageURL} closeModal={closeModal} />}
    </div>
  );
}
