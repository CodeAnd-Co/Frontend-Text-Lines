//RF37 - Consulta Lista de Eventos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37
import React from 'react';
import { Box } from '@mui/material';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarEventos } from '../../../hooks/Eventos/useConsultarEventos';

const ListaEventos = () => {
  const { eventos, cargando, error } = useConsultarEventos();
  console.log('Eventos:', eventos); // Para depuración

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
    { label: 'Añadir', onClick: () => console.log('Añadir'), size: 'large' },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      size: 'large',
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      size: 'large',
    },
    { variant: 'outlined', label: 'Editar', onClick: () => console.log('Editar'), size: 'large' },
    { label: 'Eliminar', onClick: () => console.log('Eliminar'), size: 'large' },
  ];

  return (
    <ContenedorLista
      titulo='Lista de Eventos'
      descripcion='Consulta y administra los eventos registrados en el sistema.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla columns={columnas} rows={filas} loading={cargando} checkboxSelection />
      </Box>
    </ContenedorLista>
  );
};

export default ListaEventos;
