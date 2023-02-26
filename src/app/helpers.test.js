import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import { ToastContainer } from 'react-toastify'
import { notify, useIsFavouriteMovie, __pl } from "../app/helpers"
import { getMockData, renderHookWithProviders, renderWithProviders } from "../assets/test-utils"



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

describe("__pl", () => {

  it("should return correct string", () => {
    const singular = "singular"
    const plural = "plural"

    expect(__pl([singular, plural], 1)).toEqual(singular)
    expect(__pl([singular, plural], 0)).toEqual(plural)
    expect(__pl([singular, plural], 2)).toEqual(plural)
  })

})


describe("notify", () => {

  it("should show notification with correct text", () => {
    jest.useFakeTimers()
    const message = "notification message text"
    const title = "notification title"
    act(() => {
      renderWithProviders(<ToastContainer />, { container: container })
    })

    const wrapper = container.querySelector('.Toastify')
    expect(wrapper).toBeInTheDocument()
    expect(wrapper.querySelector('.Toastify__toast-container')).not.toBeInTheDocument()

    notify(message, title)

    act(() => { jest.advanceTimersByTime(500) })

    expect(screen.getByText(message)).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    
    jest.useRealTimers()
  })

})


describe("useIsFavouriteMovie", () => {

  it("should correctly check movie ID", () => {
    const data = getMockData(5)
    let id = "fakeID"
    const { result, rerender, } = renderHookWithProviders(() => useIsFavouriteMovie(id), { preloadedState: { local: { favouriteMovies: data } } })
    expect(result.current).toEqual(false)

    id = data[0].id
    rerender()
    expect(result.current).toEqual(true)
  })

})