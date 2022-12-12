import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Container from '@mui/material/Container';

import Header from '../Header';
import CoverImage from '../CoverImage';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

import { setScrollPosition } from '../../store/slice';
import type { RootStore } from '../../store/store';

/**
 * Renders homepage with movies search
 */
const MovieSearch: React.FC = () => {
  const dispatch = useDispatch();
  const bg = require('../../assets/images/bg.jpg');
  const scrollPosition = useSelector<RootStore, number>((state) => state.local.scrollPosition);

  useEffect(() => {
    const setPosition = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      dispatch(setScrollPosition(window.scrollY));
    }
    window.addEventListener('beforeunload', setPosition)
    if (scrollPosition) window.scroll(0, scrollPosition);
  }, []);

  return (
    <>
      <CoverImage imageUrl={bg} />
      <Header />
      <Container maxWidth="xl">
        <SearchBar />
        <SearchResults />
      </Container>
    </>
  )
}

export default MovieSearch;