import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Typography from "@mui/material/Typography";

import { RootStoreStateType } from "./store/store";
import { MovieDetails } from "./types";
import { useLocation } from "react-router-dom";

/**
 * Simple plural text for internal use, ignore localization possibilities in this example
 *
 * @param text array of singular and plural form
 * @param count number of items
 * @returns string
 */
export const __pl: (text: string[], count: number) => string = (
  text,
  count
) => {
  return count === 1 ? text[0] : text[1];
};

/**
 * Displays notification message
 *
 * @param message notification message text
 * @param title notification title text
 */
export const notify = (message: string, title?: string) => {
  toast.error(
    <>
      {title && (
        <Typography variant="body1" fontWeight={600} display="block">
          {title}
        </Typography>
      )}
      <Typography variant="body2" display="block">
        {message}
      </Typography>
    </>
  );
};

/**
 * Check if movie is selected as favourite
 *
 * @param movieId movie ID
 * @returns boolean
 */
export const useIsFavouriteMovie = (movieId: number) => {
  const favouriteMovies = useSelector<RootStoreStateType, MovieDetails[]>(
    (state) => state.local.favouriteMovies
  );
  return favouriteMovies.filter((item) => item.id === movieId).length > 0;
};

/**
 * Handle document title through routes
 */
export const useDocumentTitle: (title?: string) => void = (title) => {
  const defaultTitle = useRef("Movie database");
  useEffect(() => {
    document.title = [title, defaultTitle.current].filter(Boolean).join(" | ");
  }, [title]);
};

/*
 * Handle display of default page background
 */
export const useDefaultBackground = () => {
  const location = useLocation();
  const rootpath = location.pathname.substring(1).split("/")[0];
  const excludeInPaths = ["movie"];
  return !excludeInPaths.includes(rootpath);
};
