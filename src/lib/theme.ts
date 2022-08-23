// src/lib/theme.tsx
import { createContext } from "react";

export type Theme = {
  fontFamily: string;
  colors: {
    backgroundColor: string;
    textColor: string;
    toolbarBackgroundColor: string;
  };
};

export const ThemeContext = createContext<null | Theme>(null);
