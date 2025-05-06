//RF37 - Consulta Lista de Eventos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37
import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useEventoId } from '@Hooks/Eventos/useLeerEvento';
import { useConsultarEventos } from '@Hooks/Eventos/useConsultarEventos';
import { useMode, tokens } from '@SRC/theme';

const ListaEventos = () => {
  const [theme] = useMode();
  const colores = tokens(theme.palette.mode);
  const { eventos, cargando, error } = useConsultarEventos();
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const {
    evento,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useEventoId(eventoSeleccionado ? eventoSeleccionado.id : null);
  console.log('Eventos:', eventos); // Para depuración

  /*   const manejarSeleccionEventos = (seleccionados) => {   Funcion no implementada, parte de la eliminación de eventos
    // seleccionados: { type: 'include', ids: Set }
    const ids = Array.from(seleccionados.ids || []);
    const roles = new Set();

    ids.forEach((id) => {
      const fila = rows.find((row) => row.id === id);
      if (fila && fila.rol) {
        roles.add(fila.rol);
      }
    });

    manejarSeleccion({
      ids: new Set(ids),
      rol: roles,
    });
  }; */

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
      onClick: () => console.log('Añadir'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    { variant: 'outlined', label: 'Editar', onClick: () => console.log('Editar'), size: 'large' },
    {
      label: 'Eliminar',
      onClick: () => console.log('Eliminar'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <ContenedorLista
      titulo='Lista de Eventos'
      descripcion='Consulta y administra los eventos registrados en el sistema.'
      informacionBotones={botones}
    >
      {modalAbierto && (
        <ModalFlotante
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onConfirm={() => console.log('Confirmar')}
          titulo={evento?.nombre || 'Cargando...'}
          tituloVariant='h4'
          botones={[
            {
              label: 'EDITAR',
              variant: 'outlined',
              onClick: () => console.log('Editar Evento'),
              outlineColor: colores.altertex[1],
            },
            {
              label: 'SALIR',
              variant: 'contained',
              onClick: () => setModalAbierto(false),
              backgroundColor: colores.altertex[1],
            },
          ]}
        ></ModalFlotante>
      )}

      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla
          columns={columnas}
          rows={filas}
          loading={cargando}
          checkboxSelection
          //onRowSelectionModelChange={manejarSeleccionEventos}
          onRowClick={(params) => {
            setEventoSeleccionado(params.row);
            setModalAbierto(true);
          }}
        />
      </Box>
    </ContenedorLista>
  );
};

export default ListaEventos;
