import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";

import {
  useLazyGetMoviesQuery,
  useMovieQueryError,
} from "../../app/store/moviesApiSlice";
import { resetSearch } from "../../app/store/localStorageSlice";
import { FancyLoadingButton, Section } from "../components";
import { RootStoreStateType } from "../../app/store/store";
import { MovieDetails } from "../../app/types";

/**
 * Renders search bar
 */
const SearchBar: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const movies = useSelector<RootStoreStateType, MovieDetails[]>(
    (state) => state.local.movies
  );
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(
    useSelector<RootStoreStateType, string>((state) => state.local.searchTerm)
  );

  const [triggerGetMovies, { isError, error, isFetching }] =
    useLazyGetMoviesQuery();
  useMovieQueryError(isError, error);

  const handleSearch = () => {
    if (currentSearchTerm) {
      triggerGetMovies({ searchTerm: currentSearchTerm });
    }
  };

  const handleCancel = () => {
    setCurrentSearchTerm("");
    dispatch(resetSearch());
  };

  return (
    <Section
      component="div"
      spacing="large"
      className="search-bar"
      borderRadius={4}
      darkBg
    >
      <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
        <TextField
          size="medium"
          onChange={(e) => setCurrentSearchTerm(e.target.value)}
          value={currentSearchTerm}
          sx={{
            width: "100%",
            "& .MuiInputBase-root": {
              background: theme.palette.background.light,
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              "& fieldset": {
                borderColor: theme.palette.primary.borders,
                borderWidth: 1,
              },
            },
            "& .MuiOutlinedInput-root:hover": {
              "& fieldset": {
                borderColor: theme.palette.primary.borders,
                borderWidth: 1,
              },
            },
            "& fieldset": {
              borderColor: theme.palette.primary.borders,
            },
          }}
          inputProps={{ autoComplete: "off" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            ...((currentSearchTerm || movies.length > 0) && {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="cancel" onClick={handleCancel}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }),
          }}
          onKeyPress={(e) => (e.key === "Enter" ? handleSearch() : null)}
        />

        <FancyLoadingButton
          loading={isFetching}
          variant="contained"
          size="large"
          onClick={handleSearch}
          sx={{ whiteSpace: "nowrap" }}
        >
          Find movie
        </FancyLoadingButton>
      </Stack>
    </Section>
  );
});

export default SearchBar;
