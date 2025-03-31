import React, { useContext } from "react";
import { IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const TemaIcono = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);

  return (
    <IconButton onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon sx={{ color: colors.primario[4] }} />}
    </IconButton>
  );
};

export default TemaIcono;
