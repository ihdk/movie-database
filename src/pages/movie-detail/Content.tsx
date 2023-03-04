import React, { useContext } from "react";
import dayjs from "dayjs";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { Section, SectionTitle, MovieScore } from "../../features/components";
import { MovieContext } from "../../features/context";
import ActorCard from "../../features/movie/ActorCard";
import MovieGenres from "../../features/movie/MovieGenres";
import FavouriteButton from "../../features/movie/FavouriteButton";
import Swiper from "../../features/Swiper";

/**
 * Renders movie content
 */
const Content: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  return (
    <>
      {movie.images.logos.length > 0 && (
        <Section spacing="large">
          <Logo />
        </Section>
      )}
      <Section color="text.movieContent">
        <Grid container spacing={5}>
          {movie.poster_path && (
            <Grid item md={4} sm={5} xs={12}>
              <Poster />
            </Grid>
          )}
          <Grid item md={8} sm={7} xs={12}>
            <Section spacing="none" component="div" disableGutters>
              <Title />
            </Section>

            <Section spacing="tiny" component="div" disableGutters>
              <DataLine />
            </Section>

            {movie.overview && (
              <Section spacing="tiny" component="div" disableGutters>
                <Typography variant="h3">Overview</Typography>
                <Typography sx={{ whiteSpace: "pre-line" }}>
                  {movie.overview}
                </Typography>
              </Section>
            )}

            {movie.vote_average > 0 && (
              <Section spacing="tiny" component="div" disableGutters>
                <MovieScore
                  value={movie.vote_average * 10}
                  votes={movie.vote_count}
                  isMovieContent
                />
              </Section>
            )}

            {movie.credits.crew.length > 0 && (
              <Section component="div" disableGutters>
                <Crew />
              </Section>
            )}
          </Grid>
        </Grid>
      </Section>

      <Actors />
    </>
  );
});

const Logo: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  return (
    <Box
      textAlign="center"
      sx={{ maxWidth: 500, m: (theme) => theme.spacing(0, "auto") }}
    >
      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/original${movie.images.logos[0].file_path}`}
        alt={`Logo ${movie.title}`}
        sx={{
          display: "inline-block",
          maxHeight: 500,
          maxWidth: "100%",
        }}
      />
    </Box>
  );
});

const Poster: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  return (
    <Box textAlign="center" width="100%">
      <Box
        component="img"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        boxShadow={5}
        sx={{ borderRadius: 1, maxWidth: "100%" }}
      />
    </Box>
  );
});

const Title: React.FC = React.memo(() => {
  const theme = useTheme();
  const movie = useContext(MovieContext);
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          mt: theme.spacing(6),
          mb: 0,
        }}
      >
        {movie.title}
      </Typography>

      {movie.tagline && (
        <Typography
          variant="subtitle2"
          component="h2"
          color={theme.palette.primary.fancy}
        >
          {movie.tagline}
        </Typography>
      )}
    </>
  );
});

const DataLine: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  return (
    <Stack spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <FavouriteButton size="medium" />

      {movie.genre_ids && (
        <MovieGenres genresIds={movie.genre_ids} isMovieContent />
      )}

      {movie.runtime && <Typography>{movie.runtime} min</Typography>}
      {movie.release_date && (
        <Typography>
          {dayjs(movie.release_date).format("DD. MMM YYYY")}
        </Typography>
      )}
    </Stack>
  );
});

const Crew: React.FC = React.memo(() => {
  const theme = useTheme();
  const movie = useContext(MovieContext);

  const positions: {
    [key: string]: string[];
  } = {};

  movie.credits.crew.forEach((person) => {
    if (positions[person.name] !== undefined) {
      positions[person.name].push(person.job);
    } else {
      positions[person.name] = [person.job];
    }
  });

  return (
    <Stack>
      {Object.keys(positions).map((name) => {
        return (
          <Box
            key={`${name}`}
            sx={{
              backgroundColor: theme.palette.background.light,
              p: theme.spacing(2),
              m: theme.spacing(0.5),
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle2" color="text.primary">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {positions[name].join(", ")}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
});

const Actors: React.FC = React.memo(() => {
  const movie = useContext(MovieContext);
  return movie.credits.cast.length > 0 ? (
    <Section fullwidth>
      <Container maxWidth="xl">
        <SectionTitle variant="h2">Actors</SectionTitle>
      </Container>
      <Swiper
        slides={movie.credits.cast.map((person) => (
          <ActorCard key={person.id} actor={person} />
        ))}
      />
    </Section>
  ) : null;
});

export default Content;
