import React from 'react';
import { useSelector } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';

import Logo from './Logo'
import type { RootStore } from '../store/store';
import type { MovieType } from '../assets/types';

/**
 * Renders main header
 */
const Header: React.FC = () => {
  const theme = useTheme();
  const favouriteMovies = useSelector<RootStore, MovieType[]>((state) => state.local.favouriteMovies);

  return (
    <Container maxWidth={false} sx={{
      p: theme.spacing(3),
      mb: theme.spacing(5),
    }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ justifyContent: "space-between" }}>
        <Logo />
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          {favouriteMovies.length > 0 && <Button href="/favourites"  size="large" >My movies ({favouriteMovies.length})</Button>}
          <Button href="/" variant="outlined" size="large"><HomeIcon/></Button>
        </Stack>
      </Stack>
    </Container>
  )
}

export default Header;