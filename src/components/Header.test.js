import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { renderWithProviders, getMockData } from '../assets/test-utils';
import Header from "./Header";


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

describe("Header", () => {

  it("should show logo and home icon", () => {
    act(() => {
      renderWithProviders(<Header />, { container: container });
    });

    expect(screen.getByText('Movie Database').closest('a').getAttribute('href')).toEqual('/');
    expect(screen.getByTestId('HomeIcon').closest('a').getAttribute('href')).toEqual('/');

  });

  it("should hide home icon if needed", () => {
    act(() => {
      renderWithProviders(<Header hideHome />, { container: container });
    });

    expect(screen.queryByTestId('HomeIcon')).toBeNull();

  });

  it("should show \"my movies\" if some added to favourites", () => {
    const data = getMockData();
    act(() => {
      renderWithProviders(<Header />, {
        container: container,
        preloadedState: {
          local: { favouriteMovies: data }
        }
      });
    });
    const button = screen.getByText(`My movies (${data.length})`);
    expect(button).toBeInTheDocument();
    expect(button.getAttribute("href")).toEqual("/favourites");
  });

});