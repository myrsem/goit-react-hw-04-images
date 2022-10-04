import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { AppContainer } from 'components/App.styled';
import fetchAPI from 'services/fetchAPI';

const INITIAL_QUERY = 'hdr';

const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(INITIAL_QUERY);
  const [currentPictures, setCurrentPictures] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const request = await fetchAPI(searchQuery, page);
      if (request.length === 0) {
        return setError(`No results were found for ${searchQuery}!`);
      }
     setImages(prevImages => [...prevImages, ...request]);
    } catch (error) {
      setError('Something went wrong. Try again.')
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeQuery = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
      setPage(1);
      setImages([]);
      setError(null);
    }
  };

  const onLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onImgClick = e => {
    setShowModal(!showModal);
    if (e !== undefined) {
      setCurrentPictures(e.target.dataset.img);
    }
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={onChangeQuery} />
      {error && <p style={{textAlign: 'center'}}>{error}</p>}
      <ImageGallery images={images} onImgClick={onImgClick} />
      {images.length >= 12 && (
        <Button
        onClick={onLoadMore}
          text={isLoading ? 'Loading...' : 'Load more'}
        />
      )}
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={currentPictures} alt="#" />
        </Modal>
      )}
      {isLoading && <Loader />}
    </AppContainer>
  );
};

export default App;
