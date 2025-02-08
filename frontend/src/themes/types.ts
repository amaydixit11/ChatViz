// src/config/themes/types.ts
export type ThemeConfig = {
    name: string;
    label: string;
    colors: {
      background: string;
      foreground: string;
      primary: {
        default: string;
        foreground: string;
      };
      secondary: {
        default: string;
        foreground: string;
      };
      accent: {
        default: string;
        foreground: string;
      };
      border: string;
      input: string;
    };
  }
  
  export type ThemeMode = 'light' | 'dark';