import { alpha } from '@mui/material/styles';
import { createTheme, ThemeOptions } from '@mui/material/styles';
import responsiveFontSizes from '@mui/material/styles/responsiveFontSizes';
import { useSelector } from 'react-redux';
import { RootStoreStateType } from './store/store';
import { ThemeType } from './types';

declare module '@mui/material/styles' {
  interface TypeBackground {
    fancy: string
    whiteGradient: string
    fancyButton: string
    defaultTransparent: string
    defaultAlt: string
    light: string
    overlay: string
    overlayDark: string
    pageWrapper: string
  }

  interface TypeText {
    movieContent?: string
  }

  interface PaletteColor {
    fancy?: string
    borders?: string
  }

  interface SimplePaletteColorOptions {
    fancy?: string
    borders?: string
  }
}

const themeBase: ThemeOptions = {
  typography: {
    fontFamily: "'Varela Round', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "600",
      marginBottom: "2.2rem",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "600",
      marginBottom: "1.7rem",

    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: ".4rem",
    },
    h4: {
      fontSize: "1.3rem",
      fontWeight: "600",
      marginBottom: ".3rem",
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: "600",
      marginBottom: ".3rem",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: "600",
      marginBottom: ".3rem",
    },
    subtitle1: {
      fontSize: "1.4rem",
    },
    subtitle2: {
      fontSize: "1.1rem",
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: ".8rem",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          cursor: "inherit",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "inherit",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        direction: "row",
      },
      variants: [
        {
          props: { direction: "row" },
          style: {
            alignItems: "center",
            flexWrap: "wrap"
          }
        }
      ]
    },

  },
}

const themes: { dark: ThemeOptions, light: ThemeOptions } = {
  dark: {
    ...themeBase,
    palette: {
      mode: 'dark',
      background: {
        default: "#0a0a0a",
        defaultAlt: "#151515",
        defaultTransparent: alpha("#0a0a0a", 0.85),
        light: "#282828",
        fancy: "linear-gradient(45deg, #da3155 20%, #f87d3c 90%)",
        whiteGradient: "linear-gradient(45deg, #ffffff 20%, #d8d8d8 90%)",
        fancyButton: "linear-gradient(45deg,#da3155 -5%,#f87d3c 50%,#da3155)",
        overlay: "linear-gradient(0deg,#0a0a0a,transparent 70%)",
        overlayDark: "linear-gradient(0deg,#0a0a0a,rgba(10, 10, 10, 0.7)25%)",
        pageWrapper: "linear-gradient(135deg, rgb(10 10 10 / 95%) 20%, rgb(10 10 10 / 70%) )"
      },
      text: {
        primary: "#ffffff",
        secondary: alpha("#ffffff", 0.70),
        movieContent: "#ffffff",
      },
      primary: {
        main: "#ffffff",
        dark: "#0a0a0a",
        fancy: "#da3155",
        borders: alpha("#ffffff", 0.15),
      },
      secondary: {
        main: "#e7e7e7",
        fancy: "#f87d3c"
      },
    },
  },
  light: {
    ...themeBase,
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        defaultAlt: "#f8fafd",
        defaultTransparent: alpha("#ffffff", 0.85),
        light: "#ecf0fa",
        fancy: "linear-gradient(45deg, #da3155 20%, #f87d3c 90%)",
        whiteGradient: "linear-gradient(45deg, #ffffff 20%, #d8d8d8 90%)",
        fancyButton: "linear-gradient(45deg,#da3155 -5%,#f87d3c 50%,#da3155)",
        overlay: "linear-gradient(0deg,#ffffff,transparent 70%)",
        overlayDark: "linear-gradient(0deg,#ffffff,rgba(255, 255, 255, 0.7)25%)",
        pageWrapper: "linear-gradient(135deg, rgb(255 255 255 / 95%) 20%, rgb(255 255 255 / 70%) )"
      },
      text: {
        primary: "#727ba2",
        secondary: alpha("#727ba2", 0.70),
        movieContent: "#454a5d",
      },
      primary: {
        main: "#ffffff",
        dark: "#0a0a0a",
        fancy: "#da3155",
        borders: alpha("#0a0a0a", 0.15),
      },
      secondary: {
        main: "#2e2e2e",
        fancy: "#f87d3c"
      },

    },
  }
}



export const useThemeType = () => {
  const themeType = useSelector<RootStoreStateType, ThemeType>((state) => state.local.themeType);
  return responsiveFontSizes(createTheme(themes[themeType]));
}