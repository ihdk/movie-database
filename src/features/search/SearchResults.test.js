import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"
import { screen } from '@testing-library/react'

import { getMockData, renderWithProvider } from '../../assets/test-utils'
import { initialState } from "../../app/store/localStorageSlice"
import SearchResults from "./SearchResults"

describe("Search results", () => {

  it("should render with header text when movies found", () => {
    const data = getMockData(5)
    const total = 1000
    act(() => {
      renderWithProvider(<SearchResults />, { preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })
    expect(screen.getByText(`Found 1000 movies`)).toBeInTheDocument()
    expect(screen.getByText(`Showing 5 of 1000`)).toBeInTheDocument()
  })

  it("should render movies results in appropriate view", () => {
    const data = getMockData(5)
    let renderResult
    act(() => {
      renderResult = renderWithProvider(<SearchResults />, { preloadedState: { local: { ...initialState, movies: data, searchResultsView: "grid" } } })
    })
    for (let movie of data) {
      if (movie.poster_path) {
        expect(screen.getByRole('img', { name: movie.title })).toBeInTheDocument()
      } else {
        expect(screen.getByRole('heading', { name: movie.title })).toBeInTheDocument()
        expect(screen.getByTestId('TheatersIcon')).toBeInTheDocument()
      }
    }

    act(() => {
      renderResult.rerender(<SearchResults />, { preloadedState: { local: { ...initialState, movies: data, searchResultsView: "list" } } })
    })
    for (let movie of data) {
      expect(screen.queryByRole('img', { name: movie.title })).not.toBeInTheDocument()
      expect(screen.getByRole('heading', { name: movie.title })).toBeInTheDocument()
    }

  })

  it("should be visible load more button", () => {
    const data = getMockData(5)
    let total = 20
    let renderResult

    act(() => {
      renderResult = renderWithProvider(<SearchResults />, { preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })

    expect(screen.getByRole('button', { name: /15 more movies/i })).toBeInTheDocument()

    total = 10
    act(() => {
      renderResult.rerender(<SearchResults />, { preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })

    expect(screen.getByRole('button', { name: /5 more movies/i })).toBeInTheDocument()

    total = 5
    act(() => {
      renderResult.rerender(<SearchResults />, { preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })
    expect(screen.queryByRole('button', { name: /more movies/i })).not.toBeInTheDocument()
  })

})
