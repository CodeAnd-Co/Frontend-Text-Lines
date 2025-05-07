//RF37 - Consulta Lista de Eventos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarEventos } from '@Hooks/Eventos/useConsultarEventos';
import { tokens } from '@SRC/theme';
import { useAuth } from '@Hooks/AuthProvider';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useEliminarEvento } from '@Hooks/Eventos/useEliminarEvento';
import PopUp from '@Moleculas/PopUp';
import Alerta from '@Moleculas/Alerta';
import Chip from '@Atomos/Chip';

const ListaEventos = () => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { eventos, cargando, error } = useConsultarEventos();
  const MENSAJES_POPUP_ELIMINAR = '¿Estás seguro de que deseas eliminar los eventos seleccionados?';

  const [seleccionados, setSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const { eliminar } = useEliminarEvento();
  const [abrirEliminar, setAbrirPopUpEliminar] = useState(false);
  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };
  const { usuario } = useAuth();
  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(seleccionados);
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
      setAbrirPopUpEliminar(false);
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
      onClick: () => console.log('Añadir'),
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
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
        if (seleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un evento para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUpEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_EVENTO),
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
      <Box width={'100%'}>
        {alerta && <Alerta {...alerta} onClose={() => setAlerta(null)} />}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla
          columns={columnas}
          rows={filas}
          loading={cargando}
          checkboxSelection
          onRowSelectionModelChange={setSeleccionados}
          selectionModel={seleccionados}
        />
        <PopUp
          open={abrirEliminar}
          onClose={manejarCancelarEliminar}
          onConfirm={manejarConfirmarEliminar}
          mensaje={MENSAJES_POPUP_ELIMINAR}
        />
      </Box>
    </ContenedorLista>
  );
};

export default ListaEventos;
