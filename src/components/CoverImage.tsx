import React from 'react';

import useTheme from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import { alpha } from '@mui/material';

/**
 * Renders image in the background
 */
const CoverImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const theme = useTheme();

  // maybe try to get larger image for cover
  const smallPattern = "SX300.jpg";
  const largePattern = "SX1980.jpg";
  const largeImage = imageUrl.substring(imageUrl.length - smallPattern.length, imageUrl.length) === smallPattern ? imageUrl.replace(smallPattern, largePattern) : imageUrl;

  return (
    <Box sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: `url(${largeImage})`,
      backgroundSize: "cover",
      zIndex: -1
    }}>
      <Box sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: `linear-gradient( 135deg, ${theme.palette.background.default}, ${alpha(theme.palette.background.default, 0.7)})`
      }}></Box>
    </Box>
  )
}

export default CoverImage;