// File: /frontend/src/components/layout/Navbar.tsx

import { Link } from "react-router-dom";
import { BotMessageSquare, Sun, Moon } from "lucide-react"; // Using icons from lucide-react
import { useThemeStore } from "@/hooks/useThemeStore";

// A placeholder for our theme toggle hook, which we will build later


const useTheme = () => ({
  theme: "dark", // 'dark' or 'light'
  toggleTheme: () => console.log("Toggling theme"),
});

const Navbar = () => {
   const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo and App Name */}
        <Link to="/" className="flex items-center space-x-2">
          <BotMessageSquare className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg font-display">DevBot</span>
        </Link>

        {/* Navigation and Actions */}
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/features"
              className="transition-colors hover:text-primary"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/contact"
              className="transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </nav>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-colors hover:bg-card hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary-darker transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
