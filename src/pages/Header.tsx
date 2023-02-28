import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Stack from '@mui/material/Stack';
import Box, { BoxProps } from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Zoom from '@mui/material/Zoom';
import Divider from '@mui/material/Divider';

import type { RootStoreStateType } from '../app/store/store';
import type { MovieDetails, ThemeType } from '../app/types';
import { SiteLogo } from '../features/icons';
import { switchTheme } from '../app/store/localStorageSlice';
import { Section, StyledSwitcher } from '../features/components';

/**
 * Renders site header
 */
const Header: React.FC<{ hideHome?: boolean }> = React.memo(({ hideHome = false }) => {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return (
    <Box component="header" sx={{
      transition: "background 0.3s",
      ...(trigger && {
        position: "sticky",
        top: 0,
        background: theme.palette.background.default,
        zIndex: 999,
      })
    }}>
      <Section spacing="tiny" component="div" fullwidth>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{
          width: "100%",
          justifyContent: "space-between"
        }}>
          <Logo className="logo-part" />
          <Stack className="menu-buttons-part" spacing={1}>
            <FavouritesMenuButton />
            {!hideHome && <IconButton className="home-button" href="/" size="large"><HomeIcon /></IconButton>}
            <ThemeSwitcher />
          </Stack>
        </Stack>
      </Section>
    </Box >
  )
})

const Logo: React.FC<BoxProps> = React.memo((props) => {
  const theme = useTheme();
  return (
    <Box {...props}>
      <Link href="/" underline="none">
        <Stack spacing={1} direction="row" sx={{
          fontSize: theme.typography.h1.fontSize,
          alignItems: "center",
          m: theme.spacing(1),
        }}>
          <SiteLogo />
          <Typography sx={{
            fontSize: "inherit",
            fontWeight: 600,
            whiteSpace: 'nowrap',
            background: theme.palette.background.fancy,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Movie Database
          </Typography>
        </Stack>
      </Link>
    </Box>
  )
})

export const FavouritesMenuButton: React.FC = React.memo(() => {
  const favouriteMovies = useSelector<RootStoreStateType, MovieDetails[]>((state) => state.local.favouriteMovies);
  return (
    <IconButton className="favourites-button" href="/favourites" size="large" >
      <FavoriteIcon />
      {favouriteMovies.length > 0 &&
        <Zoom in={true}>
          <Typography className="count" color="primary.main" component="span" sx={{
            position: "absolute",
            top: 0,
            right: 0,
            textAlign: "center",
            fontSize: "0.6rem",
            lineHeight: "1.2rem",
            width: "1.2rem",
            borderRadius: "100%",
            background: (theme) => theme.palette.background.fancy
          }}>
            {favouriteMovies.length}
          </Typography>
        </Zoom>
      }
    </IconButton>
  )
})

export const ThemeSwitcher: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const themeType = useSelector<RootStoreStateType, ThemeType>((state) => state.local.themeType);
  const handleSwitcher = () => {
    dispatch(switchTheme(themeType === "dark" ? "light" : "dark"))
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ m: (theme) => theme.spacing(0, 2, 0, 1) }} />
      <StyledSwitcher checked={themeType === "dark"} onClick={handleSwitcher} />
    </Box>
  )
})

export default Header;