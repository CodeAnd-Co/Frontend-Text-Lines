// RF60 - Consulta Lista de Pedidos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF60
// RF53 Elimina Pedido - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF63]

import React, { useState } from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import ContenedorLista from '@Organismos/ContenedorLista';
import Tabla from '@Organismos/Tabla';
import Alerta from '@Moleculas/Alerta';
import PopUp from '@Moleculas/PopUp';
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

  // Estado para controlar la visualización del modal eliminar
  const [openModalEliminar, setAbrirPopUpEliminar] = useState(false);
  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };
  const { usuario } = useAuth();
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
      color: 'error',
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
        if (seleccionados.length === 0) {
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
      color: 'error',
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_GRUPO_EMPLEADOS),
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
              onRowSelectionModelChange={(seleccionados) => {
                const ids = Array.isArray(seleccionados)
                  ? seleccionados
                  : Array.from(seleccionados?.ids || []);
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

export default ListaPedidos;
