import React from "react";

import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { Section } from "../features/components";
import { TmdbLogo } from "../features/icons";

/**
 * Renders site footer
 */
const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    <Section
      spacing="small"
      component="footer"
      borderTop={1}
      borderColor="primary.borders"
      sx={{ backgroundColor: theme.palette.background.default }}
    >
      <Typography variant="body1">
        Powered by &nbsp;
        <Link
          href="https://www.themoviedb.org/"
          target="_blank"
          underline="none"
          color="inherit"
        >
          <TmdbLogo width={150} />
        </Link>
      </Typography>
      <Typography variant="body2" color={theme.palette.text.secondary}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Typography>
    </Section>
  );
};

export default Footer;
