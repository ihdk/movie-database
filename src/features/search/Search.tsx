import React from 'react';

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

/**
 * Renders search bar to find movies
 */
const Search: React.FC = () => {

  return (
    <>
      <SearchBar />
      <SearchResults />
    </>
  )
}

export default Search;