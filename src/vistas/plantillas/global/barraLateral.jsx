import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { ColorModeContext, tokens } from "../../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import TemaIcono from "../../componentes/atomos/temaIcono";
import ElementoMenu from "../../componentes/moleculas/elementoMenu";

const BarraLateral = () => {
  const [colapsado, setColapsado] = useState(false);
  const [seleccionado, setSeleccionado] = useState("Inicio");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productosAbierto, setProductosAbierto] = useState(false);
  const [empleadosAbierto, setEmpleadosAbierto] = useState(false);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": { background: colors.menu[1] },
        "& .pro-icon-wrapper": { backgroundColor: "transparent !important" },
        "& .pro-inner-item:hover": { color: "#ffffff !important" },
        "& .pro-menu-item.active, .pro-sub-menu-item.active": {
          backgroundColor: colors.menu[3],
        },
        "& .pro-sub-menu": {
          padding: "0px 0px 0px 8px !important",
          transition: "padding 0.3s ease-in-out",
        },
        "& .pro-sub-menu .pro-inner-list-item": {
          padding: "0px 0px 0px 33px !important",
          maxHeight: "0px",
          overflow: "hidden",
          transition: "max-height 0.3s ease-in-out",
        },
        "& .pro-sub-menu.open .pro-inner-list-item": { maxHeight: "500px" },
        "& .active-submenu": { backgroundColor: colors.menu[3] },
        "& .pro-sidebar.collapsed .pro-arrow-wrapper": {
          display: "none !important",
        },
      }}
    >
      <ProSidebar collapsed={colapsado}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setColapsado(!colapsado)}
            icon={
              colapsado ? (
                <MenuOutlinedIcon sx={{ color: colors.primario[4] }} />
              ) : undefined
            }
            style={{ margin: "10px 0 20px 0" }}
          >
            {!colapsado && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img src="/logoAltertex.svg" style={{ width: "150px" }} />
                <IconButton onClick={() => setColapsado(!colapsado)}>
                  <MenuOutlinedIcon sx={{ color: colors.primario[4] }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box>
            <ElementoMenu
              titulo="Inicio"
              ruta="/"
              icono={<HomeOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <SubMenu
              title="Empleados"
              icon={<GroupsOutlinedIcon />}
              open={colapsado ? false : empleadosAbierto}
              onOpenChange={() => setEmpleadosAbierto(!empleadosAbierto)}
            >
              <ElementoMenu
                titulo="Lista de Empleados"
                ruta="/empleados"
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
              <ElementoMenu
                titulo="Grupos de Empleados"
                ruta="/grupoEmpleados"
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
            </SubMenu>
            <SubMenu
              title="Productos"
              icon={<LocalOfferOutlinedIcon />}
              open={colapsado ? false : productosAbierto}
              onOpenChange={() => setProductosAbierto(!productosAbierto)}
            >
              <ElementoMenu
                titulo="Lista de Productos"
                ruta="/productos"
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
              <ElementoMenu
                titulo="Sets de Productos"
                ruta="/setsProductos"
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
              <ElementoMenu
                titulo="Categorías"
                ruta="/categorias"
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
            </SubMenu>
            <ElementoMenu
              titulo="Pedidos"
              ruta="/pedidos"
              icono={<InboxOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ElementoMenu
              titulo="Cuotas"
              ruta="/cuotas"
              icono={<CurrencyExchangeOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ElementoMenu
              titulo="Eventos"
              ruta="/eventos"
              icono={<EditCalendarOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ElementoMenu
              titulo="Configuración"
              ruta="/configuracion"
              icono={<SettingsOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
          </Box>
        </Menu>
        <Box position="relative" height="200px">
          <Box
            display="flex"
            justifyContent="center"
            gap={10}
            alignItems="center"
            position="absolute"
            bottom={1}
            width="100%"
          >
            <TemaIcono />
            <LogoutOutlinedIcon />
          </Box>
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default BarraLateral;
