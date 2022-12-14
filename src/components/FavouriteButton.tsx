import { useDispatch } from 'react-redux';

import { styled } from '@mui/system';
import useTheme from '@mui/material/styles/useTheme';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';

import { useIsFavouriteMovie } from '../assets/helpers';
import { addFavouriteMovie, removeFavouriteMovie } from '../store/slice';

import type { MovieType } from '../assets/types';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.default,
  },
}));

/**
 * Renders button to add movie into favourites list
 */
const FavouriteButton: React.FC<{ movie: MovieType }> = ({ movie }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isFavourite = useIsFavouriteMovie(movie.id);

  const handleFavourite = () => {
    isFavourite ? dispatch(removeFavouriteMovie(movie.id)) : dispatch(addFavouriteMovie(movie))
  }

  return (
    <Box className="favourite-button">
      <CustomTooltip title={isFavourite ? "Remove from favourites" : "Add to favourites"} placement="left" >
        <IconButton aria-label="add movie to favourites" onClick={handleFavourite}
          sx={{
            backgroundColor: theme.palette.background.default,
            '&:hover': {
              backgroundColor: theme.palette.background.default,
            }
          }}
        >
          {isFavourite
            ? <StarIcon sx={{ color: theme.palette.gold }} fontSize="large" />
            : <StarOutlineIcon fontSize="large" />
          }
        </IconButton>
      </CustomTooltip>
    </Box>
  )
}

export default FavouriteButton;