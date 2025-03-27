import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';

const ElementoMenu = ({ titulo, icono, seleccionado, setSeleccionado }) => {
    return (
      <MenuItem
        active={seleccionado === titulo}
        onClick={() => setSeleccionado(titulo)}
        icon={icono}
        style={{ userSelect: "none" }} 
      >
        <Typography contentEditable={false} suppressContentEditableWarning>
            {titulo}
        </Typography>
      </MenuItem>
    );
  };
  

const BarraLateral = () => {
    const [colapsado, setColapsado] = useState(false);
    const [seleccionado, setSeleccionado] = useState("Inicio");
  
    return (
      <Box sx={{
        "& .pro-sidebar-inner": { background: "linear-gradient(180deg, #0E408F 0%, #093068 54.5%, #041E3C 100%)"},
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item": { padding: "5px 35px 5px 20px !important" },
        "& .pro-inner-item:hover": { color: "#ffffff !important" },
        "& .pro-menu-item.active": { color: "#0000008f !important" },
        "& .pro-sub-menu .pro-inner-list-item": { paddingLeft: "44px !important" }, 
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
              <ElementoMenu titulo="Inicio" icono={<HomeOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <SubMenu 
              title="Empleados" 
              icon={<GroupsOutlinedIcon />} 
              popper={colapsado} 
              >
              <ElementoMenu titulo="Grupos de Empleados" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Sets de Empleados"  seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              </SubMenu>
              <SubMenu 
              title="Productos" 
              icon={<LocalOfferOutlinedIcon />} 
              popper={colapsado} 
              >
              <ElementoMenu titulo="Categorías de Productos" seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Sets de Productos"  seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              </SubMenu>
              <ElementoMenu titulo="Pedidos"  icono={<InboxOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Cuotas"  icono={<CurrencyExchangeOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
              <ElementoMenu titulo="Configuración"  icono={<SettingsOutlinedIcon />} seleccionado={seleccionado} setSeleccionado={setSeleccionado} />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default BarraLateral;
