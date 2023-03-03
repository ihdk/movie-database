import '@testing-library/jest-dom'
import { act } from "react-dom/test-utils"
import { screen, within } from '@testing-library/react'

import { renderWithProvider, getMockData } from '../assets/test-utils'
import Header, { FavouritesMenuButton } from "./Header"
import { initialState } from "../app/store/localStorageSlice"


describe("Header", () => {

  it("should show logo and menu icons", () => {
    act(() => {
      renderWithProvider(<Header />)
    })
    expect(screen.getByText('Movie Database')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /favourite movies menu link/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /homepage menu link/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /theme switcher/i })).toBeInTheDocument()
  })

  it("logo and home button should link to home", () => {
    act(() => {
      renderWithProvider(<Header />)
    })
    expect(screen.getByRole('link', { name: /homepage logo link/i }).getAttribute('href')).toEqual('/')
    expect(screen.getByRole('link', { name: /homepage menu link/i }).getAttribute('href')).toEqual('/')

  })

})

describe("Favourite icon", () => {

  it("should link to Favourites page", () => {
    act(() => {
      renderWithProvider(<FavouritesMenuButton />)
    })
    expect(screen.getByRole('link', { name: /favourite movies menu link/i }).getAttribute('href')).toEqual('/favourites')
  })

  it("should not show count by default", () => {
    act(() => {
      renderWithProvider(<FavouritesMenuButton />)
    })
    expect(screen.getByRole('link', { name: /favourite movies menu link/i }).querySelector(".count")).not.toBeInTheDocument()
  })

  it("should show correct count if are favourite movies saved", () => {
    const data = getMockData(5)
    act(() => {
      renderWithProvider(<FavouritesMenuButton />, { preloadedState: { local: { ...initialState, favouriteMovies: data } } })
    })
    const link = screen.getByRole('link', { name: /favourite movies menu link/i });
    expect(within(link).getByText(/5/i)).toBeInTheDocument()
  })

})