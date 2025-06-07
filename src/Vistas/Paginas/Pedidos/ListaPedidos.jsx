// RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
// RF53 Elimina Pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import ContenedorLista from '@Organismos/ContenedorLista';
import Tabla from '@Organismos/Tabla';
import Alerta from '@Moleculas/Alerta';
import PopUp from '@Moleculas/PopUp';
import Boton from '@Atomos/Boton';
import ModalEditarPedido from '@Organismos/ModalEditarPedido';
import { tokens } from '@SRC/theme';
import { useConsultarPedidos } from '@Hooks/Pedidos/useConsultarPedidos';
import { useEliminarPedido } from '@Hooks/Pedidos/useEliminarPedido';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useAuth } from '@Hooks/AuthProvider';

const ListaPedidos = () => {
  const { pedidos, cargando, error, recargar } = useConsultarPedidos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const MENSAJE_POPUP_ELIMINAR = '¿Estás seguro de que deseas eliminar los pedidos seleccionados?';

  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const { eliminar } = useEliminarPedido();

  const { usuario } = useAuth();

  // 🆕 Estados para actualizar pedido
  const [modalAbierto, setModalAbierto] = useState(false);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);

  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };

  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(seleccionados);
      await recargar();
      setAlerta({
        tipo: 'success',
        mensaje: 'Pedidos eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los pedidos.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUpEliminar(false);
    }
  };

  const [abrirPopUpEliminar, setAbrirPopUpEliminar] = useState(false);

  // 🆕 Funciones para editar pedido
  const abrirModalEditar = (pedido) => {
    console.log('Fila seleccionada:', pedido);
    setPedidoSeleccionado(pedido);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setPedidoSeleccionado(null);
    setModalAbierto(false);
  };

  const mostrarAlerta = (mensaje, tipo) => {
    setAlerta({
      tipo,
      mensaje,
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
    setTimeout(() => setAlerta(null), 3000);
  };

  const columnas = [
    { field: 'pedido', headerName: 'Pedido ID', flex: 1 },
    { field: 'nombreEmpleado', headerName: 'Empleado', flex: 1 },
    { field: 'fechaOrden', headerName: 'Fecha', flex: 1 },
    { field: 'estatusPedido', headerName: 'Estatus', flex: 1 },
    { field: 'precioTotal', headerName: 'Precio Total', flex: 1 },
    { field: 'estatusPago', headerName: 'Pago', flex: 1 },
    { field: 'estatusEnvio', headerName: 'Envio', flex: 1 },
    
  ];

  const botones = [
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.length === 0 || seleccionados.size === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un pedido para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUpEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_PEDIDO),
      size: 'large',
      color: 'error',
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
              disableRowSelectionOnClick={true}
              checkboxSelection
              onRowClick={({ row }) => abrirModalEditar(row)}
              onRowSelectionModelChange={(seleccion) => {
                const ids = Array.isArray(seleccion)
                  ? seleccion
                  : Array.from(seleccion?.ids || []);
                setSeleccionados(ids);
              }}
            />
          )}
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
        abrir={abrirPopUpEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />

      {/* 🆕 Modal Editar Pedido */}
      <ModalEditarPedido
        abierto={modalAbierto}
        onCerrar={cerrarModal}
        datosIniciales={pedidoSeleccionado}
        onActualizar={recargar}
        onMostrarAlerta={mostrarAlerta}
      />
    </>
  );
};

export default ListaPedidos;