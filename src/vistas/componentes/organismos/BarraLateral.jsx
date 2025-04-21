import { useState, useContext } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Tooltip, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { ColorModeContext, tokens } from '../../../theme';
import {
  MenuOutlined as MenuOutlinedIcon,
  HomeOutlined as HomeOutlinedIcon,
  GroupsOutlined as GroupsOutlinedIcon,
  InboxOutlined as InboxOutlinedIcon,
  SettingsOutlined as SettingsOutlinedIcon,
  LocalOfferOutlined as LocalOfferOutlinedIcon,
  CurrencyExchangeOutlined as CurrencyExchangeOutlinedIcon,
  EditCalendarOutlined as EditCalendarOutlinedIcon,
  LogoutOutlined as LogoutOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
} from '@mui/icons-material';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const ItemMenu = ({ titulo, ruta, icono, seleccionado, setSeleccionado }) => (
  <MenuItem
    active={seleccionado === titulo}
    onClick={() => setSeleccionado(titulo)}
    icon={icono}
    component={<Link to={ruta} />}
  >
    {titulo}
  </MenuItem>
);

const BarraLateral = () => {
  const [colapsado, setColapsado] = useState(false);
  const [seleccionado, setSeleccionado] = useState('Inicio');
  const [productosAbierto, setProductosAbierto] = useState(false);
  const [empleadosAbierto, setEmpleadosAbierto] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const handleExit = () => {
    navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
  };

  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': { background: colors.menu[1] },
        '& .pro-icon-wrapper': { backgroundColor: 'transparent !important' },
        '& .pro-inner-item:hover': { color: '#ffffff !important' },
        '& .pro-menu-item.active, .pro-sub-menu-item.active': {
          backgroundColor: colors.menu[3],
        },
        '& .pro-sub-menu': {
          padding: '0px 0px 0px 8px !important',
          transition: 'padding 0.3s ease-in-out',
        },
        '& .pro-sub-menu .pro-inner-list-item': {
          padding: '0px 0px 0px 33px !important',
          maxHeight: '0px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out',
        },
        '& .pro-sub-menu.open .pro-inner-list-item': { maxHeight: '500px' },
        '& .active-submenu': { backgroundColor: colors.menu[3] },
        '& .pro-sidebar.collapsed .pro-arrow-wrapper': {
          display: 'none !important',
        },
      }}
    >
      <ProSidebar collapsed={colapsado}>
        <Menu iconShape='square'>
          <MenuItem
            onClick={() => setColapsado(!colapsado)}
            icon={colapsado ? <MenuOutlinedIcon sx={{ color: colors.primario[4] }} /> : undefined}
            style={{ margin: '10px 0 20px 0' }}
          >
            {!colapsado && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <img src='/logoAltertex.svg' style={{ width: '150px' }} />
                <IconButton onClick={() => setColapsado(!colapsado)}>
                  <MenuOutlinedIcon sx={{ color: colors.primario[4] }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <ItemMenu
            titulo='Inicio'
            ruta='/'
            icono={<HomeOutlinedIcon />}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
          />

          <SubMenu
            title='Empleados'
            icon={<GroupsOutlinedIcon />}
            open={!colapsado && empleadosAbierto}
            onOpenChange={() => setEmpleadosAbierto(!empleadosAbierto)}
          >
            <ItemMenu
              titulo='Lista de Empleados'
              ruta='/empleados'
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ItemMenu
              titulo='Grupos de Empleados'
              ruta='/grupoEmpleados'
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
          </SubMenu>

          <SubMenu
            title='Productos'
            icon={<LocalOfferOutlinedIcon />}
            open={!colapsado && productosAbierto}
            onOpenChange={() => setProductosAbierto(!productosAbierto)}
          >
            <ItemMenu
              titulo='Lista de Productos'
              ruta='/productos'
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ItemMenu
              titulo='Sets de Productos'
              ruta='/setsProductos'
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ItemMenu
              titulo='Categorías'
              ruta='/categorias'
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
          </SubMenu>

          <ItemMenu
            titulo='Pedidos'
            ruta='/pedidos'
            icono={<InboxOutlinedIcon />}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
          />
          <ItemMenu
            titulo='Cuotas'
            ruta='/cuotas'
            icono={<CurrencyExchangeOutlinedIcon />}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
          />
          <ItemMenu
            titulo='Eventos'
            ruta='/eventos'
            icono={<EditCalendarOutlinedIcon />}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
          />
          <ItemMenu
            titulo='Configuración'
            ruta='/configuracion'
            icono={<SettingsOutlinedIcon />}
            seleccionado={seleccionado}
            setSeleccionado={setSeleccionado}
          />
        </Menu>

        <Box position='relative' height='200px'>
          <Box
            display='flex'
            justifyContent='center'
            gap={2}
            alignItems='center'
            position='absolute'
            bottom={1}
            width='100%'
          >
            <Tooltip title='Cambiar tema'>
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === 'dark' ? (
                  <LightModeOutlinedIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title='Salir del tablero'>
              <IconButton onClick={handleExit} color='error'>
                <LogoutOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default BarraLateral;
