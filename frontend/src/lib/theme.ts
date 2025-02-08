// src/lib/theme.ts
import { ThemeConfig } from '@/themes';

export function cssVariablesFromTheme(theme: ThemeConfig): string {
  const cssVars = [
    `--background: ${theme.colors.background}`,
    `--foreground: ${theme.colors.foreground}`,
    `--primary: ${theme.colors.primary.default}`,
    `--primary-foreground: ${theme.colors.primary.foreground}`,
    `--secondary: ${theme.colors.secondary.default}`,
    `--secondary-foreground: ${theme.colors.secondary.foreground}`,
    `--accent: ${theme.colors.accent.default}`,
    `--accent-foreground: ${theme.colors.accent.foreground}`,
    `--border: ${theme.colors.border}`,
    `--input: ${theme.colors.input}`,
  ];

  return cssVars.join(';');
}