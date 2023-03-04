import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProvider } from "../../assets/test-utils";
import { initialState } from "../../app/store/localStorageSlice";
import SearchBar from "./SearchBar";

describe("Search bar", () => {
  it("should render empty search input and button", () => {
    act(() => {
      renderWithProvider(<SearchBar />);
    });
    expect(
      screen.getByRole("button", { name: /find movie/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox").value).toEqual("");
  });

  it("should render input with stored search phrase", () => {
    const phrase = "search phrase";
    act(() => {
      renderWithProvider(<SearchBar />, {
        preloadedState: { local: { ...initialState, searchTerm: phrase } },
      });
    });
    expect(screen.getByRole("textbox").value).toEqual(phrase);
  });

  it("should show reset button only with text in input", async () => {
    const phrase = "search phrase";
    act(() => {
      renderWithProvider(<SearchBar />);
    });
    expect(
      screen.queryByRole("button", { name: /cancel/i })
    ).not.toBeInTheDocument();
    await userEvent.type(screen.getByRole("textbox"), phrase);
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("should reset search input with reset button", async () => {
    const phrase = "search phrase";
    act(() => {
      renderWithProvider(<SearchBar />);
    });

    await userEvent.type(screen.getByRole("textbox"), phrase);
    expect(screen.getByRole("textbox", { value: phrase })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.getByRole("textbox").value).toEqual("");
    expect(
      screen.queryByRole("button", { name: /cancel/i })
    ).not.toBeInTheDocument();
  });
});
