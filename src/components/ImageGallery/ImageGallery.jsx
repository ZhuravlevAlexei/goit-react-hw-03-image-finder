import { Component } from 'react';
import { getPhotosByAxios } from 'services/library';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component {
  state = {
    STATUS: STATUS.IDLE,
    gallery: [],
    paginationPage: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const normSearchText = this.props.searchText.trim();
    if (prevProps.searchText !== normSearchText && normSearchText) {
      this.setState({ STATUS: STATUS.PENDING });
      console.log('start FETCH', normSearchText);
      getPhotosByAxios(normSearchText, this.state.paginationPage).then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        } else {
          this.setState(prev => ({
            STATUS: STATUS.RESOLVED,
            gallery: resp.data.hits,
            paginationPage: prev.paginationPage + 1,
          }));
        }
      });
      console.log(
        'Cur pag page: ',
        this.state.paginationPage,
        this.state.gallery
      );
    }
  }

  render() {
    let { gallery } = this.state;
    console.log('Gallery to render ', gallery);
    console.log('Start render  ', this.state.STATUS);
    if (this.state.STATUS !== STATUS.RESOLVED) {
      return;
    }

    return (
      <ul className={css.imageGallery}>
        {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              tags={tags}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
