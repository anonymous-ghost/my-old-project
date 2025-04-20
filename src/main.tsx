import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { I18nextProvider } from "react-i18next";
import i18n from "./locales/i18n";
import { FilmsProvider } from "./hooks/useFilms";
import { SessionsProvider } from "./hooks/useSessions";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <FilmsProvider>
        <SessionsProvider>
          <App />
        </SessionsProvider>
      </FilmsProvider>
    </I18nextProvider>
  </React.StrictMode>
);
