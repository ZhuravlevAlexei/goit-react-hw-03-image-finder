import { Component } from 'react';
import axios from 'axios';
import css from './ImageGallery.module.css';

// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

async function getPhotosByAxios(searchString, page = 1) {
  const URL_KEY = 'https://pixabay.com/api/';
  const myPIXABAY_KEY = '32936589-73134fb91afb2b55fe07bd374';
  const FILTER_PARAMETERS = `?key=${myPIXABAY_KEY}&q=${searchString}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  await axios
    .get(URL_KEY + FILTER_PARAMETERS)
    .then(response => {
      //   console.log(response);
      if (response.status !== 200) {
        throw new Error(response.statusText);
      } else {
        console.log(response.data.hits);
        return response.data.hits; //возврат данных для галлереи
      }
    })
    .catch(error => {
      console.error(error);
    })
    .finally(() => {
      //console.log('axios =>>> finally');
    });
}

// const ImageGallery = ({ searchText}) => {
class ImageGallery extends Component {
  state = {
    gallery: [],
    paginationPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('start DidUpDaTe');
    // console.dir(prevProps);
    // console.log(
    //   'было ' + prevProps.searchText,
    //   'стало ' + this.props.searchText
    // );
    let normSearchText = this.props.searchText.trim();
    if (prevProps.searchText !== normSearchText && normSearchText) {
      console.log('start FETCH', normSearchText);
      let galleryData = getPhotosByAxios(
        normSearchText,
        this.state.paginationPage
      );
      console.log('Cur pag page: ', this.state.paginationPage);
      this.setState(prev => ({
        gallery: galleryData,
        paginationPage: prev.paginationPage + 1,
      }));
    }
  }

  render() {
    return (
      <ul className={css.imageGallery}>{/* Набір <li> із зображеннями */}</ul>
    );
  }
}

export default ImageGallery;
