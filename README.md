# Movie Database

## Description
Presentation React application written in TypeScript to get movies information from open source database [OMDb API](https://www.omdbapi.com/).
Application allows you to search for movies, view their detail information and save them to own favourites list.

Live demo can be found [here](https://ihdk-movie-database.netlify.app/).


### Features

- [Material UI](https://mui.com/) used for main design of app components
- [React Router](https://www.npmjs.com/package/react-router) to create four main routes,
- [Axios](https://www.npmjs.com/package/react-axios) to fetch data from database,
- [React Query](https://www.npmjs.com/package/react-query) to maintain fetched and cached query results,
- [React Redux](https://www.npmjs.com/package/react-redux) for global state management,
- [React Persist](https://www.npmjs.com/package/redux-persist) for locally stored application states.


### Instructions to run

- fork this repository
- clone your repository
- install npm package manager
- play with app, add own scripts and make it better

### Installation

Use the npm package manager to install application locally from your cloned repository.

```bash
npm install
```

Then run application in your browser.

```bash
npm start
```

## Application routes

Application cosists from four routes splitted into separated chunks:

### Movie Search

Movie search is the main page of application. Allows you to process search query and display found movies in the grid.
Data are fetched from database using [Axios](https://www.npmjs.com/package/react-axios) and [ReactQuery](https://www.npmjs.com/package/react-query) maintain fetched and cached query results.
Found results are stored locally in browser using [React Persist](https://www.npmjs.com/package/redux-persist) to maintain results even the user leave application or browse through application routes.

Movies are loaded from database in groups of 10 movies (limitation of OMDb API) with ability to load more movies using button under the grid with movies.

Every movie can be added to own favourite list by clicking on the star icon displayed with movie.

Main component: `MovieSearch` in `./components/movie-search/MovieSearch`

Consists from components to render:
- header `./components/Header`
- search bar `./components/movie-search/SearchBar`
- search results `./components/movie-search/SearchResults`.

### Movie Detail

Displays detail information of movie fetched from database.

Movie can be added into favourite list by clicking on the star icon displayed beside movie title.

Main component: `MovieDetail` in `./components/movie-detail/MovieDetail`

Consists from components to render:
- header `./components/Header`
- other additional components with appropriate movie information in the same folder `./components/movie-detail`

### Favourites 

Page displays selected favourite movies the same way as they are displayed in Movie Search page.

List of favourite movies is stored locally in browser using [React Persist](https://www.npmjs.com/package/redux-persist).

Main component: `Favourites` in `./components/favourites/Favourites`


### 404 Nothing found

Standard 404 page for non-existent routes.

Main component: `NothingFound` in `./components/nothing-found/NothingFound`

## Files structure

Root folder of application include main index file and core `App` component.

Other folders:
- `./assets` - additional files with small help functions, images and hooks that fetch data from database,
- `./components` - React components divided to sub-folders by routes, components in the root of this folder are additional components that may be shared between main routes components
- `./store` - files for React Redux store and appropriate reducers
