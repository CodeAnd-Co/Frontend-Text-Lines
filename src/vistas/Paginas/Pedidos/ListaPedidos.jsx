import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import Tabla from '../../Componentes/Organismos/Tabla';
import Alerta from '../../Componentes/moleculas/Alerta';
import ModalEliminarPedido from '../../Componentes/organismos/ModalEliminarPedido';
import { tokens } from '../../../theme';
import { useConsultarPedidos } from '../../../hooks/Pedidos/useConsultarPedidos';

const ListaPedidos = () => {
  const { pedidos, cargando, error, recargar } = useConsultarPedidos();
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsPedido, setIdsPedido] = useState([]);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Estado para controlar la visualización del modal eliminar
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

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
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: () => console.log('Añadir'),
    },
    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[3],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.size === 0 || seleccionados.ids.size === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un pedido para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsPedido(Array.from(seleccionados.ids));
          setOpenModalEliminar(true);
        }
      },
      color: 'error',
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
    <>
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
            <Tabla
              columns={columnas}
              rows={filas}
              checkboxSelection
              onRowSelectionModelChange={(newSelection) => {
                setSeleccionados(newSelection);
              }}
            />
          )}
        </Box>
      </ContenedorLista>
      <ModalEliminarPedido
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsPedido={idsPedido}
        setAlerta={setAlerta}
        refrescarPagina={recargar}
      />
      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={2500}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
};

export default ListaPedidos;
