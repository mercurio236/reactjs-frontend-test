import React from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
import theme from "./styles/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/global";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
     <ThemeProvider theme={theme}>
     <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>
);

reportWebVitals(console.log);
