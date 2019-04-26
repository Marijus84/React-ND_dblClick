import axios from 'axios';
import { endpoints } from '../config';
import { setMovieList, setGenresList, setGenreMoviesList, setLogsList } from './actions';

export const getMovieList = () => (dispatch) => {
    axios
        .get(endpoints.mostPopularMovies())
        .then((res) => dispatch(setMovieList(res.data.results)))
        .catch((error) => console.log(error));
};

export const getGenresList = () => (dispatch) => {
    axios
        .get(endpoints.genres())
        .then(res => dispatch(setGenresList(res.data.genres)))
        .catch(error => console.log(error));
};

export const getGenreMoviesList = (id) => (dispatch) => {
        axios
            .get(endpoints.genreMovies(id))
            .then(res => dispatch(setGenreMoviesList(res.data.results)))
            .catch(error => console.log(error));
};

export const addLogsList = (data) => (dispatch) => {
    const dateTime = new Date().toLocaleString('lt-LT');
    const log = dateTime + ": " + data;
    dispatch(setLogsList(log));

};