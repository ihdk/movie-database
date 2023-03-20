import React from "react";
import { useParams } from "react-router-dom";

import Typography from "@mui/material/Typography";

import Content from "./Content";
import ActorMovies from "./ActorMovies";
import {
  useGetActorDetailsQuery,
  useMovieQueryError,
} from "../../app/store/moviesApiSlice";
import { Section, FullscreenLoader } from "../../features/components";
import { ActorContext } from "../../app/context";
import { useDocumentTitle } from "../../app/helpers";

/**
 * Renders page with actor details
 */
const Actor: React.FC = React.memo(() => {
  const { id } = useParams<{ id: string }>();
  const {
    data: actor,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetActorDetailsQuery(id);
  useMovieQueryError(isError, error);
  useDocumentTitle(actor ? actor.name : "");

  return (
    <>
      {isError && (
        <Section>
          <Typography>Actor loading failed.</Typography>
        </Section>
      )}
      {isFetching && <FullscreenLoader />}
      {isSuccess && actor && (
        <ActorContext.Provider value={actor}>
          <Content />
          <ActorMovies />
        </ActorContext.Provider>
      )}
    </>
  );
});

export default Actor;
