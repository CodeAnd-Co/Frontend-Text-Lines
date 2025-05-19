import 'react-pro-sidebar/dist/css/styles.css';
import { useState, React } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { tokens } from '@SRC/theme';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import Icono from '@Atomos/Icono';
import TemaIcono from '@Moleculas/TemaIcono';
import IconoMenu from '@Atomos/iconoMenu';
import TextoMenu from '@Atomos/textoMenu';
import { useAuth } from '@Hooks/AuthProvider';
import { RUTAS } from '@Constantes/rutas';

const ElementoMenu = ({ titulo, ruta, icono, seleccionado, setSeleccionado }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ padding: '0px 8px' }}>
      <MenuItem
        active={seleccionado === titulo}
        onClick={() => setSeleccionado(titulo)}
        icon={<IconoMenu icono={icono} />}
        style={{ color: colors.primario[4] }}
      >
        <Link to={ruta} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
          <TextoMenu>{titulo}</TextoMenu>
        </Link>
      </MenuItem>
    </Box>
  );
};

const BarraLateral = () => {
  const theme = useTheme();
  const { nombreUsuario } = useAuth();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [colapsado] = useState(false); // TODO setColapsado
  const [seleccionado, setSeleccionado] = useState('Inicio');
  const [productosAbierto, setProductosAbierto] = useState(false);
  const [empleadosAbierto, setEmpleadosAbierto] = useState(false);
  const redirigirAInicio = () => {
    navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE, { replace: true });
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
            // onClick={() => setColapsado(!colapsado)}
            icon={colapsado ? <MenuOutlinedIcon sx={{ color: colors.primario[4] }} /> : undefined}
            style={{ margin: '10px 0 20px 0' }}
          >
            {!colapsado && (
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                ml='15px'
                onClick={redirigirAInicio}
              >
                <img src='/logoAltertexDark.svg' style={{ width: '150px' }} />
              </Box>
            )}
          </MenuItem>
          <Box>
            {nombreUsuario && (
              <Box sx={{ 
                padding: '0px 20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: colors.menu[3],
                    padding: '16px 20px', 
                    color: colors.primario[4],
                    borderRadius: '16px', 
                    boxShadow: 'inset 0px 0px 6px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Box 
                    sx={{ 
                      marginRight: '17px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <AccountCircleOutlinedIcon />
                  </Box>
                  <TextoMenu>{nombreUsuario}</TextoMenu>
                </Box>
              </Box>
              )}
            <ElementoMenu
              titulo='Tablero'
              ruta={RUTAS.SISTEMA_ADMINISTRATIVO.BASE + RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO}
              icono={<HomeOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <SubMenu
              title={<span style={{ color: 'white' }}>Empleados</span>}
              icon={<GroupsOutlinedIcon sx={{ color: 'white' }} />}
              open={colapsado ? false : empleadosAbierto}
              onOpenChange={() => setEmpleadosAbierto(!empleadosAbierto)}
            >
              <ElementoMenu
                titulo='Lista de Empleados'
                ruta={
                  RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                  RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                  RUTAS.SISTEMA_ADMINISTRATIVO.EMPLEADOS.CONSULTAR_EMPLEADOS
                }
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
              <ElementoMenu
                titulo='Grupos de Empleados'
                ruta={
                  RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                  RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                  RUTAS.SISTEMA_ADMINISTRATIVO.EMPLEADOS.CONSULTAR_GRUPOS
                }
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
            </SubMenu>
            <SubMenu
              title={<span style={{ color: 'white' }}>Productos</span>}
              icon={<LocalOfferOutlinedIcon sx={{ color: 'white' }} />}
              open={colapsado ? false : productosAbierto}
              onOpenChange={() => setProductosAbierto(!productosAbierto)}
            >
              <ElementoMenu
                titulo='Lista de Productos'
                ruta={
                  RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                  RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                  RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_PRODUCTOS
                }
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
              <ElementoMenu
                titulo='Sets de Productos'
                ruta={
                  RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                  RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                  RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_SETS_PRODUCTOS
                }
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
              <ElementoMenu
                titulo='Categorías'
                ruta={
                  RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                  RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                  RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS.CONSULTAR_CATEGORIAS
                }
                seleccionado={seleccionado}
                setSeleccionado={setSeleccionado}
              />
            </SubMenu>
            <ElementoMenu
              titulo='Pedidos'
              ruta={RUTAS.SISTEMA_ADMINISTRATIVO.PEDIDOS.CONSULTAR_PEDIDOS}
              icono={<InboxOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ElementoMenu
              titulo='Cuotas'
              ruta={
                RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.BASE
              }
              icono={<CurrencyExchangeOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ElementoMenu
              titulo='Eventos'
              ruta={
                RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                RUTAS.SISTEMA_ADMINISTRATIVO.EVENTOS.CONSULTAR_EVENTOS
              }
              icono={<EditCalendarOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
            <ElementoMenu
              titulo='Configuración'
              ruta={
                RUTAS.SISTEMA_ADMINISTRATIVO.BASE +
                RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO +
                RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION
              }
              icono={<SettingsOutlinedIcon />}
              seleccionado={seleccionado}
              setSeleccionado={setSeleccionado}
            />
          </Box>
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <Box position='relative' height='200px' marginBottom={2}>
          <Box
            display='flex'
            justifyContent='center'
            gap={10}
            alignItems='center'
            position='absolute'
            bottom={1}
            width='100%'
          >
            <TemaIcono />
            <Icono
              nombre='HomeOutlined'
              color='#fff'
              clickable={true}
              tooltip='Volver a Clientes'
              onClick={() => navigate(RUTAS.SISTEMA_ADMINISTRATIVO.BASE)}
            />
          </Box>
        </Box>
      </ProSidebar>
    </Box>
  );
};

export default BarraLateral;
