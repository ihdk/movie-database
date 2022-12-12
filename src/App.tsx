import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material/';

import { persistor, store } from './store/store';
import FullscreenLoader from './components/FullscreenLoader';

const MovieSearch = lazy(() => import('./components/movie-search/MovieSearch'));
const Movie = lazy(() => import('./components/movie-detail/Movie'));
const Favourites = lazy(() => import('./components/favourites/Favourites'));
const NothingFound = lazy(() => import('./components/404/NothingFound'));


// allow custom colors in MUI palette
declare module '@mui/material/styles' {
  interface TypeBackground {
    fancy: string;
    inputs: string;
  }
  interface Palette {
    gold: string;
  }
  interface PaletteOptions {
    gold: string;
  }
}


/** MUI theme */
let theme = createTheme({
  typography: {
    "fontFamily": "'Varela Round', sans-serif",
  },
  palette: {
    mode: 'dark',
    gold: "#ffbf00",
    background: {
      default: "#0a0a0a",
      paper: alpha("#0a0a0a", 0.75),
      fancy: "linear-gradient(45deg, #e54b6c 30%, #f87d3c 90%)",
      inputs: alpha("#ffffff", 0.05),
    },
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#d2d2d2",
    },
  },
  shape: {
    borderRadius: 10,
  }
});

theme = responsiveFontSizes(theme);

/** Create and customize query client, do not refetch data on window focus */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});


/**
  * Main app component
  */
const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MovieSearch />
    },
    {
      path: "/favourites",
      element: <Favourites />
    },
    {
      path: "movie/:id",
      element: <Movie />
    },
    {
      path: "*",
      element: <NothingFound />
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Box component="main">
              <Suspense fallback={<FullscreenLoader />}>
                <RouterProvider router={router} />
              </Suspense>
            </Box>
            <ToastContainer autoClose={2000} theme="colored" />
          </QueryClientProvider>
        </PersistGate>
      </Provider >
    </ThemeProvider >
  );
}

export default App;