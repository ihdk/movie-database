# Movie Database

## Description

React application written in TypeScript to present movie information from open source database [The Movie DB](https://www.themoviedb.org/).
The application is developed for purposes of presentation, education and testing of new technologies.

Live demo can be found [here](https://ihdk-movie-database.netlify.app/).

### Technologies

- [Material UI](https://mui.com/) used for general design of app components
- [React Router](https://www.npmjs.com/package/react-router) to create site routes,
- [React Redux](https://www.npmjs.com/package/react-redux) for general app state management,
- [Redux Persist](https://www.npmjs.com/package/redux-persist) for local storage state management,
- [Redux Toolkit Query](https://www.npmjs.com/package/react-query) to maintain fetched and cached query results.

### Installation

Use the npm package manager to install application locally from your cloned repository.

```bash
npm install
```

Then run application in your browser.

```bash
npm start
```

## Application details

The application cosists of four routes splitted into separated chunks:

- Homepage with search functionality
- Movie detail page
- Actor detail page
- Favourite movies page
- 404 page

Last search results, favourite movies or choosen theme are stored in local storage thanks to [Redux Persist](https://www.npmjs.com/package/redux-persist).

## Basic components tests

Available are basic tests of some components.

Run test:

```bash
npm test
```

<!--
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
-->
