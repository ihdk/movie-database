import React, { useContext } from "react";
import { useDispatch } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Tooltip, { tooltipClasses, TooltipProps } from "@mui/material/Tooltip";
import { styled } from "@mui/material";

import { toggleFavouriteMovie } from "../../app/store/localStorageSlice";
import { MovieContext } from "../context";
import { useIsFavouriteMovie } from "../../app/helpers";

interface FavouriteButtonType extends IconButtonProps {
  floating?: boolean;
}

/**
 * Renders button to add/remove movie from favourites list
 */
const FavouriteButton: React.FC<FavouriteButtonType> = ({
  floating = false,
  ...props
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const movie = useContext(MovieContext);
  const isFavourite = useIsFavouriteMovie(movie.id);

  const handleFavourite = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    dispatch(toggleFavouriteMovie({ movie: movie, add: !isFavourite }));
  };

  return (
    <CustomTooltip
      title={isFavourite ? "Remove from favourites" : "Add to favourites"}
      placement="left"
    >
      <IconButton
        aria-label={
          isFavourite ? "Remove from favourites" : "Add to favourites"
        }
        onClick={handleFavourite}
        sx={{
          ...(floating && {
            position: "absolute",
            top: 5,
            right: 5,
          }),
          backgroundColor: theme.palette.background.defaultAlt,
          "&:hover": {
            backgroundColor: theme.palette.background.defaultAlt,
          },
        }}
        {...props}
      >
        <FavoriteIcon
          color="secondary"
          sx={{ ...(isFavourite && { color: "primary.fancy" }) }}
        />
      </IconButton>
    </CustomTooltip>
  );
};

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
}));

export default FavouriteButton;
