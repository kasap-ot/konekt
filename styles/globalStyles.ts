export const Colors = {
    background: {
      primary: '#1a1a1a',
      secondary: '#2a2a2a',
      tertiary: '#3a3a3a',
      listItem: '#252525',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
    accent: {
      primary: '#ff8c00',
      secondary: '#4a90e2',
      error: '#d9534f',
      success: '#5cb85c',
    },
    border: {
      light: '#444444',
      dark: '#222222',
    },
  };
  
  export interface ButtonStyleProps {
    backgroundColor?: string;
    textColor?: string;
    width?: string | number;
    height?: string | number;
  }