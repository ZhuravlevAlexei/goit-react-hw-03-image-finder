import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import css from './App.module.css';
import ImageGallery from './ImageGallery/ImageGallery';

class App extends Component {
  state = {
    searchText: '',
  };

  createSearchText = searchText => {
    this.setState({ searchText });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.createSearchText} />
        <ImageGallery searchText={this.state.searchText} />
      </div>
    );
  }
}

export default App;
