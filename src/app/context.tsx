import { createContext } from "react";
import { ActorDetails, MovieDetails } from "./types";

export const MovieContext = createContext({} as MovieDetails);
export const ActorContext = createContext({} as ActorDetails);
export const ThemeTypeContext = createContext({ toggleTheme: () => {} });
