import { useEffect, useLayoutEffect, useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

type Theme = "light" | "dark" | "warm" | "cool";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };
type ThemeRenderer = (value: ThemeContextValue) => React.ReactNode;

const themes: Theme[] = ["light", "dark", "warm", "cool"];

function readSavedTheme(): Theme | undefined {
  const savedTheme = window.localStorage.getItem("bilal-theme");
  return themes.find((theme) => theme === savedTheme);
}

function syncThemeClasses(theme: Theme) {
  const root = document.documentElement;
  for (const themeClass of themes) {
    root.classList.toggle(themeClass, themeClass === theme);
  }
}

function ThemeController({ children }: { children: ThemeRenderer }) {
  const [theme, setTheme] = useState<Theme>(() => (
    readSavedTheme() ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  ));
  const [hasSavedTheme, setHasSavedTheme] = useState(() => readSavedTheme() !== undefined);

  useLayoutEffect(() => {
    syncThemeClasses(theme);
  }, [theme]);

  useEffect(() => {
    if (hasSavedTheme) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      setTheme(event.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, [hasSavedTheme]);

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    window.localStorage.setItem("bilal-theme", nextTheme);
    setHasSavedTheme(true);
  };

  return <>{children({ theme, toggleTheme })}</>;
}

function Router({ theme, toggleTheme }: ThemeContextValue) {
  return (
    <Switch>
      <Route path="/">
        <Home theme={theme} toggleTheme={toggleTheme} />
      </Route>
      <Route>
        <Home theme={theme} toggleTheme={toggleTheme} />
      </Route>
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeController>
        {({ theme, toggleTheme }) => <Router theme={theme} toggleTheme={toggleTheme} />}
      </ThemeController>
    </ErrorBoundary>
  );
}

// Note: This portfolio is intentionally client-only. Connect the contact submit
// handler in Home.tsx to Formspree, Resend, or your own API when ready.
