// src/themes/light.ts
import { ThemeConfig } from './types';

export const lightTheme: ThemeConfig = {
  name: 'light',
  label: 'Light',
  colors: {
    background: '#FFFFFF', // White
    foreground: '#1E2A23', // Dark green-gray for text
    primary: {
      default: '#17823e', // WhatsApp green
      foreground: '#FFFFFF', // White text on primary
    },
    secondary: {
      default: '#E6F4EA', // Light green background
      foreground: '#5A6D64', // Darker green text
    },
    accent: {
      default: '#36E685', // Lighter green for accents
      foreground: '#FFFFFF', // White text on accent
    },
    border: '#D1E7D7', // Light green border
    input: '#D1E7D7', // Light green input
  },
};
