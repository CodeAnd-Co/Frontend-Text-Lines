//RF37 - Consulta Lista de Eventos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37
//RF38 - Leer Evento - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF38

import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useEventoId } from '@Hooks/Eventos/useLeerEvento';
import { useConsultarEventos } from '@Hooks/Eventos/useConsultarEventos';
import InfoEvento from '@Moleculas/EventoInfo';
import { tokens } from '@SRC/theme';

const ListaEventos = () => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { eventos, cargando, error } = useConsultarEventos();
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const { evento } = useEventoId(eventoSeleccionado ? eventoSeleccionado.id : null);

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
      //onClick: () => console.log('Añadir'),
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
    {
      variant: 'outlined',
      label: 'Editar',
      //onClick: () => console.log('Editar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
    },
    {
      label: 'Eliminar',
      onClick: () => console.log('Eliminar'),
      size: 'large',
      color: 'error',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <ContenedorLista
      titulo='Lista de Eventos'
      descripcion='Consulta y administra los eventos registrados en el sistema.'
      informacionBotones={botones}
    >
      {modalAbierto && eventoSeleccionado && (
        <ModalFlotante
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onConfirm={() => setModalAbierto(false)}
          titulo={evento?.nombre || 'Cargando...'}
          tituloVariant='h4'
          botones={[
            {
              label: 'EDITAR',
              variant: 'outlined',
              //onClick: () => console.log('Editar Evento'),
              outlineColor: colores.altertex[4],
            },
            {
              label: 'SALIR',
              variant: 'contained',
              onClick: () => setModalAbierto(false),
              backgroundColor: colores.altertex[4],
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

      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla
          columns={columnas}
          rows={filas}
          loading={cargando}
          checkboxSelection
          disableSelectionOnClick
          onRowSelectionModelChange={() => {}}
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
