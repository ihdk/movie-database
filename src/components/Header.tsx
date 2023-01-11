import { useSelector } from 'react-redux'

import useTheme from '@mui/material/styles/useTheme';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import HomeIcon from '@mui/icons-material/Home';

import Logo from './Logo'
import type { RootStoreStateType } from '../store/store';
import type { MovieType } from '../assets/types';

/**
 * Renders main header
 */
const Header: React.FC<{ hideHome?: Boolean }> = ({ hideHome = false }) => {
  const theme = useTheme();
  const favouriteMovies = useSelector<RootStoreStateType, MovieType[]>((state) => state.local.favouriteMovies);
  
  return (
    <Container component="header" maxWidth={false} sx={{
      p: theme.spacing(3),
      mb: theme.spacing(5),
    }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{
        justifyContent: "space-between",
        [theme.breakpoints.down('sm')]: {
          alignItems: "center"
        }
      }}>
        <Logo />
        <Stack direction="row" spacing={1}>
          {favouriteMovies.length > 0 && <Button className="favourites-menu-button" href="/favourites" size="large" >My movies ({favouriteMovies.length})</Button>}
          {!hideHome && <Button className="home-menu-button" href="/" variant="outlined" size="large"><HomeIcon /></Button>}
        </Stack>
      </Stack>
    </Container>
  )
}

export default Header;