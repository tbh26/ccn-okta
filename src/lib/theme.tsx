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
    backgroundColor: "white",
    textColor: "#00c",
    toolbarBackgroundColor: "#555",
  },
};

export const otherTheme = {
  fontFamily: "sans-serif",
  colors: {
    backgroundColor: "lightgray",
    textColor: "#0c0",
    toolbarBackgroundColor: "#333",
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
    <ThemeContext.Provider value={{ theme, toggle }}>
      {props.children}
    </ThemeContext.Provider>
);
}

// export const ThemeContext = createContext<Theme>(defaultTheme);
