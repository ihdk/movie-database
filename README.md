# Movie Database

## Description
Presentation React application written in TypeScript to get movie information from open source database [OMDb API](https://www.omdbapi.com/).
Application allows you to search for movies, view their detail information and save them to your own favourites list.

Live demo can be found [here](https://ihdk-movie-database.netlify.app/).

### Features

- [Material UI](https://mui.com/) used for main design of app components
- [React Router](https://www.npmjs.com/package/react-router) to create four main routes,
- [Axios](https://www.npmjs.com/package/react-axios) to fetch data from database,
- [React Query](https://www.npmjs.com/package/react-query) to maintain fetched and cached query results,
- [React Redux](https://www.npmjs.com/package/react-redux) for global state management,
- [React Persist](https://www.npmjs.com/package/redux-persist) for locally stored application states.


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

The application cosists of four routes splitted into separated chunks:

### Movie Search

Movie search is the main page of application. Allows you to process search query and display found movies in the grid.
Data is fetched from the database using [Axios](https://www.npmjs.com/package/react-axios) and [ReactQuery](https://www.npmjs.com/package/react-query) maintains fetched and cached query results.
Found results are stored locally in the browser using [React Persist](https://www.npmjs.com/package/redux-persist) to maintain results and scroll position even if the user leaves application or browses through application routes.

Movies are loaded from the database in groups of 10 movies (limitation of OMDb API) with ability to load more movies using a button under the grid with movies.

Every movie can be added to your own favourite list by clicking on the star icon displayed with the movie.

Main component: `MovieSearch` in `./src/components/movie-search/MovieSearch`

Consists from components to render:
- header `./src/components/Header`
- search bar `./src/components/movie-search/SearchBar`
- search results `./src/components/movie-search/SearchResults`.

### Movie Detail

Displays detailed information of the movie fetched from database.

Movie can be added to your favourite list by clicking on the star icon displayed beside the movie title.

Main component: `MovieDetail` in `./src/components/movie-detail/MovieDetail`

Consists from components to render:
- header `./src/components/Header`
- other additional components with appropriate movie information in the same folder `./src/components/movie-detail`

### Favourites 

Page displays selected favourite movies the same way as they are displayed in the Movie Search page.

List of favourite movies is stored locally in the browser using [React Persist](https://www.npmjs.com/package/redux-persist).

Main component: `Favourites` in `./src/components/favourites/Favourites`


### 404 Nothing found

Standard 404 page for non-existent routes.

Main component: `NothingFound` in `./src/components/nothing-found/NothingFound`

## Files structure

Root folder of application includes the main index file and core `App` component.

Other folders:
- `./src/assets` - additional files with small help functions, images and hooks that fetch data from database,
- `./src/components` - React components divided to sub-folders by routes, components in the root of this folder are additional components that may be shared between main routes components
- `./src/store` - files for React Redux store and appropriate reducers

## Basic components tests
Available are basic examples of components tests in `./src/components` folder.

Run test:
```bash
npm test
```
## Basic E2E tests

Repository includes basic Cypress end-to-end tests in `./cypress/e2e` folder to simulate few actions and check expected app behavior:

- run movie search,
- load more movies,
- cancel search process,
- ability to add/remove movie from favourites list,
- displaying appropriate notifications.

Run test:
```bash
npx cypress open
```
