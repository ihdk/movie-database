import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

import { FancyButton, Section } from "../../features/components";
import { useDocumentTitle } from "../../app/helpers";

/**
 * Renders 404 page
 */
const NothingFound: React.FC = () => {
  useDocumentTitle("Page not found");

  return (
    <Section spacing="large">
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: (theme) => theme.spacing(4) }}
      >
        Oops! That page can’t be found.
      </Typography>
      <Link to="/">
        <FancyButton size="large">Go back to home</FancyButton>
      </Link>
    </Section>
  );
};

export default NothingFound;
