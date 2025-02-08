// src/components/ThemeProvider.tsx
"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { ThemeConfig, ThemeMode, lightTheme, darkTheme } from '@/themes'
import { cssVariablesFromTheme } from '@/lib/theme'

type ThemeContextType = {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  currentTheme: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const themes: Record<ThemeMode, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<ThemeMode>('light')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    root.style.cssText = cssVariablesFromTheme(themes[theme])
  }, [theme])

  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        setTheme,
        currentTheme: themes[theme]
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}