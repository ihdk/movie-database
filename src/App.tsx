import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { persistor, store } from './app/store/store';
import { FullscreenLoader } from './features/components';

import { useThemeType } from './app/theme';

const Home = lazy(() => import('./pages/home'));
const Movie = lazy(() => import('./pages/movie-detail'));
const Actor = lazy(() => import('./pages/actor-detail'));
const Favourites = lazy(() => import('./pages/favourites'));
const NothingFound = lazy(() => import('./pages/nothing-found'));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Screen />
      </PersistGate>
    </Provider >
  );
}

const Screen: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "actor/:id",
      element: <Actor />
    },
    {
      path: "*",
      element: <NothingFound />
    },
  ]);

  const themeType = useThemeType()

  return (
      <ThemeProvider theme={themeType}>
        <CssBaseline />
        <Suspense fallback={<FullscreenLoader />}>
          <RouterProvider router={router} />
        </Suspense>
        <ToastContainer autoClose={2000} theme="colored" />
      </ThemeProvider >
  )
}
export default App;