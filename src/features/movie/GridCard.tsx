import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import TheatersIcon from "@mui/icons-material/Theaters";
import Typography from "@mui/material/Typography";

import CardPopup from "./CardPopup";
import { MovieContext } from "../../app/context";
import { MovieDetails } from "../../app/types";

/**
 * Renders movie card in grid view
 */
const GridCard: React.FC<{ movie: MovieDetails }> = React.memo(({ movie }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [openedPopup, setOpenedPopup] = useState(false);

  let timer: ReturnType<typeof setTimeout>;
  const openPopup = () => {
    timer = setTimeout(() => {
      setOpenedPopup(true);
    }, 500);
  };
  const closePopup = () => {
    clearTimeout(timer);
    setOpenedPopup(false);
  };

  return (
    <MovieContext.Provider value={movie}>
      <Fade in={true}>
        <Box
          className="movie-item"
          onMouseEnter={openPopup}
          onMouseLeave={closePopup}
          ref={cardRef}
          sx={{ position: "relative", height: "100%" }}
        >
          <Link to={`/movie/${movie.id}`} aria-label="movie detail link">
            <Poster />
            <CardPopup opened={openedPopup} cardRef={cardRef} />
          </Link>
        </Box>
      </Fade>
    </MovieContext.Provider>
  );
});

const Poster: React.FC = React.memo(() => {
  const theme = useTheme();
  const movie = useContext(MovieContext);
  return (
    <Box position="relative">
      {movie.poster_path ? (
        <Box
          component="img"
          height={350}
          width="100%"
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          sx={{
            display: "block",
            objectFit: "cover",
            borderRadius: 1,
            [theme.breakpoints.down("md")]: {
              maxHeight: 350,
            },
            [theme.breakpoints.down("sm")]: {
              maxHeight: 330,
            },
          }}
        />
      ) : (
        <MissingImagePlaceholder />
      )}
    </Box>
  );
});

const MissingImagePlaceholder: React.FC = React.memo(() => {
  const theme = useTheme();
  const movie = useContext(MovieContext);
  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 350,
        background: theme.palette.background.defaultAlt,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 1,
        [theme.breakpoints.down("md")]: {
          minHeight: 350,
        },
        [theme.breakpoints.down("sm")]: {
          minHeight: 330,
        },
      }}
    >
      {movie && (
        <Typography
          align="center"
          color="text.primary"
          variant="h6"
          component="h3"
          sx={{ p: theme.spacing(2, 1), zIndex: 1 }}
        >
          {movie.title}
        </Typography>
      )}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TheatersIcon sx={{ opacity: 0.1, fontSize: "10rem" }} />
      </Box>
    </Box>
  );
});

export default GridCard;
