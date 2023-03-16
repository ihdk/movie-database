import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { FullscreenLoader } from "./features/components";
import { router } from "./app/router";
import { useThemeType } from "./app/theme";
import { persistor, store } from "./app/store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemedScreen />
      </PersistGate>
    </Provider>
  );
};

const ThemedScreen: React.FC = () => {
  const themeType = useThemeType();
  return (
    <ThemeProvider theme={themeType}>
      <CssBaseline />
      <Suspense fallback={<FullscreenLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
