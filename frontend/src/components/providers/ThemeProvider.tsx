// File: /frontend/src/components/providers/ThemeProvider.tsx

import { useEffect } from "react";
import { useThemeStore } from "@/hooks/useThemeStore";

// This component takes the application's children as a prop.
interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Subscribe to the theme state from our store.
  const theme = useThemeStore((state) => state.theme);

  // This useEffect hook will now reliably run whenever the 'theme' value changes.
  useEffect(() => {
    const root = document.documentElement;

    console.log(`[ThemeProvider] Applying theme: ${theme}`); // Add a log for proof.

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Render the rest of the application.
  return <>{children}</>;
};
