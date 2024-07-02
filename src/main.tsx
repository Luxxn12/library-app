import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import "./styles/index.css";
import { ThemeProvider } from "./components/ui/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>
);
