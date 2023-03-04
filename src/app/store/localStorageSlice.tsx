import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import { moviesApiSlice } from "./moviesApiSlice";
import { MovieDetails, ThemeType, SearchResultsView } from "../types";

export const initialState = {
  searchTerm: "",
  movies: [] as MovieDetails[],
  favouriteMovies: [] as MovieDetails[],
  loadedPage: 0,
  totalMovies: 0,
  searchResultsView: "grid" as SearchResultsView,
  themeType: "dark" as ThemeType,
};

const localSlice = createSlice({
  name: "local_app_states",
  initialState: initialState,
  reducers: {
    resetSearch: (state) => {
      return {
        ...state,
        searchTerm: "",
        totalMovies: 0,
        movies: [],
        loadedPage: 0,
      };
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },

    toggleFavouriteMovie: (
      state,
      action: PayloadAction<{ movie: MovieDetails; add: boolean }>
    ) => {
      state.favouriteMovies = action.payload.add
        ? [action.payload.movie, ...state.favouriteMovies]
        : state.favouriteMovies.filter(
            (item) => item.id !== action.payload.movie.id
          );
    },

    setSearchResultsView: (state, action: PayloadAction<SearchResultsView>) => {
      state.searchResultsView = action.payload;
    },

    switchTheme: (state, action: PayloadAction<ThemeType>) => {
      state.themeType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      moviesApiSlice.endpoints.getMovies.matchFulfilled,
      (state, { payload }) => {
        state.movies =
          payload.page > 1
            ? [...current(state.movies), ...payload.results]
            : payload.results;
        state.totalMovies = payload.total_results;
        state.loadedPage = payload.page;
      }
    );
  },
});

export const {
  toggleFavouriteMovie,
  setSearchTerm,
  resetSearch,
  setSearchResultsView,
  switchTheme,
} = localSlice.actions;

export const localSliceReducer = localSlice.reducer;
