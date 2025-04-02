import React from "react";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import IconoMenu from "../atomos/iconoMenu";
import TextoMenu from "../atomos/textoMenu";
import { Box } from "@mui/material";

const ElementoMenu = ({
  titulo,
  ruta,
  icono,
  seleccionado,
  setSeleccionado,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ padding: "0px 8px" }}>
      <MenuItem
        active={seleccionado === titulo}
        onClick={() => setSeleccionado(titulo)}
        icon={<IconoMenu icono={icono} />}
        style={{ color: colors.primario[4] }}
      >
        <Link
          to={ruta}
          style={{ textDecoration: "none", color: "inherit", width: "100%" }}
        >
          <TextoMenu>{titulo}</TextoMenu>
        </Link>
      </MenuItem>
    </Box>
  );
};

export default ElementoMenu;
