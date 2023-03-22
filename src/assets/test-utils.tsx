import React, { PropsWithChildren } from "react";
import { render, renderHook } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import type { PreloadedState } from "@reduxjs/toolkit";

import { setupStore } from "../app/store/store";
import testMockData from "./test-mock-data";
import type { AppStoreType, RootReducerType } from "../app/store/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootReducerType>;
  store?: AppStoreType;
  route?: string;
}

export const renderWithProvider = (
  ui: React.ReactElement,
  {
    route = "",
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <Router initialEntries={[route]}>{children}</Router>
      </Provider>
    );
  };
  const rendered = render(ui, { wrapper: Wrapper, ...renderOptions });
  return {
    ...rendered,
    rerender: (ui: React.ReactElement, options: ExtendedRenderOptions) =>
      renderWithProvider(ui, { container: rendered.container, ...options }),
  };
};

export const renderHookWithProvider = <Props, Result>(
  hook: (initialProps: Props) => Result,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  };
  return renderHook(hook, { wrapper: Wrapper, ...renderOptions });
};

export const getMockData = (count = 10) => {
  const returnResults =
    count > testMockData.length ? testMockData.length : count <= 0 ? 1 : count;
  return testMockData.slice(0, returnResults);
};
