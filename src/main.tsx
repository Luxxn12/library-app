import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import "./styles/index.css";
import { ThemeProvider } from "./components/ui/theme-provider";

import { TokenProvider } from "@/utils/contexts/token";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider >
    <React.StrictMode>
      <TokenProvider>
        <App />
        <Toaster position="top-center" richColors />
      </TokenProvider>
    </React.StrictMode>
  </ThemeProvider>
);
