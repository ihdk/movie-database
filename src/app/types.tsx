export type ThemeType = "dark" | "light"

export interface MoviesApiError {
  status: number
  data: {
    status_code: number
    status_message: string
    success: boolean
  }
}

export interface MovieDetails {
  id: number
  title: string
  tagline: string
  overview: string
  poster_path: string
  backdrop_path: string
  vote_average: number
  vote_count: number
  release_date: string
  runtime: string
  genre_ids: number[]
  genres: {
    id: number
    name: string
  }[]
  credits: MovieCredits
}
export interface MovieCredits {
  cast: ActorDetails[]
  crew: CrewDetails[]
}

export interface ActorDetails {
  id: number
  name: string
  character: string
  profile_path: string
  biography: string
  popularity: number
  homepage: string
  birthday: string
  deathday: string
  place_of_birth: string
  known_for_department: string
}

interface CrewDetails {
  id: number
  name: string
  profile_path: string
  job: string
}

export interface MoviesSearchApiResponse {
  results: MovieDetails[],
  page: number,
  total_results: number,
  total_pages: number
}

export interface SearchData {
  searchTerm: string,
  page?: number
}

export interface GenresApiResponse {
  genres: {
    id: number
    name: string
  }[]
}

export interface ActorCreditsApiResponse {
  id: number
  cast: MovieDetails[]
  crew: CrewDetails[]
}

export interface Genres {
  [key: number]: string
}

