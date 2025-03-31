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
import TemaIcono from "../../componentes/atomos/temaIcono";
import ElementoMenu from "../../componentes/moleculas/elementoMenu";


const BarraLateral = () => {
    const [colapsado, setColapsado] = useState(false);
    const [seleccionado, setSeleccionado] = useState("Inicio");
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);    
    const location = useLocation();
    const [activeSubmenu, setActiveSubmenu] = useState('');
    const empleadosActivo = location.pathname.includes('/empleados');
  
    return (
      <Box sx={{
        "& .pro-sidebar-inner": { background: colors.menu[1]},
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item:hover": { color: "#ffffff !important" },
        "& .pro-menu-item.active, .pro-sub-menu-item.active": { backgroundColor: colors.menu[3] },
        "& .pro-sub-menu": { padding: "0px 8px !important" },    
        "& .pro-sub-menu .pro-inner-list-item": { padding: "0px 10px 8px 33px !important" }, 
        "& .active-submenu": { backgroundColor: colors.menu[3] },
      }}>
        <ProSidebar collapsed={colapsado}>
          <Menu iconShape="square">
            <MenuItem
              onClick={() => setColapsado(!colapsado)}
              icon={colapsado ? <MenuOutlinedIcon /> : undefined}
              style={{ margin: "10px 0 20px 0" , color: colors.primario[4]}}    
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
              active={empleadosActivo.toString()} 
              className={empleadosActivo ? 'active-submenu' : ''}
              onClick={() => setActiveSubmenu('Empleados')}
              >
              <ElementoMenu titulo="Grupos de Empleados" ruta="/grupoEmpleados" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              </SubMenu>
              <SubMenu 
              title="Productos" 
              icon={<LocalOfferOutlinedIcon />} 
              >
              <ElementoMenu titulo="Sets de Productos" ruta="/setsProductos" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />                
              <ElementoMenu titulo="Categorías" ruta="/categorias" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              </SubMenu>
              <ElementoMenu titulo="Pedidos" ruta="/pedidos" icono={<InboxOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Cuotas" ruta="/cuotas" icono={<CurrencyExchangeOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Configuración" ruta="/configuracion" icono={<SettingsOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
          </Box> 
            <Box sx={{padding: "20px 0px 0px 50px"}}>     
              <TemaIcono />   
            </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default BarraLateral;
