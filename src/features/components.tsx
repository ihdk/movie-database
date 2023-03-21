import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import styled from "styled-components";

import { styled as muiStyled, Switch, useTheme, Theme } from "@mui/material";
import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import Box, { BoxProps } from "@mui/material/Box";
import Button, { ButtonProps } from "@mui/material/Button";
import Typography, { TypographyProps } from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import {
  Breakpoint,
  Container,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";

import { useDefaultBackground, __pl } from "../app/helpers";
import { MovieDetails } from "../app/types";
import GridCard from "./movie/GridCard";
import ListCard from "./movie/ListCard";
import DetailCard from "./movie/DetailCard";

interface SectionProps extends BoxProps {
  spacing?: "none" | "tiny" | "small" | "medium" | "large";
  maxWidth?: Breakpoint;
  disableGutters?: boolean;
  fullwidth?: boolean;
  darkBg?: boolean;
}

export const Section: React.FC<SectionProps> = React.memo(
  ({
    spacing = "medium",
    maxWidth = "xl",
    disableGutters = false,
    fullwidth,
    darkBg,
    children,
    sx,
    ...props
  }) => {
    const theme = useTheme();
    const spacings = {
      none: 0,
      tiny: 2,
      small: 4,
      medium: 6,
      large: 8,
    };
    return (
      <Box
        component="section"
        overflow="hidden"
        position="relative"
        sx={{
          ...sx,
          ...(darkBg && {
            background: theme.palette.background.defaultTransparent,
          }),
          ...(spacing && {
            pt: theme.spacing(spacings[spacing]),
            pb: theme.spacing(spacings[spacing]),
          }),
        }}
        {...props}
      >
        <Container
          maxWidth={fullwidth ? false : maxWidth}
          disableGutters={disableGutters}
        >
          {children}
        </Container>
      </Box>
    );
  }
);

export const PageWrapper: React.FC<BoxProps> = ({ sx, children, ...props }) => {
  const hasDefaultBackground = useDefaultBackground();

  return (
    <Box
      sx={{
        position: "relative",
        ...(hasDefaultBackground && {
          background: `url('${require("../assets/images/page_bg.jpg")}')`,
          backgroundAttachment: "fixed",
          ":before": {
            content: '""',
            background: (theme) => theme.palette.background.pageWrapper,
            position: "fixed",
            width: "100%",
            height: "100%",
          },
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const ContentWrapper: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "70vh",
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export const FancyLoadingButton = React.memo(
  muiStyled(LoadingButton)<LoadingButtonProps>(({ theme }) => ({
    whiteSpace: "nowrap",
    color: "#ffffff",
    backgroundImage: theme.palette.background.fancyButton,
    backgroundSize: "200% auto",
    transition: "background 0.3s",
    ":hover": {
      backgroundPosition: "100%",
    },
  }))
);

export const FancyButton = React.memo(
  muiStyled(Button)<ButtonProps>(({ theme }) => ({
    whiteSpace: "nowrap",
    color: "#ffffff",
    backgroundImage: theme.palette.background.fancyButton,
    backgroundSize: "200% auto",
    transition: "background 0.3s",
    ":hover": {
      backgroundPosition: "100%",
    },
  }))
);

export const SectionTitle = React.memo(
  muiStyled(Typography)<TypographyProps>(({ theme }) => ({
    paddingLeft: "1rem",
    position: "relative",
    ":before": {
      content: '""',
      position: "absolute",
      width: 5,
      height: "100%",
      left: 0,
      background: theme.palette.background.fancy,
    },
  }))
);

interface MovieScoreProps {
  value: number;
  isMovieContent?: boolean;
  votes?: number | null;
}

export const MovieScore: React.FC<MovieScoreProps> = React.memo(
  ({ value, isMovieContent = false, votes = null }) => {
    return (
      <Stack spacing={1}>
        {!isMovieContent && (
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            textTransform="uppercase"
            sx={{ m: 0 }}
          >
            score
          </Typography>
        )}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            value={value}
            variant="determinate"
            size={isMovieContent ? 100 : 40}
            aria-label="movie user score"
            sx={{
              color: (theme) => theme.palette.primary.fancy,
              background: (theme) => theme.palette.background.light,
              borderRadius: "100%",
              padding: isMovieContent ? "5px" : 0,
            }}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant={isMovieContent ? "h3" : "caption"}
              component="div"
              color={isMovieContent ? "text.primary" : "text.secondary"}
              sx={{ m: 0 }}
            >{`${Math.round(value)}%`}</Typography>
          </Box>
        </Box>
        {isMovieContent && (
          <Box>
            <Typography
              variant="h4"
              component="div"
              textTransform="uppercase"
              sx={{ m: 0 }}
            >
              user score
            </Typography>
            <Typography
              variant="caption"
              component="div"
              textTransform="uppercase"
              sx={{ m: 0 }}
            >
              based on {votes} votes
            </Typography>
          </Box>
        )}
      </Stack>
    );
  }
);

interface ImageWithOverlayProps {
  image: string;
  color: string;
  title?: string;
  height?: number | string;
}

export const ImageWithOverlay: React.FC<ImageWithOverlayProps> = React.memo(
  ({ image, color, title = "", height = 250 }) => {
    return (
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          height={height}
          width="100%"
          src={image}
          alt={title}
          sx={{ objectFit: "cover", display: "block" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(0deg,${color},transparent 70%)`,
          }}
        />
      </Box>
    );
  }
);

export const FullscreenLoader: React.FC = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "red",
        background: (theme) => theme.palette.background.default,
        zIndex: 999,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export const MoviesList: React.FC<{
  movies: MovieDetails[];
  view?: "grid" | "list" | "detail";
}> = React.memo(({ view = "grid", movies }) => {
  switch (view) {
    case "grid":
      return (
        <Grid container spacing={2}>
          {movies.map((movie, index) => {
            return (
              <Grid
                item
                key={`${index}-${movie.id}`}
                lg={2}
                md={3}
                sm={4}
                xs={6}
              >
                <GridCard movie={movie} />
              </Grid>
            );
          })}
        </Grid>
      );

    case "list":
      return (
        <TableContainer>
          <Table
            sx={{
              borderRadius: 1,
              background: (theme) => theme.palette.background.defaultAlt,
            }}
          >
            <TableBody>
              {movies.map((movie, index) => {
                return <ListCard key={`${index}-${movie.id}`} movie={movie} />;
              })}
            </TableBody>
          </Table>
        </TableContainer>
      );

    case "detail":
      return (
        <Grid container spacing={2}>
          {movies.map((movie, index) => {
            return (
              <Grid item key={`${index}-${movie.id}`} lg={4} md={6} sm={12}>
                <DetailCard movie={movie} />
              </Grid>
            );
          })}
        </Grid>
      );
  }
});

export const Poster: React.FC<{ image: string; title?: string }> = React.memo(
  ({ image, title }) => {
    return (
      <Box textAlign="center" width="100%">
        <Box
          component="img"
          src={image}
          alt={title ? title : ""}
          boxShadow={5}
          sx={{ borderRadius: 1, maxWidth: "100%" }}
        />
      </Box>
    );
  }
);

export const LoadMore: React.FC<{
  nextLoad: number;
  onLoadMore: () => void;
  loading?: boolean;
}> = React.memo(({ nextLoad, onLoadMore, loading = false }) => {
  return nextLoad > 0 ? (
    <Section component="div" spacing="small" sx={{ textAlign: "center" }}>
      <FancyLoadingButton
        loading={loading}
        variant="contained"
        size="large"
        onClick={onLoadMore}
      >
        {nextLoad} more {__pl(["movie", "movies"], nextLoad)}
      </FancyLoadingButton>
    </Section>
  ) : null;
});

export const StyledSwitcher = muiStyled(Switch)(({ theme }) => {
  const space = 2;
  const height = 28;
  const width = height * 2;

  return {
    width: width,
    height: height,
    padding: 0,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "50%",
      height: "100%",
      left: 0,
      top: 0,
      zIndex: 1,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.mode === "light" ? "#fff" : theme.palette.text.secondary
      )}" d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/></svg>')`,
    },
    "&:after": {
      content: "''",
      position: "absolute",
      width: "50%",
      height: "100%",
      right: 0,
      top: 0,
      zIndex: 1,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.mode === "dark" ? "#fff" : theme.palette.text.secondary
      )}" d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z"/></svg>')`,
    },

    "& .MuiSwitch-switchBase": {
      margin: 0,
      padding: 0,
      zIndex: 2,
      opacity: 0,
      "&.Mui-checked": {
        transform: `translateX(${height}px)`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.background.light,
        borderRadius: height / 2,
        "&:before": {
          content: "''",
          position: "absolute",
          width: height - space * 2,
          height: height - space * 2,
          left: 0,
          top: 0,
          margin: space,
          backgroundImage: theme.palette.background.fancy,
          borderRadius: "100%",
          transition:
            "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        },
      },
      "&.Mui-checked + .MuiSwitch-track": {
        backgroundColor: theme.palette.background.light,
        opacity: 1,
        "&:before": {
          left: height,
        },
      },
      "& .MuiSwitch-thumb": {
        opacity: 0,
        margin: space,
        width: height - space * 2,
        height: height - space * 2,
      },
    },
  };
});

interface ErrorNotificationProps extends ToastContainerProps {
  muiTheme: Theme;
}
export const ErrorNotification = styled(ToastContainer)<ErrorNotificationProps>`
  .Toastify__toast {
    background: ${(props) => props.muiTheme.palette.background.fancy};
    .Toastify__toast-body {
      color: #ffffff;
      .Toastify__toast-icon svg {
        fill: #ffffff;
      }
    }
    .Toastify__close-button {
      color: rgba(255, 255, 255, 1);
      opacity: 0.6;
    }
    .Toastify__progress-bar {
      background: rgba(255, 255, 255, 0.7);
    }
  }
`;
