import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { InputAdornment } from '@mui/material';

import { updateLoadedPage, setSearchTerm, updateLoadedMovies, resetLoadedMovies, setTotalMovies, setActiveQuery } from '../../store/slice'
import { useFindMoviesQuery } from '../../assets/apiFetcher';
import { notify } from '../../assets/helpers';
import type { RootStore } from '../../store/store';

/**
 * Renders search bar to find movies
 */
const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  /** Keep query in idle state while we don't need query to fetch data */
  const activeQuery = useSelector<RootStore, boolean>((state) => state.app.activeQuery);

  // local storaga data
  const searchTerm = useSelector<RootStore, string>((state) => state.local.searchTerm);
  const loadedPage = useSelector<RootStore, number>((state) => state.local.loadedPage);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const query = useFindMoviesQuery(searchTerm, loadedPage, activeQuery);

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data.Response === "True") {
        // success query, returned found movies
        dispatch(updateLoadedMovies({ data: query.data.Search, reset: loadedPage === 1 }))
        dispatch(setTotalMovies(query.data.totalResults))
      }

      if (query.data.Response === 'False') {
        // success query, but not found results in database
        notify(query.data.Error);
        dispatch(setActiveQuery(false))
        dispatch(updateLoadedPage(0))
        dispatch(setTotalMovies(0))
        dispatch(resetLoadedMovies())
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data])

  /**
   * Process the search
   */
  const handleSearch = () => {
    if (searchInputRef.current !== null) {
      dispatch(setSearchTerm(searchInputRef.current.value.trim()))
      if (searchInputRef.current.value !== "") {
        // process new search, activate query and define first page of results
        dispatch(setActiveQuery(true))
        dispatch(updateLoadedPage(1))
      } else {
        // reset search if keyword is empty
        searchInputRef.current.focus();
        dispatch(setActiveQuery(false))
        dispatch(updateLoadedPage(0))
        dispatch(setTotalMovies(0))
        dispatch(resetLoadedMovies())
      }
    }
  }

  const SearchInput = () => {
    const [term, setSearchTerm] = useState(searchTerm);
    return <TextField
      size="medium"
      onChange={(e) => setSearchTerm(e.target.value)}
      defaultValue={term}
      inputRef={searchInputRef}
      sx={{
        width: "100%",
        '.Mui-focused > .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1
        },
        '& .MuiInputBase-root': {
          background: theme.palette.background.inputs,

        },
      }}
      inputProps={{ autoComplete: "off", className: "search-input" }}
      InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }}
    />
  }

  return (
    <Paper elevation={0} sx={{ borderRadius: 4, p: theme.spacing(8, 4), mb: theme.spacing(6) }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={1} sx={{ pb: theme.spacing(2) }} >
        <SearchInput />
        <Button variant="contained" size="large" onClick={handleSearch} sx={{
          whiteSpace: "nowrap",
          background: theme.palette.background.fancy,
          color: theme.palette.primary.main
        }}>Find movie</Button>
      </Stack>
    </Paper>
  );

}

export default SearchBar;