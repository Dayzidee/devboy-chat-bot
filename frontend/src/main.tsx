// frontend/src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Our main App component
import "./styles/index.css"; // Our global styles
import { ThemeProvider } from "./components/providers/ThemeProvider.tsx";

// The '!' at the end tells TypeScript that we are certain this element exists.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Wrap the entire application with the ThemeProvider */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
