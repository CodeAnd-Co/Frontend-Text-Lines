import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import ContenedorLista from '@SRC/Vistas/Componentes/Organismos/ContenedorLista';
import Tabla from '@SRC/Vistas/Componentes/Organismos/Tabla';
import { useConsultarPedidos } from '@Hooks/Pedidos/useConsultarPedidos';
import { tokens } from '@SRC/theme';

const ListaPedidos = () => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { pedidos, cargando, error } = useConsultarPedidos();
  const columnas = [
    {
      field: 'pedido',
      headerName: 'Pedido ID',
      flex: 1,
    },
    {
      field: 'nombreEmpleado',
      headerName: 'Empleado',
      flex: 1,
    },
    {
      field: 'fechaOrden',
      headerName: 'Fecha',
      flex: 1,
    },
    {
      field: 'estatusPedido',
      headerName: 'Estatus',
      flex: 1,
    },
    {
      field: 'precioTotal',
      headerName: 'Precio Total',
      flex: 1,
    },
    {
      field: 'estatusPago',
      headerName: 'Pago',
      flex: 1,
    },
    {
      field: 'estatusEnvio',
      headerName: 'Envio',
      flex: 1,
    },
  ];

  const botones = [
    {
      label: 'Añadir',
      onClick: () => console.log('Añadir'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      size: 'large',
    },
    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar'),
      size: 'large',
    },
    {
      label: 'Eliminar',
      onClick: () => console.log('Eliminar'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  const filas = pedidos.map((pedidos) => ({
    id: pedidos.idPedido,
    pedido: pedidos.idPedido,
    nombreEmpleado: pedidos.nombreEmpleado,
    fechaOrden: new Date(pedidos.fechaOrden).toISOString().split('T')[0],
    estatusPedido: pedidos.estatusPedido,
    precioTotal: pedidos.precioTotal,
    estatusPago: pedidos.estatusPago,
    estatusEnvio: pedidos.estatusEnvio,
  }));

  return (
    <ContenedorLista
      titulo='Pedidos'
      descripcion='Gestiona y organiza los pedidos registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        {cargando ? (
          <Box display='flex' justifyContent='center' py={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color='error' align='center'>
            {error}
          </Typography>
        ) : (
          <Tabla columns={columnas} rows={filas} checkboxSelection />
        )}
      </Box>
    </ContenedorLista>
  );
};

export default ListaPedidos;
