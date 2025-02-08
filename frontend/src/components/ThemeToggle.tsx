// src/components/ThemeToggle.tsx
"use client"

import { useTheme } from "./ThemeProvider"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </span>
    </button>
  )
}