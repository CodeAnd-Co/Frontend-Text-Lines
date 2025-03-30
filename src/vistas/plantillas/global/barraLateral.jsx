import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme  } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { ColorModeContext, tokens } from "../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

const ElementoMenu = ({ titulo, ruta, icono, seleccionado, setSeleccionado }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);    
  return (
      <MenuItem
        active={seleccionado === titulo}
        onClick={() => setSeleccionado(titulo)}
        icon={icono}
        style={{color: colors.primario[4]}} 
      >
      <Link to={ruta} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
          <Typography>{titulo}</Typography>
      </Link>
      </MenuItem>
    );
  };
  

const BarraLateral = () => {
    const [colapsado, setColapsado] = useState(false);
    const [seleccionado, setSeleccionado] = useState("Inicio");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);    
    const colorMode = useContext(ColorModeContext);  
    const location = useLocation();
    const [activeSubmenu, setActiveSubmenu] = useState('');
    const empleadosActivo = location.pathname.includes('/empleados');
  
    return (
      <Box sx={{
        "& .pro-sidebar-inner": { background: "linear-gradient(180deg, #0E408F 0%, #093068 54.5%, #041E3C 100%)"},
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#ffffff !important" },
        "& .pro-menu-item.active, .pro-sub-menu-item.active": { backgroundColor: "rgba(33, 150, 243, 0.08) !important" },
        "& .pro-sub-menu .pro-inner-list-item": { paddingLeft: "44px !important" }, 
        "& .active-submenu": { backgroundColor: "rgba(33, 150, 243, 0.08) !important" },
      }}>
        <ProSidebar collapsed={colapsado}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setColapsado(!colapsado)}
              icon={colapsado ? <MenuOutlinedIcon /> : undefined}
              style={{ margin: "10px 0 20px 0" }}
            >
              {!colapsado && (
                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                  <img 
                    src="/logoAltertex.svg" 
                    style={{ width: "150px"}}  
                  />
                  <IconButton onClick={() => setColapsado(!colapsado)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            <Box>
              <ElementoMenu titulo="Inicio" ruta="/" icono={<HomeOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <SubMenu 
              title="Empleados" 
              icon={<GroupsOutlinedIcon />} 
              component={<Link to="/empleados" />}
              active={empleadosActivo} 
              className={empleadosActivo ? 'active-submenu' : ''}
              onClick={() => setActiveSubmenu('Empleados')}
              >
              <ElementoMenu titulo="Grupos de Empleados" ruta="/grupoEmpleados" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              </SubMenu>
              <SubMenu 
              title="Productos" 
              icon={<LocalOfferOutlinedIcon />} 
              >
              <ElementoMenu titulo="Categorías de Productos" ruta="/categorias" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Sets de Productos" ruta="/setsProductos" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              </SubMenu>
              <ElementoMenu titulo="Pedidos" ruta="/pedidos" icono={<InboxOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Cuotas" ruta="/cuotas" icono={<CurrencyExchangeOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Configuración" ruta="/configuracion" icono={<SettingsOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
          </Box>
          <Box>
            <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                      <DarkModeOutlinedIcon/>
                  ) : (
                      <LightModeOutlinedIcon />
                  )}
              </IconButton>            
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default BarraLateral;
