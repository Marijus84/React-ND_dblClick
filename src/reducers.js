import {combineReducers} from 'redux';

const initialState = {
    list: [],
    genresList: [],
    selectedGenre: null,
    genreMoviesList: [],
    heartedList: [],
    logs: []
};

const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MOVIE_LIST':
            return {
                ...state,
                list: action.list,
            };

        case 'SET_GENRES_LIST':
            return {
                ...state,
                genresList: action.genresList,
            };

        case 'SET_SELECTED_GENRE':
            return {
                ...state,
                selectedGenre: action.id,
            };

        case 'SET_GENRE_MOVIES_LIST':
            return {
                ...state,
                genreMoviesList: action.genreMoviesList,
            };

        case 'SET_LOGS':
            return {
                ...state,
                logs: [...state.logs, action.log]
            };

        case 'SET_HEARTED':
            if (state.heartedList) {
                if (state.heartedList.includes(action.id)) {
                    return {
                        ...state,
                        heartedList: state.heartedList.filter(item => item !== action.id)
                    }
                } else {
                    return {
                        ...state,
                        heartedList: [...state.heartedList, action.id]
                    }
                }
            }
            return state;

        default:
            return state;
    }
};

export default combineReducers({
    movies: moviesReducer,
});
