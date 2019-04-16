import React from 'react';
import Card from './Card';
import axios from 'axios';
import { endpoints, getImageUrl } from '../../config';

class App extends React.Component {
  state = {
    movieList: [],
    genreList: [],
    genreMovies: [],
    favorites: [],
    selectedGenre: null,
  };

  componentDidMount() {
    this.getMovies();
    this.getGenres();
  }

  getMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then(res => this.setMovieList(res.data.results))
      .catch(error => console.log(error));
  };

  getGenres = () => {
    axios
      .get(endpoints.genres())
      .then(res => this.setGenreList(res.data.genres))
      .catch(error => console.log(error));
  };

  getGenreMovies = id => {
    axios
      .get(endpoints.genreMovies(id))
      .then(res => this.setGenreMovies(res.data.results))
      .catch(error => console.log(error));
  };

  setMovieList = list => {
    this.setState({
      movieList: list,
    });
  };

  setGenreList = list => {
    this.setState({
      genreList: list,
    });
  };

  setGenreMovies = list => {
    this.setState({
      genreMovies: list,
    });
  };

  toggleFavorite = id => {
    const { favorites } = this.state;
    if (favorites.includes(id)) {
      this.setState({ favorites: favorites.filter(item => item !== id) });
    } else {
      this.setState({ favorites: [...favorites, id] });
    }
  };

  selectedGenre = id => this.setState({ selectedGenre: id });

  render() {
    const { movieList, genreList, genreMovies, selectedGenre, favorites } = this.state;
    const movies = selectedGenre ? genreMovies : movieList;

    console.log('movies', movies);

    return (
      <div>
        {genreList.map(({ id, name }) => (
          <button
            onClick={() => {
              this.selectedGenre(id);
              this.getGenreMovies(id);
            }}
            key={id}
          >
            {name}
          </button>
        ))}
        {movies.map(listItem => (
          <Card
            key={listItem.id}
            backgroundImage={getImageUrl(listItem.backdrop_path)}
            title={listItem.original_title}
            releaseDate={listItem.release_date}
            score={listItem.vote_average}
            votes={listItem.vote_count}
            description={listItem.overview}
            onFavoriteClick={this.toggleFavorite}
            id={listItem.id}
            isFavorite={favorites.includes(listItem.id)}
          />
        ))}
      </div>
    );
  }
}

export default App;
