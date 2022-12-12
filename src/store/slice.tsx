import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { processFetchedMovie } from '../assets/helpers';

import type { MovieType } from '../assets/types';

/** Initial global states and defined reducers */
const localSlice = createSlice({
  name: 'local_app_states',
  initialState: {
    searchTerm: "",
    loadedMovies: [] as MovieType[],
    favouriteMovies: [] as MovieType[],
    loadedPage: 0,
    willPaginate: false,
    totalMovies: 0,
    scrollPosition: 0,
  },
  reducers: {
    /** Store search keyword typed by user */
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateLoadedMovies: (state, action: PayloadAction<{ data: any, reset: boolean }>) => {
      const newMovies: MovieType[] = action.payload.data.map((data: any) => {
        return processFetchedMovie(data);
      });
      state.loadedMovies = action.payload.reset ? newMovies : [...current(state.loadedMovies), ...newMovies];
    },
    addFavouriteMovie: (state, action: PayloadAction<any>) => {
      const movie = action.payload;
      let isFavourite = false;
      state.favouriteMovies.forEach(item => {
        if (item.id === movie.id) isFavourite = true
      })
      if (!isFavourite) state.favouriteMovies.push(movie);
    },
    removeFavouriteMovie: (state, action: PayloadAction<string>) => {
      state.favouriteMovies = state.favouriteMovies.filter((item) => {
        return item.id !== action.payload;
      })
    },
    resetLoadedMovies: (state) => {
      state.loadedMovies = [];
    },
    updateLoadedPage: (state, action: PayloadAction<number>) => {
      state.loadedPage = action.payload;
    },
    setWillPaginateReducer: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setTotalMovies: (state, action: PayloadAction<string | number>) => {
      state.totalMovies = typeof action.payload === "string" ? parseInt(action.payload) : action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
  }
})

const appSlice = createSlice({
  name: 'app_states',
  initialState: {
    activeQuery: false,
  },
  reducers: {
    /** Store search keyword typed by user */
    setActiveQuery: (state, action: PayloadAction<boolean>) => {
      state.activeQuery = action.payload;
    },
  }
})

export const {
  setSearchTerm,
  updateLoadedMovies,
  resetLoadedMovies,
  setTotalMovies,
  updateLoadedPage,
  setScrollPosition,
  addFavouriteMovie,
  removeFavouriteMovie
} = localSlice.actions

export const {
  setActiveQuery,
} = appSlice.actions

export const localSliceReducer = localSlice.reducer;
export const appSliceReducer = appSlice.reducer;