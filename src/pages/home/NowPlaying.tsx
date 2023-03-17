import React from "react";

import Container from "@mui/material/Container";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { useNowPlayingQuery } from "../../app/store/moviesApiSlice";
import { SectionTitle } from "../../features/components";
import GridCard from "../../features/movie/GridCard";
import Swiper from "../../features/Swiper";

/**
 * Renders search results with movies
 */
const NowPlaying: React.FC = React.memo(() => {
  const { data: movies, isSuccess, isLoading, isError } = useNowPlayingQuery();
  return (
    <>
      <Container maxWidth="xl">
        <SectionTitle variant="h2">Now in cinemas</SectionTitle>
        {isError && <Typography>Failed to load</Typography>}
      </Container>

      {isLoading && <LoadingPlaceholder />}

      {isSuccess &&
        (movies.length > 0 ? (
          <Swiper
            slides={movies.map((movie, index) => (
              <GridCard key={`${index}-${movie.id}`} movie={movie} />
            ))}
          />
        ) : (
          <Typography>Not found movies</Typography>
        ))}
    </>
  );
});

const LoadingPlaceholder: React.FC = React.memo(() => (
  <Skeleton
    variant="rounded"
    height={350}
    width="100%"
    animation="pulse"
  ></Skeleton>
));

export default NowPlaying;
