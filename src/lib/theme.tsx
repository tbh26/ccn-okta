// src/lib/theme.tsx
import { createContext, useState } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
  };
};

export const defaultTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "#eee",
    textColor: "#111",
    toolbarBackgroundColor: "#ddd",
  },
};

export const otherTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "#333",
    textColor: "#eee",
    toolbarBackgroundColor: "#111",
  },
};

export const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: defaultTheme,
  toggle: () => {
    // noop ?
  },
});

export function ThemeProvider(props: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState(defaultTheme);

  const toggle = () => {
    if (theme === defaultTheme) {
      setTheme(otherTheme);
    } else {
      setTheme(defaultTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{theme, toggle}}>
      {props.children}
    </ThemeContext.Provider>
  );
}
