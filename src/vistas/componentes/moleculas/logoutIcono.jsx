import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import { useContext } from "react";
import { useAuth } from "../../../AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const LogoutIcono = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const colors = tokens(theme.palette.mode);
  const { user, cerrarSesion } = useAuth();
  const navegar = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      `${API_URL}/api/logout`,
      {},
      {
        withCredentials: true,
        headers: { "x-api-key": API_KEY }, // Agrega la clave API en los headers
      }
    );
    cerrarSesion();
    navegar("/login");
  };

  return (
    <IconButton onClick={handleLogout}>
      {theme.palette.mode === "dark" ? (
        <LogoutOutlinedIcon />
      ) : (
        <LogoutOutlinedIcon sx={{ color: colors.primario[4] }} />
      )}
    </IconButton>
  );
};

export default LogoutIcono;
