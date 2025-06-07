//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
//RF[27] Consulta Lista de Productos - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF27]
//RF[30] Elimina Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF30]
//RF[58] - Exportar Productos - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF58]

import { Box, useTheme, Chip } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import Alerta from '@Moleculas/Alerta';
import PopUp from '@Moleculas/PopUp';
import FormularioProducto from '@Organismos/Formularios/FormularioProducto';
import FormularioActualizarProducto from '@Organismos/Formularios/FormularioActualizarProducto';
import FormularioProveedor from '@Organismos/Formularios/FormularioProveedor';
import { useConsultarProductos } from '@Hooks/Productos/useConsultarProductos';
import { useEliminarProductos } from '@Hooks/Productos/useEliminarProductos';
import { tokens } from '@SRC/theme';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Constantes/permisos';
import ModalFlotante from '@Organismos/ModalFlotante.jsx';
import InfoProducto from '@Moleculas/InfoProducto.jsx';
import { useLeerProducto } from '@Hooks/Productos/useLeerProducto.js';
import useExportarProductos from '@Hooks/Productos/useExportarProductos';

const ListaProductos = () => {
  const { productos, cargando, error, recargar } = useConsultarProductos();
  const { eliminar } = useEliminarProductos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { usuario } = useAuth();

  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productoDetalleSeleccionado, setProductoDetalleSeleccionado] = useState(null);
  const [mostrarModalProveedor, setMostrarModalProveedor] = useState(false);
  const [mostrarModalProducto, setMostrarModalProducto] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [openModalEliminar, setAbrirPopUp] = useState(false);
  const [abrirModalDetalle, setAbrirModalDetalle] = useState(false);
  const [imagenProducto, setImagenProducto] = useState('');
  const [mostrarModalActualizarProducto, setMostrarModalActualizarProducto] = useState(false);
  const [openModalExportar, setAbrirPopUpExportar] = useState(false);
  const MENSAJE_POPUP_EXPORTAR
    = '¿Deseas exportar la lista de productos? El archivo será generado en formato .xlsx';
  const manejarCancelarExportar = () => {
    setAbrirPopUpExportar(false);
  };

  const manejarConfirmarExportar = async () => {
    if (productosSeleccionados.length === 0) {
      setAlerta({
        tipo: 'warning',
        mensaje: 'Selecciona al menos un producto para exportar.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      return;
    }

    await exportar(productosSeleccionados);
    setAbrirPopUpExportar(false);
  };

  const { exportar, error: errorExportar, mensaje } = useExportarProductos();

  useEffect(() => {
    if (errorExportar) {
      setAlerta({
        tipo: 'error',
        mensaje: errorExportar,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    }
  }, [errorExportar]);

  useEffect(() => {
    if (mensaje) {
      setAlerta({
        tipo: 'success',
        mensaje,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    }
  }, [mensaje]);

  const {
    detalleProducto,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useLeerProducto(productoDetalleSeleccionado);

  // Efecto: cuando se cierre el modal, se limpia el producto seleccionado
  useEffect(() => {
    if (!abrirModalDetalle) {
      setProductoDetalleSeleccionado(null);
    }
  }, [abrirModalDetalle]);

  const mostrarFormularioProducto = useCallback(() => {
    setMostrarModalProducto(true);
    setMostrarModalProveedor(false);
  }, []);

  const mostrarFormularioActualizarProducto = useCallback(() => {
    setMostrarModalActualizarProducto(true);
  }, []);

  const mostrarFormularioProveedor = useCallback(() => {
    setMostrarModalProducto(false);
    setMostrarModalProveedor(true);
  }, []);

  const cerrarFormularioProducto = useCallback(() => {
    setMostrarModalProducto(false);
    recargar();
  }, [recargar]);

  const cerrarFormularioProveedor = useCallback(() => {
    setMostrarModalProveedor(false);
    setMostrarModalProducto(true);
  }, []);

  const manejarCancelarEliminar = () => {
    setAbrirPopUp(false);
  };
  const manejarConfirmarEliminar = async () => {
    try {
      const urlsImagenes = productos
        .filter((pro) => productosSeleccionados.includes(pro.idProducto))
        .map((pro) => pro.urlImagen);

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
        <Chip
          label={estado === 1 ? 'Disponible' : 'No disponible'}
          variant='filled'
          color={estado === 1 ? 'primary' : undefined}
          size='medium'
          shape='cuadrada'
          backgroundColor={estado === 1 ? undefined : '#f0f0f0'}
          textColor={estado === 1 ? undefined : '#000000'}
        />
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
      onClick: mostrarFormularioProducto,
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      label: 'Importar',
      onClick: () => console.log('Importar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
      construccion: true,
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => setAbrirPopUpExportar(true),
      color: 'primary',
      outlineColor: colores.altertex[1],
      size: 'large',
      disabled: !usuario?.permisos?.includes(PERMISOS.EXPORTAR_PRODUCTOS),
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
        {mostrarModalProducto && (
          <FormularioProducto
            formularioAbierto={mostrarModalProducto}
            alCerrarFormularioProducto={cerrarFormularioProducto}
            alMostrarFormularioProveedor={mostrarFormularioProveedor}
          />
        )}

        {mostrarModalActualizarProducto && (
          <FormularioActualizarProducto
            formularioAbierto={mostrarModalActualizarProducto}
            alCerrarFormularioProducto={cerrarFormularioProducto}
            detalleProducto={detalleProducto}
          />
        )}

        {mostrarModalProveedor && (
          <FormularioProveedor
            formularioAbierto={mostrarModalProveedor}
            alCerrarFormularioProveedor={cerrarFormularioProveedor}
          />
        )}
        <Box width='100%'>
          {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            disableRowSelectionOnClick={true}
            checkboxSelection
            rowHeight={80}
            onRowSelectionModelChange={(nuevosIds) => {
              const ids = (
                Array.isArray(nuevosIds) ? nuevosIds : Array.from(nuevosIds?.ids || [])
              ).map((id) => parseInt(id));
              setProductosSeleccionados(ids);
            }}
            onRowClick={(parametros) => {
              setProductoDetalleSeleccionado(parametros.row.id);
              setImagenProducto(parametros.row.urlImagen);
              setAbrirModalDetalle(true);
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
          duracion={3000}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}

      <PopUp
        abrir={openModalEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo='¿Estás seguro de que deseas eliminar los productos seleccionados? Esta acción no se puede deshacer.'
      />

      <PopUp
        abrir={openModalExportar}
        cerrar={manejarCancelarExportar}
        confirmar={manejarConfirmarExportar}
        dialogo={MENSAJE_POPUP_EXPORTAR}
        labelCancelar='Cancelar'
        labelConfirmar='Confirmar'
        disabledConfirmar={cargando}
      />

      {abrirModalDetalle && (
        <ModalFlotante
          open={abrirModalDetalle}
          onClose={() => setAbrirModalDetalle(false)}
          titulo={detalleProducto?.nombreComun || 'Cargando...'}
          tituloVariant='h4'
          customWidth={750}
          botones={[
            {
              label: 'Editar',
              variant: 'contained',
              color: 'primary',
              backgroundColor: colores.altertex[1],
              onClick: mostrarFormularioActualizarProducto,
              disabled: !usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_PRODUCTO),
            },
            {
              label: 'Salir',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[1],
              onClick: () => setAbrirModalDetalle(false),
            },
          ]}
        >
          {cargandoDetalle ? (
            <p>Cargando información del producto...</p>
          ) : errorDetalle ? (
            <p>Error al cargar la información del producto: {errorDetalle}</p>
          ) : (
            <InfoProducto detalleProducto={detalleProducto} imagenProducto={imagenProducto} />
          )}
        </ModalFlotante>
      )}
    </>
  );
};

export default ListaProductos;
