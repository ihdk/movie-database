import React, { lazy, Suspense, useCallback } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  Location,
  useMatches,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { persistor, store } from "./app/store/store";
import {
  ContentWrapper,
  FullscreenLoader,
  PageWrapper,
} from "./features/components";

import { useThemeType } from "./app/theme";
import Header from "./pages/Header";
import Footer from "./pages/Footer";

const Home = lazy(() => import("./pages/home"));
const Movie = lazy(() => import("./pages/movie-detail"));
const Actor = lazy(() => import("./pages/actor-detail"));
const Favourites = lazy(() => import("./pages/favourites"));
const NothingFound = lazy(() => import("./pages/nothing-found"));

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedScreen />
      </PersistGate>
    </Provider>
  );
};

const ThemedScreen: React.FC = () => {
  const themeType = useThemeType();
  return (
    <ThemeProvider theme={themeType}>
      <CssBaseline />
      <Suspense fallback={<FullscreenLoader />}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={2000} theme="colored" />
      </Suspense>
    </ThemeProvider>
  );
};

const RootRoute: React.FC = () => {
  let getKey = useCallback(
    (location: Location, matches: ReturnType<typeof useMatches>) => {
      const match = matches.find((m) => (m.handle as any)?.restorationKey);
      if ((match?.handle as any)?.restorationKey === "pathname") {
        return location.pathname;
      }
      return location.key;
    },
    []
  );

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
      <ScrollRestoration getKey={getKey} />
    </PageWrapper>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    loader: FullscreenLoader,
    children: [
      {
        index: true,
        element: <Home />,
        // use pathname key for scroll restoration to remember position even after later navigation to home from header home links
        handle: { restorationKey: "pathname" },
      },
      {
        path: "/favourites",
        element: <Favourites />,
      },
      {
        path: "movie/:id",
        element: <Movie />,
      },
      {
        path: "actor/:id",
        element: <Actor />,
      },
      {
        path: "*",
        element: <NothingFound />,
      },
    ],
  },
]);
export default App;
