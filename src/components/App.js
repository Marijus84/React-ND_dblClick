import React from 'react';
import Card from './Card';
import axios from 'axios';
import {endpoints, getImageUrl} from '../../config';

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            movieList: [],
            genreList: [],
            genreMovies: [],
            selectedGenre: null,
        };

        this.getMovies();
        this.getGenres();
        this.getGenreMovies();
    }


    getMovies = () => {
        axios
            .get(endpoints.mostPopularMovies())
            .then((res) => this.setMovieList(res.data.results))
            .catch((error) => console.log(error));
    };

    getGenres = () => {
        axios
            .get(endpoints.genres())
            .then((res) => this.setGenreList(res.data.genres))
            .catch((error) => console.log(error));
    };

    getGenreMovies = (id) => {
        axios
            .get(endpoints.genreMovies(id))
            .then((res) => this.setGenreMovies(res.data.results))
            .catch((error) => console.log(error));
    };

    setMovieList = (list) => {
        this.setState({
            movieList: list,
        });
    };

    setGenreList = (list) => {
        this.setState({
            genreList: list,
        });
    };

    setGenreMovies = (list) => {
        this.setState({
            genreMovies: list,
        });
    };

    selectedGenre = (id) => this.setState({selectedGenre: id});

    flag = (string) => this.setState({flag: string});

    render() {
        const {movieList, genreList, genreMovies, selectedGenre} = this.state;

        if (selectedGenre) {
            return (
                <div>
                    {genreList.map((genre) => (
                        <button onClick={() => {
                            this.selectedGenre(genre.id);
                            this.getGenreMovies(selectedGenre);
                            this.flag('genre');}
                        }>{genre.name}
                        </button>
                    ))}

                    {genreMovies.map((listItem) => (
                        <Card
                            backgroundImage={getImageUrl(listItem.backdrop_path)}
                            title={listItem.original_title}
                            releaseDate={listItem.release_date}
                            score={listItem.vote_average}
                            votes={listItem.vote_count}
                            description={listItem.overview}
                        />
                    ))}
                </div>
            )
        } else {
            return (
                <div>
                    {genreList.map((genre) => (
                        <button onClick={() => {
                            this.selectedGenre(genre.id);}
                        }>{genre.name}
                        </button>
                    ))}
                    {movieList.map((listItem) => (
                        <Card
                            backgroundImage={getImageUrl(listItem.backdrop_path)}
                            title={listItem.original_title}
                            releaseDate={listItem.release_date}
                            score={listItem.vote_average}
                            votes={listItem.vote_count}
                            description={listItem.overview}
                        />
                    ))}
                </div>)
        }
    }
}

export default App;
