import React, { lazy, useCallback } from "react";
import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  ContentWrapper,
  FullscreenLoader,
  PageWrapper,
} from "../features/components";
import { getRestorationKey } from "./helpers";
import Header from "../pages/Header";
import Footer from "../pages/Footer";

/* Code splitting not used now due to single page routing */
const Home = lazy(() => import("../pages/home"));
const Movie = lazy(() => import("../pages/movie-detail"));
const Actor = lazy(() => import("../pages/actor-detail"));
const Favourites = lazy(() => import("../pages/favourites"));
const NothingFound = lazy(() => import("../pages/nothing-found"));

const RootRoute: React.FC = () => {
  const getKey = useCallback(getRestorationKey, []);
  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
      <Footer />
      <ScrollRestoration getKey={getKey} />
      <ToastContainer autoClose={2000} theme="colored" />
    </PageWrapper>
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
