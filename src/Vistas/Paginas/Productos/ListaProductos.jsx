//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
//RF[30] Elimina Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
import { Box, useTheme } from '@mui/material';
import { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import Alerta from '@Moleculas/Alerta';
import PopUp from '@Moleculas/PopUp';
import { useConsultarProductos } from '@Hooks/Productos/useConsultarProductos';
import { useEliminarProductos } from '@Hooks/Productos/useEliminarProductos';
import { tokens } from '@SRC/theme';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';

const ListaProductos = () => {
  const { productos, cargando, error, recargar } = useConsultarProductos();
  const { eliminar } = useEliminarProductos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { usuario } = useAuth();
  const MENSAJE_POPUP_ELIMINAR
    = '¿Estás seguro de que deseas eliminar los productos seleccionados? Esta acción no se puede deshacer.';

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [openModalEliminar, setAbrirPopUp] = useState(false);

  const manejarCancelarEliminar = () => {
    setAbrirPopUp(false);
  };

  const manejarConfirmarEliminar = async () => {
    try {
      const urlsImagenes = productos
      .filter((p) => productosSeleccionados.includes(p.idProducto))
      .map((p) => p.urlImagen);
      
      
      await eliminar(productosSeleccionados, urlsImagenes);
      recargar();
      setAlerta({
        tipo: 'success',
        mensaje: 'Productos eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setProductosSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los productos.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUp(false);
    }
  };

  const columnas = [
    {
      field: 'imagen',
      headerName: 'Imagen',
      flex: 0.5,
      renderCell: (params) => (
        <img
          src={params.row.urlImagen}
          alt='Producto'
          style={{ width: 50, height: 50, objectFit: 'cover' }}
        />
      ),
    },
    {
      field: 'nombreComun',
      headerName: 'Nombre',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'precioVenta',
      headerName: 'Precio Venta',
      type: 'number',
      flex: 0.7,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'estado',
      headerName: 'Disponibilidad en stock',
      flex: 1,
      cellClassName: 'estado-row--cell',
      renderCell: ({ row: { estado } }) => (
        <Box
          width='110px'
          height='50%'
          m='10px auto'
          p='15px'
          display='flex'
          justifyContent='center'
          alignItems='center'
          color={estado === 1 ? colores.primario[4] : colores.texto[1]}
          backgroundColor={estado === 1 ? colores.altertex[1] : colores.acciones[1]}
          borderRadius='4px'
        >
          {estado === 1 ? 'Disponible' : 'No disponible'}
        </Box>
      ),
    },
  ];

  const filas = productos.map((prod) => ({
    id: prod.idProducto,
    nombreComun: prod.nombreComun,
    precioVenta: prod.precioVenta,
    estado: prod.estado,
    urlImagen: prod.urlImagen,
  }));

  const botones = [
    {
      label: 'Añadir',
      onClick: () => console.log('Añadir'),
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
    },
    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (productosSeleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un producto para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUp(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_PRODUCTO),
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Lista de Productos'
        descripcion='Gestiona y organiza los productos registrados en el sistema.'
        informacionBotones={botones}
      >
        <Box width='100%'>
          {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
            rowHeight={80}
            onRowSelectionModelChange={(nuevosIds) => {
              const ids = Array.isArray(nuevosIds) ? nuevosIds : Array.from(nuevosIds?.ids || []);
              setProductosSeleccionados(ids);
            }}
          />
        </Box>
      </ContenedorLista>

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

      <PopUp
        abrir={openModalEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />
    </>
  );
};

export default ListaProductos;
