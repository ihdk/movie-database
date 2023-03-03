import React, { PropsWithChildren } from 'react'
import { render, renderHook } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'

import { Provider } from 'react-redux'
import type { PreloadedState } from '@reduxjs/toolkit'

import { setupStore } from '../app/store/store'
import mockData from './test-mock-data'
import type { AppStoreType, RootReducerType } from '../app/store/store'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootReducerType>
    store?: AppStoreType
}

export const renderWithProvider = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
        return <Provider store={store}>{children}</Provider>
    }
    const rendered = render(ui, { wrapper: Wrapper, ...renderOptions })
    return {
        ...rendered,
        rerender: (ui: React.ReactElement, options: ExtendedRenderOptions) => renderWithProvider(ui, { container: rendered.container, ...options })
    }
}


export const renderHookWithProviders = <Props, Result>(
    hook: (initialProps: Props) => Result,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
        return <Provider store={store}>{children}</Provider>
    }
    return renderHook(hook, { wrapper: Wrapper, ...renderOptions })
}

export const getMockData = (count = 10) => {
    const returnResults = count > mockData.length ? mockData.length : (count <= 0 ? 1 : count)
    return mockData.slice(0, returnResults)
};
