import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import { getMockData, renderWithProvider } from "../../assets/test-utils";
import GridCard from "./GridCard";

describe("Grid card", () => {
  const movieWithImage = getMockData(1)[0];
  const movieWithoutImage = { ...movieWithImage, poster_path: "" };

  it("should show movie image if present", () => {
    let renderResult;
    act(() => {
      renderResult = renderWithProvider(<GridCard movie={movieWithImage} />);
    });
    expect(
      screen.getByRole("img", { name: movieWithImage.title })
    ).toBeInTheDocument();

    act(() => {
      renderResult.rerender(<GridCard movie={movieWithoutImage} />);
    });
    expect(
      screen.queryByRole("img", { name: movieWithoutImage.title })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: movieWithoutImage.title })
    ).toBeInTheDocument();
  });

  it("should link to movie detail", () => {
    act(() => {
      renderWithProvider(<GridCard movie={movieWithImage} />);
    });
    expect(
      screen
        .getByRole("link", { name: /movie detail link/i })
        .getAttribute("href")
    ).toEqual(`/movie/${movieWithImage.id}`);
  });

  it("should show movie image", () => {
    act(() => {
      renderWithProvider(<GridCard movie={movieWithImage} />);
    });
    expect(
      screen.getByRole("img", { name: movieWithImage.title })
    ).toBeInTheDocument();
  });

  it("should have hidden popup on load and short hover", () => {
    jest.useFakeTimers();

    let renderResult;
    act(() => {
      renderResult = renderWithProvider(<GridCard movie={movieWithImage} />);
    });
    expect(
      renderResult.container.querySelector(".card-popup")
    ).not.toBeVisible();

    fireEvent.mouseEnter(renderResult.container.querySelector(".movie-item"));
    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(
      renderResult.container.querySelector(".card-popup")
    ).not.toBeVisible();
  });

  it("should show popup on long hover and hide on hover out", () => {
    jest.useFakeTimers();

    let renderResult;
    act(() => {
      renderResult = renderWithProvider(<GridCard movie={movieWithImage} />);
    });

    fireEvent.mouseEnter(renderResult.container.querySelector(".movie-item"));
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(renderResult.container.querySelector(".card-popup")).toBeVisible();

    fireEvent.mouseLeave(renderResult.container.querySelector(".movie-item"));
    expect(
      renderResult.container.querySelector(".card-popup")
    ).not.toBeVisible();

    jest.useRealTimers();
  });
});
