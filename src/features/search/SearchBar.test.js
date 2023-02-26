import { unmountComponentAtNode } from "react-dom"
import { act, Simulate } from "react-dom/test-utils"
import { fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { renderWithProviders } from '../../assets/test-utils'
import SearchBar from "./SearchBar"
import { initialState } from "../../app/store/localStorageSlice"


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

describe("Search bar", () => {

  it("should render empty input and button", () => {
    act(() => {
      renderWithProviders(<SearchBar />, { container: container })
    })
    expect(container.querySelector('button')).toBeInTheDocument()
    expect(container.querySelector('input').value).toEqual('')
  })

  it("should render input with search phrase", () => {
    const phrase = "search phrase"
    act(() => {
      renderWithProviders(<SearchBar />, { container: container, preloadedState: { local: { ...initialState, searchTerm: phrase } } })
    })
    expect(container.querySelector('input').value).toEqual(phrase)
  })

  it("should not show reset button when empty input", () => {
    act(() => {
      renderWithProviders(<SearchBar />, { container: container })
    })
    expect(container.querySelector('.cancel-button')).not.toBeInTheDocument()
  })

  it("should reset search input with reset button", () => {
    const phrase = "search phrase"
    act(() => {
      renderWithProviders(<SearchBar />, { container: container, preloadedState: { local: { ...initialState, searchTerm: phrase } } })
    })

    fireEvent.click(container.querySelector('.cancel-button'))
    
    expect(container.querySelector('input').value).toEqual('')
    expect(container.querySelector('.cancel-button')).not.toBeInTheDocument()
  })

})
