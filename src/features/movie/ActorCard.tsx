import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import type { ActorDetails } from "../../app/types";

/**
 * Renders actor photo card
 */
const ActorCard: React.FC<{ actor: ActorDetails }> = ({ actor }) => {
  const theme = useTheme();

  return (
    <Fade in={true}>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 1,
        }}
      >
        <Link to={`/actor/${actor.id}`}>
          <Box
            component="img"
            height={350}
            width="100%"
            src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
            alt={actor.name}
            sx={{
              display: "block",
              objectFit: "cover",

              [theme.breakpoints.down("md")]: {
                maxHeight: 350,
              },
              [theme.breakpoints.down("sm")]: {
                maxHeight: 330,
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              textAlign: "center",
              p: theme.spacing(1, 0.5),
              backgroundColor: theme.palette.background.defaultTransparent,
              boxSizing: "border-box",
            }}
          >
            <Typography>{actor.name}</Typography>
            {actor.character && (
              <Typography variant="body2" color="primary.fancy">
                as&nbsp;
                <Typography variant="inherit" component="span" fontWeight={600}>
                  {actor.character}
                </Typography>
              </Typography>
            )}
          </Box>
        </Link>
      </Box>
    </Fade>
  );
};

export default ActorCard;
