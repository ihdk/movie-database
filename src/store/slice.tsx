import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { processFetchedMovie } from '../assets/helpers';

import type { MovieType } from '../assets/types';

// Locally stored states
const localSlice = createSlice({
  name: 'local_app_states',
  initialState: {
    searchTerm: "",
    loadedMovies: [] as MovieType[],
    favouriteMovies: [] as MovieType[],
    loadedPage: 0,
    totalMovies: 0,
    scrollPosition: 0,
  },
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    updateLoadedMovies: (state, action: PayloadAction<{ data: any, reset: boolean }>) => {
      const newMovies: MovieType[] = action.payload.data.map((data: any) => {
        return processFetchedMovie(data);
      });
      state.loadedMovies = action.payload.reset ? newMovies : [...current(state.loadedMovies), ...newMovies];
    },
    resetLoadedMovies: (state) => {
      state.loadedMovies = [];
    },
    addFavouriteMovie: (state, action: PayloadAction<any>) => {
      const movie = action.payload;
      if (state.favouriteMovies.filter(item => item.id === movie.id).length === 0) state.favouriteMovies.push(movie);
    },
    removeFavouriteMovie: (state, action: PayloadAction<string>) => {
      state.favouriteMovies = state.favouriteMovies.filter((item) => {
        return item.id !== action.payload;
      })
    },
    updateLoadedPage: (state, action: PayloadAction<number>) => {
      state.loadedPage = action.payload;
    },
    setTotalMovies: (state, action: PayloadAction<string | number>) => {
      state.totalMovies = typeof action.payload === "string" ? parseInt(action.payload) : action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
  }
});

// App states
const appSlice = createSlice({
  name: 'app_states',
  initialState: {
    activeQuery: false,
  },
  reducers: {
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