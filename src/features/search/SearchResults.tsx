import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Stack from "@mui/material/Stack";

import { __pl } from "../../app/helpers";
import {
  useLazyGetMoviesQuery,
  useMovieQueryError,
} from "../../app/store/moviesApiSlice";
import { setSearchResultsView } from "../../app/store/localStorageSlice";
import { RootStoreStateType } from "../../app/store/store";
import { MovieDetails, SearchResultsView } from "../../app/types";
import { LoadMore, MoviesList, Section } from "../components";

/**
 * Renders search results with movies
 */
const SearchResults: React.FC = () => {
  const totalMovies = useSelector<RootStoreStateType, number>(
    (state) => state.local.totalMovies
  );
  const loadedPage = useSelector<RootStoreStateType, number>(
    (state) => state.local.loadedPage
  );
  const searchTerm = useSelector<RootStoreStateType, string>(
    (state) => state.local.searchTerm
  );
  const movies = useSelector<RootStoreStateType, MovieDetails[]>(
    (state) => state.local.movies
  );
  const view = useSelector<RootStoreStateType, SearchResultsView>(
    (state) => state.local.searchResultsView
  );

  const [triggerGetMovies, { isError, error, isFetching }] =
    useLazyGetMoviesQuery();
  useMovieQueryError(isError, error);

  const onLoadMore = useCallback(() => {
    triggerGetMovies({ searchTerm: searchTerm, page: loadedPage + 1 });
  }, [searchTerm, loadedPage, triggerGetMovies]);

  const nextLoad = useMemo(
    () =>
      totalMovies - movies.length >= 20 ? 20 : totalMovies - movies.length,
    [totalMovies, movies.length]
  );

  return movies.length > 0 ? (
    <Box className="search-results" sx={{ mt: (theme) => theme.spacing(4) }}>
      <Section component="div" className="search-results-header" disableGutters>
        <Section
          component="div"
          spacing="tiny"
          borderRadius={1}
          sx={{ background: (theme) => theme.palette.background.defaultAlt }}
        >
          <Stack
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <TitleTotal total={totalMovies} />
              <TitleShowing showing={movies.length} total={totalMovies} />
            </Box>
            <ViewToggle />
          </Stack>
        </Section>
      </Section>

      <MoviesList view={view} movies={movies} />

      <LoadMore
        nextLoad={nextLoad}
        onLoadMore={onLoadMore}
        loading={isFetching}
      />
    </Box>
  ) : null;
};

const TitleTotal: React.FC<{ total: number }> = React.memo(({ total }) => {
  const text = `Found ${total} ${__pl(["movie", "movies"], total)}`;
  return (
    <Typography variant="subtitle1" component="p">
      {text}
    </Typography>
  );
});

const TitleShowing: React.FC<{ showing: number; total: number }> = React.memo(
  ({ showing, total }) => {
    const text = `Showing ${showing} of ${total}`;
    return (
      <Typography variant="subtitle2" component="p">
        {text}
      </Typography>
    );
  }
);

const ViewToggle: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const view = useSelector<RootStoreStateType, SearchResultsView>(
    (state) => state.local.searchResultsView
  );

  const setView = (newView: SearchResultsView) => {
    dispatch(setSearchResultsView(newView));
  };

  return (
    <ToggleButtonGroup size="small" value={view}>
      <ToggleButton value="list" onClick={() => setView("list")}>
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton value="grid" onClick={() => setView("grid")}>
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
});

export default SearchResults;
