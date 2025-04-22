import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === 'dark'
    ? {
        texto: {
          1: 'rgba(255, 255, 255, 0.87)',
          2: 'rgba(255, 255, 255, 0.6)',
          3: 'rgba(255, 255, 255, 0.38)',
        },
        primario: {
          1: 'rgba(144, 202, 249, 1)',
          2: 'rgba(100, 181, 246, 1)',
          3: 'rgba(66, 165, 245, 1)',
          4: 'rgba(255, 255, 255, 1)',
          5: 'rgba(144, 202, 249, 0.04)',
          6: 'rgba(144, 202, 249, 0.08)',
          7: 'rgba(144, 202, 249, 0.12)',
          8: 'rgba(144, 202, 249, 0.3)',
          9: 'rgba(144, 202, 249, 0.5)',
        },
        rojo: {
          1: 'rgba(229, 115, 115, 1)',
          2: 'rgba(244, 67, 54, 1)',
          3: 'rgba(255, 82, 82, 1)',
        },
        verde: {
          1: 'rgba(129, 199, 132, 1)',
        },
        alerta: {
          1: 'rgba(255, 224, 178, 1)',
          2: 'rgba(255, 183, 77, 1)',
          3: 'rgba(191, 54, 12, 1)',
        },
        menu: {
          1: 'rgba(23, 23, 23, 1)',
          2: 'rgba(33, 33, 33, 1)',
          3: 'rgba(75, 75, 75, 0.26)',
        },
        altertex: {
          1: 'rgba(41, 41, 41, 1)',
          2: 'rgba(41, 41, 41, 0.5)',
          3: 'rgba(41, 41, 41, 0.7)',
        },
        acciones: {
          1: 'rgba(255, 255, 255, 0.08)',
          2: 'rgba(255, 255, 255, 0.10)',
        },
      }
    : {
        texto: {
          1: 'rgba(0, 0, 0, 0.87)',
          2: 'rgba(0, 0, 0, 0.6)',
          3: 'rgba(0, 0, 0, 0.38)',
        },
        primario: {
          1: 'rgba(25, 118, 210, 1)',
          2: 'rgba(21, 101, 192, 1)',
          3: 'rgba(66, 165, 245, 1)',
          4: 'rgba(255, 255, 255, 1)',
          5: 'rgba(25, 118, 210, 0.04)',
          6: 'rgba(25, 118, 210, 0.08)',
          7: 'rgba(25, 118, 210, 0.12)',
          8: 'rgba(25, 118, 210, 0.3)',
          9: 'rgba(25, 118, 210, 0.5)',
        },
        rojo: {
          1: 'rgba(211, 47, 47, 1)',
          2: 'rgba(198, 40, 40, 1)',
          3: 'rgba(239, 83, 80, 1)',
        },
        verde: {
          1: 'rgba(74, 158, 42, 1)',
        },
        alerta: {
          1: 'rgba(255, 244, 229, 1)',
          2: 'rgba(239, 108, 0, 1)',
          3: 'rgba(102, 60, 0, 1)',
        },
        menu: {
          1: 'linear-gradient(180deg, #0E408F 0%, #093068 54.5%, #041E3C 100%)',
          2: 'rgba(255, 255, 255, 1)',
          3: 'rgba(33, 150, 243, 0.08)',
        },
        altertex: {
          1: 'rgba(24, 50, 165, 1)',
          2: 'rgba(24, 50, 165, 0.5)',
          3: 'rgba(24, 50, 165, 0.7)',
        },
        acciones: {
          1: 'rgba(0, 0, 0, 0.08)',
          2: 'rgba(0, 0, 0, 0.10)',
        },
      }),
});

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primario[1],
            },
            secondary: {
              main: colors.primario[3],
            },
            neutral: {
              dark: colors.texto[1],
              main: colors.texto[2],
              light: colors.texto[3],
            },
            background: {
              default: colors.menu[2],
            },
          }
        : {
            primary: {
              main: colors.primario[1],
            },
            secondary: {
              main: colors.primario[3],
            },
            neutral: {
              dark: colors.texto[1],
              main: colors.texto[2],
              light: colors.texto[3],
            },
            background: {
              default: colors.menu[2],
            },
          }),
    },
    typography: {
      fontFamily: ['Roboto', 'sans-serif'],
      fontSize: 12,
      h1: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontWeight: 300,
        fontSize: 96,
      },
      h2: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontWeight: 300,
        fontSize: 60,
      },
      h3: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 48,
      },
      h4: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 34,
      },
      h5: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 24,
      },
      h6: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontWeight: 500,
        fontSize: 20,
      },
      subtitulo1: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 16,
      },
      subtitulo2: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontWeight: 600,
        fontSize: 14,
      },
      body1: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 16,
      },
      body2: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 14,
      },
      caption: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 12,
      },
      overline: {
        fontFamily: ['Roboto', 'sans-serif'],
        fontSize: 12,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
