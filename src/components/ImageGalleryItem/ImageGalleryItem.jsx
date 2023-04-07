import React from 'react';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  return (
    <li classNane={css.imageGalleryItem}>
      <img
        className={css.imageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        //onClick={ }
      />
    </li>
  );
};

export default ImageGalleryItem;
