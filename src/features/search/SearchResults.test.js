import { unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { getMockData, renderWithProviders } from '../../assets/test-utils'
import SearchBar from "./SearchBar"
import SearchResults, { TitleTotal } from "./SearchResults"
import { initialState } from "../../app/store/localStorageSlice"
import { MovieScore } from "../components"
import { __pl } from "../../app/helpers"

let container = null

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)

})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe("Search results", () => {

  it("should not render when no movies to show", () => {
    act(() => {
      renderWithProviders(<SearchResults />, { container: container })
    })
    expect(container.querySelector('.search-results')).not.toBeInTheDocument()
  })

  it("should render with header text when movies found", () => {
    const data = getMockData(20)
    const total = 1000
    act(() => {
      renderWithProviders(<SearchResults />, { container: container, preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })
    const wrapper = container.querySelector('.search-results')
    expect(wrapper.getElementsByClassName('movie-item').length).toEqual(data.length)
    expect(screen.getByText(`Found ${total} movies`)).toBeInTheDocument()
    expect(screen.getByText(`Showing ${data.length} of ${total}`)).toBeInTheDocument()
  })


})

describe("Load more", () => {

  it("should NOT show when loaded movies equal to total movies", () => {
    const data = getMockData(15)
    const total = 15
    act(() => {
      renderWithProviders(<SearchResults />, { container: container, preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })

    expect(container.querySelector('.load-more-button')).not.toBeInTheDocument()
  })

  it("should show when loaded movies less than total movies", () => {
    const data = getMockData(15)
    const total = 50
    act(() => {
      renderWithProviders(<SearchResults />, { container: container, preloadedState: { local: { ...initialState, movies: data, totalMovies: total } } })
    })

    expect(container.querySelector('.load-more-button')).toBeInTheDocument()
  })

})