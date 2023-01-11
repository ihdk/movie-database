import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { renderWithProviders } from '../../assets/test-utils';
import SearchBar from "./SearchBar";


let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Search bar", () => {
  it("should render search input and buttons", () => {
    act(() => {
      renderWithProviders(<SearchBar />, { container: container });
    });

    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(2);

    expect(screen.getByText('Find movie')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it("should render input with search phrase", () => {
    const phrase = "Movie name";
    act(() => {
      renderWithProviders(<SearchBar />, { container: container, preloadedState: { local: { searchTerm: phrase } } });
    });
    expect(screen.getByDisplayValue(phrase)).toBeInTheDocument();
  });

});


describe("Cancel button", () => {
  it("should reset search phrase in input on click", () => {
    const phrase = "Movie name";
    act(() => {
      renderWithProviders(<SearchBar />, { container: container, preloadedState: { local: { searchTerm: phrase } } });
    });
    expect(screen.queryByDisplayValue(phrase)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Cancel'));
    expect(screen.queryByDisplayValue(phrase)).not.toBeInTheDocument();
  });

});