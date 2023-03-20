import React from "react";
import { useSelector } from "react-redux";

import Typography from "@mui/material/Typography";

import { MoviesList, Section, SectionTitle } from "../../features/components";
import { RootStoreStateType } from "../../app/store/store";
import { MovieDetails } from "../../app/types";
import { useDocumentTitle } from "../../app/helpers";

/**
 * Renders page with selected favourite movies
 */
const Favourites: React.FC = () => {
  useDocumentTitle("Favourite movies");

  return (
    <Section>
      <SectionTitle variant="h1">Favourite movies</SectionTitle>
      <FavouritesList />
    </Section>
  );
};

const FavouritesList: React.FC = () => {
  const favouriteMovies = useSelector<RootStoreStateType, MovieDetails[]>(
    (state) => state.local.favouriteMovies
  );
  return favouriteMovies.length > 0 ? (
    <MoviesList view="detail" movies={favouriteMovies} />
  ) : (
    <Typography>Your list is empty</Typography>
  );
};

export default Favourites;
