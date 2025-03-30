import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        texto: {
            1: "rgba(255, 255, 255, 0.87)",  
            2: "rgba(255, 255, 255, 0.6)",   
            3: "rgba(255, 255, 255, 0.38)", 
        },
        primario: {
            1: "rgba(144, 202, 249, 1)",  
            2: "rgba(100, 181, 246, 1)",
            3: "rgba(66, 165, 245, 1)", 
            4: "rgba(255, 255, 255, 1)",  
            5: "rgba(144, 202, 249, 0.04)", 
            6: "rgba(144, 202, 249, 0.08)", 
            7: "rgba(144, 202, 249, 0.12)", 
            8: "rgba(144, 202, 249, 0.3)",  
            9: "rgba(144, 202, 249, 0.5)",  
        },
        rojo: {
            1: "rgba(229, 115, 115, 1)",  
            2: "rgba(244, 67, 54, 1)", 
            3: "rgba(255, 82, 82, 1)", 
        },
        verde: {
            1: "rgba(129, 199, 132, 1)",  
        },
        alerta: {
            1: "rgba(255, 224, 178, 1)", 
            2: "rgba(255, 183, 77, 1)",  
            3: "rgba(191, 54, 12, 1)",  
        },
     }
    : {
        texto: {
            1:"rgba(0, 0, 0, 0.87)",
            2: "rgba(0, 0, 0, 0.6)",
            3:"rgba(0, 0, 0, 0.38)",
        },
        primario: {
            1:"rgba(25, 118, 210, 1)",
            2:"rgba(21, 101, 192, 1)",
            3:"rgba(66, 165, 245, 1)",
            4:"rgba(255, 255, 255, 1)",
            5:"rgba(25, 118, 210, 0.04)",
            6:"rgba(25, 118, 210, 0.08)",
            7:"rgba(25, 118, 210, 0.12)",
            8:"rgba(25, 118, 210, 0.3)",
            9:"rgba(25, 118, 210, 0.5)",
        },
        rojo: {
            1:"rgba(211, 47, 47, 1)",
            2:"rgba(198, 40, 40, 1)",
            3:"rgba(239, 83, 80, 1)",
        },
        verde: {
            1:"rgba(74, 158, 42, 1)",
        },
        alerta:{
            1:"rgba(255, 244, 229, 1)",
            2:"rgba(239, 108, 0, 1)",
            3:"rgba(102, 60, 0, 1)",
        },
    }),
});  


export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
      palette: {
        mode: mode,
        ...(mode === "dark"
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
                default: "rgba(27, 33, 46, 1)",
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
                default:"rgba(252, 252, 252, 1)",
              },
            }),
      },
      typography: {
        fontFamily: ["Roboto"],
        fontSize: 12,
        h1: {
          fontFamily: ["Roboto"],
          fontWeight: 300,
          fontSize: 96,
        },
        h2: {
          fontFamily: ["Roboto"],
          fontWeight: 300,
          fontSize: 60,
        },
        h3: {
          fontFamily: ["Roboto"],
          fontSize: 48,
        },
        h4: {
          fontFamily: ["Roboto"],
          fontSize: 34,
        },
        h5: {
          fontFamily: ["Roboto"],
          fontSize: 24,
        },
        h6: {
          fontFamily: ["Roboto"],
          fontWeight: 500,
          fontSize: 20,
        },
        subtitulo1: {
          fontFamily: ["Roboto"],
          fontSize: 16,
        },
        subtitulo2: {
            fontFamily: ["Roboto"],
            fontWeight: 500,
            fontSize: 14,
        },
        body1: {
            fontFamily: ["Roboto"],
            fontSize: 16,
        },
        body2: {
            fontFamily: ["Roboto"],
            fontSize: 14,
        },
        caption: {
            fontFamily: ["Roboto"],
            fontSize: 12,
        },
        overline: {
            fontFamily: ["Roboto"],
            fontSize: 12,
        },
      },
    };
  };
  
export const ColorModeContext = createContext({
    toggleColorMode: () => {},
});
  
export const useMode = () => {
    const [mode, setMode] = useState("dark");
  
    const colorMode = useMemo(
      () => ({
        toggleColorMode: () =>
          setMode((prev) => (prev === "light" ? "dark" : "light")),
      }),
      []
    );
  
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};