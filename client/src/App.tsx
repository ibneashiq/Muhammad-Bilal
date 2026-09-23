import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";

type Theme = "light" | "dark";
type ThemeContextValue = { theme: Theme; toggleTheme: () => void };
type ThemeRenderer = (value: ThemeContextValue) => React.ReactNode;

function ThemeController({ children }: { children: ThemeRenderer }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("bilal-theme") as Theme | null;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const nextTheme: Theme = savedTheme ?? (mediaQuery.matches ? "dark" : "light");

    setTheme(nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");

    if (!savedTheme) {
      const handleSystemThemeChange = (event: MediaQueryListEvent) => {
        setTheme(event.matches ? "dark" : "light");
        document.documentElement.classList.toggle("dark", event.matches);
      };
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem("bilal-theme", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
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
