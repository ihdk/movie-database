import React, { lazy, Suspense, useCallback } from "react";
import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import {
  ContentWrapper,
  ErrorNotification,
  FullscreenLoader,
  PageWrapper,
} from "../features/components";
import { getRestorationKey } from "./helpers";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

const Home = lazy(() => import("../pages/home"));
const Movie = lazy(() => import("../pages/movie-detail"));
const Actor = lazy(() => import("../pages/actor-detail"));
const Favourites = lazy(() => import("../pages/favourites"));
const NothingFound = lazy(() => import("../pages/nothing-found"));

const RootRoute: React.FC = () => {
  const getKey = useCallback(getRestorationKey, []);
  const theme = useTheme();
  return (
    <Suspense fallback={<FullscreenLoader />}>
      <PageWrapper>
        <Header />
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        <Footer />
        <ScrollRestoration getKey={getKey} />
        <ErrorNotification autoClose={2000} muiTheme={theme} />
      </PageWrapper>
    </Suspense>
  );
};

export const router = createBrowserRouter([
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
