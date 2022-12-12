import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';
import Paper from '@mui/material/Paper';
import { InputAdornment } from '@mui/material';

import { updateLoadedPage, setSearchTerm, resetLoadedMovies, setTotalMovies, setActiveQuery } from '../../store/slice'
import type { RootStore } from '../../store/store';

/**
 * Renders search bar to find movies
 */
const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // local storaga data
  const searchTerm = useSelector<RootStore, string>((state) => state.local.searchTerm);


  /**
   * Cancel search
   */
  const resetSearch = () => {
    dispatch(setSearchTerm(""))
    dispatch(updateLoadedPage(0))
    dispatch(setTotalMovies(0))
    dispatch(resetLoadedMovies())
    dispatch(setActiveQuery(false))
  }

  /**
   * Process the search
   */
  const handleSearch = () => {
    if (searchInputRef.current !== null) {
      if (searchInputRef.current.value !== "") {
        // process new search, activate query and define first page of results
        dispatch(setSearchTerm(searchInputRef.current.value.trim()))
        dispatch(updateLoadedPage(1))
        dispatch(setActiveQuery(true))
      } else {
        // reset search if keyword is empty
        searchInputRef.current.focus();
        resetSearch();
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
        <Button variant="text" size="large" onClick={resetSearch}>Cancel</Button>
      </Stack>
    </Paper>
  );

}

export default SearchBar;