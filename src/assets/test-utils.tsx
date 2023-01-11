import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import mockData from './test-mock-data';
import { setupStore } from '../store/store'
import type { RootReducerType, AppStoreType } from '../store/store'


interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootReducerType>
    store?: AppStoreType
}

export const renderWithProviders = (
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) => {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export const getMockData = (count = 10) => {
    return mockData.slice(count > mockData.length ? mockData.length : (count <= 0 ? 1 : count - 1))
};