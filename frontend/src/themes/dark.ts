// src/themes/dark.ts
import { ThemeConfig } from './types';

export const darkTheme: ThemeConfig = {
  name: 'dark',
  label: 'Dark',
  colors: {
    background: '#1A1F1C', // Very dark green
    foreground: '#FAFAFA', // Almost white text
    primary: {
      default: '#25D366', // WhatsApp green
      foreground: '#FFFFFF', // White text on primary
    },
    secondary: {
      default: '#232B26', // Slightly lighter dark green
      foreground: '#D4D9D6', // Light green-gray text
    },
    accent: {
      default: '#36E685', // Lighter green for accents
      foreground: '#FFFFFF', // White text on accent
    },
    border: '#37423D', // Dark green border
    input: '#37423D', // Dark green input
  },
};
