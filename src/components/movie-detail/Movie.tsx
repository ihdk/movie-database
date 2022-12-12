import React, { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';

import useTheme from '@mui/material/styles/useTheme';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

import Header from '../Header';
import CoverImage from '../CoverImage';
import FavouriteButton from '../FavouriteButton';
import { processFetchedMovie } from '../../assets/helpers';
import { useGetMovie } from '../../assets/apiFetcher';

import type { MovieType } from '../../assets/types';

/**
 * Renders dashboard page with all todos
 */
const Movie: React.FC = () => {
  const theme = useTheme();
  const match = useMatch('/movie/:id');
  const movieId = match !== null && match.params.id !== undefined ? match.params.id : "";
  const [movie, setMovie] = useState<MovieType | null>(null);

  const query = useGetMovie(movieId);

  useEffect(() => {
    if (query.isSuccess && query.data.Response === "True") {
      setMovie(processFetchedMovie(query.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data])

  return (
    <>
      <Header />
      {query.isLoading &&
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Container>
      }

      {(query.isError || (query.isSuccess && query.data.Response === "False")) &&
        <Container maxWidth="xl" sx={{ textAlign: "center" }}>
          <Typography>Movie not found.</Typography>
        </Container>
      }

      {(query.isSuccess && movie) &&
        <>
          {movie.image && <CoverImage imageUrl={movie.image} />}
          <Container maxWidth="xl" >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              {movie.image && <Box>
                <Card sx={{ borderRadius: 4, width: 300, m: theme.spacing(0, "auto") }}>
                  <CardMedia
                    component="img"
                    image={movie.image}
                    alt={movie.title}
                  />
                </Card>
              </Box>
              }
              <Box sx={{ width: "100%", pt: theme.spacing(1) }}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                  <Typography component="h1" variant="h4">{movie.title}</Typography>
                  <FavouriteButton movie={movie} />

                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: theme.spacing(1) }}>
                  <PeopleIcon fontSize="small" />
                  <Typography variant="body2">{movie.actors}</Typography>
                </Stack>
                <Stack
                  direction={{ xs: "row", sm: "row" }}
                  spacing={2}
                  divider={<Divider orientation="vertical" flexItem />}
                  sx={{
                    m: theme.spacing(2, 0),
                    p: theme.spacing(2, 0),
                    borderTop: 1,
                    borderBottom: 1,
                    borderWidth: 1,
                    borderColor: theme.palette.divider
                  }}
                >
                  {movie.genre &&
                    <Stack direction="row" spacing={1}>
                      {movie.genre.split(",").map((g: string) => {
                        return <Chip key={g.trim()} label={g.trim()} size="small" />
                      })}
                    </Stack>
                  }
                  {movie.language &&
                    <Chip label={movie.language} size="small" />
                  }
                  {movie.runtime &&
                    <>
                      <AccessTimeIcon />
                      <Typography >{movie.runtime}</Typography>
                    </>
                  }
                  {movie.year &&
                    <>
                      <CalendarMonthIcon />
                      <Typography >{movie.year}</Typography>
                    </>
                  }
                </Stack>

                {movie.plot &&
                  <Box sx={{ mb: theme.spacing(4) }}>
                    <Typography component="p" color="secondary">{movie.plot}</Typography>
                  </Box>
                }
                {(movie.writer || movie.director) &&
                  <Table sx={{ width: "auto", }}>
                    <TableBody>
                      {movie.writer && <TableRow>
                        <TableCell size="small">Writer: </TableCell>
                        <TableCell size="small">{movie.writer}</TableCell>
                      </TableRow>}
                      {movie.director && <TableRow>
                        <TableCell size="small">Director: </TableCell>
                        <TableCell size="small">{movie.director}</TableCell>
                      </TableRow>}
                    </TableBody>
                  </Table>
                }
              </Box>
            </Stack>
          </Container>
        </>
      }
    </>
  )
}

export default Movie;