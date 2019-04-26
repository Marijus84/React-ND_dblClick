export const setMovieList = (list) => ({
    type: 'SET_MOVIE_LIST',
    list,
});

export const setGenresList = (genresList) => ({
    type: 'SET_GENRES_LIST',
    genresList,
});

export const setSelectedGenre = (id) => ({
    type: 'SET_SELECTED_GENRE',
    id,
});

export const setGenreMoviesList = (genreMoviesList) => ({
    type: 'SET_GENRE_MOVIES_LIST',
    genreMoviesList,
});

export const setHearted = (id) => ({
    type: 'SET_HEARTED',
    id,
});

export const setLogsList = (log) => ({
    type: 'SET_LOGS',
    log,
});
