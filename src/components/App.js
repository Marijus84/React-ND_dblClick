import React from 'react';
import Card from './Card';
import { connect } from 'react-redux';
import { setSelectedGenre} from '../actions';
import { getMovieList, getGenresList, getGenreMoviesList, addLogsList} from '../thunks';
import { getImageUrl } from '../../config';

class App extends React.Component {
  constructor(props) {
    super(props);

    props.onGetMovieList();
    props.onGetGenresList();
    props.onLogs("Aplikacija užkrauta");
  }

  render() {
    const { movieList, genresList, selectedGenre, onLogs, selectGenre, onGetGenreMoviesList, genreMoviesList } = this.props;
    const movies = selectedGenre ? genreMoviesList : movieList;

    return (
      <div>
        {genresList.map(({ id, name }) => (
          <button
            onClick={() => {
               selectGenre(id);
               onGetGenreMoviesList(id);
               onLogs("Pakeistas žanras į " + name);
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
            id={listItem.id}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movieList: state.movies.list,
  genresList: state.movies.genresList,
  selectedGenre: state.movies.selectedGenre,
  genreMoviesList: state.movies.genreMoviesList,
  logs:state.movies.logs
});

const mapDispatchToProps = (dispatch) => ({
  onGetMovieList: () => dispatch(getMovieList()),
  onGetGenresList: () => dispatch(getGenresList()),
  selectGenre: (id) => dispatch(setSelectedGenre(id)),
  onGetGenreMoviesList: (id) => dispatch(getGenreMoviesList(id)),
  onLogs: (data) => dispatch(addLogsList(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

