import { unmountComponentAtNode } from "react-dom"
import { act, Simulate } from "react-dom/test-utils"
import { fireEvent, getByRole, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { getMockData, renderWithProviders } from '../../assets/test-utils'
import SearchBar from "../search/SearchBar"
import { initialState } from "../../app/store/localStorageSlice"
import GridCard from "./SimpleCard"



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

describe("Simple card", () => {

  const data = getMockData(1)[0]

  it("should have closed popup on load", () => {
    act(() => {
      renderWithProviders(<GridCard movie={data} />, { container: container })
    })
    expect(container.querySelector('.movie-item')).toBeInTheDocument()
    expect(container.querySelector('.card-popup')).not.toBeVisible()
  })

  it("should NOT show popup on short hover", () => {
    jest.useFakeTimers()
    act(() => {
      renderWithProviders(<GridCard movie={data} />, { container: container })
    })

    fireEvent.mouseEnter(container.querySelector('.movie-item'))
    act(() => { jest.advanceTimersByTime(499) })
    expect(container.querySelector('.card-popup')).not.toBeVisible()

    jest.useRealTimers()

  })

  it("should show popup on long hover and hide on hover out", () => {
    jest.useFakeTimers()
    act(() => {
      renderWithProviders(<GridCard movie={data} />, { container: container })
    })

    fireEvent.mouseEnter(container.querySelector('.movie-item'))
    act(() => { jest.advanceTimersByTime(500) })
    expect(container.querySelector('.card-popup')).toBeVisible()

    fireEvent.mouseLeave(container.querySelector('.movie-item'))
    expect(container.querySelector('.card-popup')).not.toBeVisible()

    jest.useRealTimers()

  })

  it("should link to movie detail", () => {
    act(() => {
      renderWithProviders(<GridCard movie={data} />, { container: container })
    })
    expect(container.querySelector('.movie-item a').getAttribute('href')).toEqual(`/movie/${data.id}`)
  })

  it("should show movie image", () => {
    act(() => {
      renderWithProviders(<GridCard movie={data} />, { container: container })
    })
    expect(getByRole(container, 'img', { name: data.title })).toBeInTheDocument()
    expect(getByRole(container, 'img', { name: data.title }).getAttribute('src')).toContain(data.poster_path)
  })
})
