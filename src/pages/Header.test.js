import { unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { renderWithProviders, getMockData } from '../assets/test-utils'
import Header, { FavouritesMenuButton } from "./Header"
import { initialState } from "../app/store/localStorageSlice"


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

describe("Header", () => {

  it("should show correct logo and icons", () => {
    act(() => {
      renderWithProviders(<Header />, { container: container })
    })
    expect(screen.getByText('Movie Database')).toBeInTheDocument()
    expect(container.querySelector(".favourites-button")).toBeInTheDocument()
    expect(container.querySelector(".home-button")).toBeInTheDocument()
  })

  it("logo and home button should link to home", () => {
    act(() => {
      renderWithProviders(<Header />, { container: container })
    })
    expect(container.querySelector(".logo-part a").getAttribute('href')).toEqual('/')
    expect(container.querySelector(".home-button").getAttribute('href')).toEqual('/')
  })

})

describe("Favourite icon", () => {

  it("should link to Favourites page", () => {
    act(() => {
      renderWithProviders(<FavouritesMenuButton />, { container: container })
    })
    expect(container.querySelector(".favourites-button").getAttribute('href')).toEqual('/favourites')
  })

  it("should not show count by default", () => {
    act(() => {
      renderWithProviders(<FavouritesMenuButton />, { container: container })
    })
    expect(container.querySelector(".count")).not.toBeInTheDocument()
  })

  it("should show correct count if are favourite movies saved", () => {
    const data = getMockData(5)
    act(() => {
      renderWithProviders(<FavouritesMenuButton />, { container: container, preloadedState: { local: { ...initialState, favouriteMovies: data } } })
    })
    expect(parseInt(container.querySelector(".count").innerHTML)).toEqual(data.length)
  })


})