// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]
// RF37 - Consulta Lista de Eventos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37
// RF38 - Leer Evento - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38

import React, { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import Alerta from '@Moleculas/Alerta';
import PopUp from '@Moleculas/PopUp';
import { Box, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import ModalCrearEvento from '@Organismos/Eventos/ModalCrearEvento';
import { useEventoId } from '@Hooks/Eventos/useLeerEvento';
import { useConsultarEventos } from '@Hooks/Eventos/useConsultarEventos';
import InfoEvento from '@Moleculas/EventoInfo';
import { tokens } from '@SRC/theme';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useAuth } from '@Hooks/AuthProvider';
import { useEliminarEvento } from '@Hooks/Eventos/useEliminarEvento';
import { useCrearEvento } from '@SRC/hooks/Eventos/useCrearEvento';

const ListaEventos = () => {
  const { eventos, cargando, error, recargar } = useConsultarEventos();
  const { crear } = useCrearEvento();
  const { eliminar } = useEliminarEvento();
  const { usuario } = useAuth();

  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const MENSAJE_POPUP_ELIMINAR = '¿Estás seguro de que deseas eliminar los eventos seleccionados?';

  const [seleccionados, setSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [abrirCrear, setAbrirCrear] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);

  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const { evento } = useEventoId(eventoSeleccionado ? eventoSeleccionado.id : null);

  const manejarAbrirCrear = () => {
    setAbrirCrear(true);
  };
  const manejarCancelarCrear = () => {
    setAbrirCrear(false);
  };

  const manejarConfirmarCrear = async (evento) => {
    try {
      await crear(evento);
      if (typeof recargar === 'function') await recargar();
      setAlerta({
        tipo: 'success',
        mensaje: 'Evento creado correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setAbrirCrear(false);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al crear el evento.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      
    }
  };

  const manejarCancelarEliminar = () => {
    setAbrirEliminar(false);
  };

  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(seleccionados);
      if (typeof recargar === 'function') await recargar();
      setAlerta({
        tipo: 'success',
        mensaje: 'Eventos eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los eventos.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirEliminar(false);
    }
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 2 },
    { field: 'puntos', headerName: 'Puntos', flex: 1 },
    { field: 'periodo', headerName: 'Periodo', flex: 1 },
    { field: 'renovacion', headerName: 'Renovación', flex: 1 },
  ];

  const filas = (eventos || []).map((evento) => ({
    id: evento.idEvento,
    nombre: evento.nombre,
    descripcion: evento.descripcion,
    puntos: evento.puntos,
    periodo: evento.periodo,
    renovacion: evento.renovacion === 1 ? 'Si' : 'No',
  }));

  const botones = [
    {
      label: 'Añadir',
      //variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: manejarAbrirCrear,
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un evento para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_EVENTO),
      size: 'large',
      color: 'error',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Lista de Eventos'
        descripcion='Consulta y administra los eventos registrados en el sistema.'
        informacionBotones={botones}
      >
        <Box width='100%' mt='20px'>
          {error && (
            <Box mb={2}>
              <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />
            </Box>
          )}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            disableRowSelectionOnClick={true}
            checkboxSelection
            onRowSelectionModelChange={(selectionModel) => {
              const ids = Array.isArray(selectionModel)
                ? selectionModel
                : Array.from(selectionModel?.ids || []);
              setSeleccionados(ids);
            }}
            selectionModel={seleccionados}
            onRowClick={(params) => {
              setEventoSeleccionado(params.row);
              setModalAbierto(true);
            }}
          />
        </Box>
      </ContenedorLista>

      {/* Modal para mostrar los detalles del evento */}
      {modalAbierto && eventoSeleccionado && (
        <ModalFlotante
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onConfirm={() => setModalAbierto(false)}
          titulo={evento?.nombre || eventoSeleccionado.nombre || 'Cargando...'}
          tituloVariant='h4'
          botones={[
            {
              label: 'EDITAR',
              variant: 'contained',
              color: 'error',
              backgroundColor: colores.altertex[1],
              onClick: () => console.log('Editar Evento'),
              disabled: true, //disabled: !!errorDetalle,
            },
            {
              label: 'SALIR',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[1],
              onClick: () => setModalAbierto(false),
            },
          ]}
        >
          <InfoEvento
            nombre={eventoSeleccionado.nombre}
            descripcion={eventoSeleccionado.descripcion}
            puntos={eventoSeleccionado.puntos}
            periodoRenovacion={eventoSeleccionado.periodo}
            renovacion={eventoSeleccionado.renovacion}
          />
        </ModalFlotante>
      )}

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
        abrir={abrirEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />
      <ModalCrearEvento
        abierto={abrirCrear}
        onCerrar={manejarCancelarCrear}
        onCreado={manejarConfirmarCrear}
      />
    </>
  );
};

export default ListaEventos;
