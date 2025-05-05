// RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
// RF45 - Eliminar set de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45

import React, { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import Alerta from '@Moleculas/Alerta';
import Chip from '@Atomos/Chip';
import { useEliminarSetProductos } from '@Hooks/SetsProductos/useEliminarSetProductos';
import PopUp from '@Moleculas/PopUp';
import { Box, useTheme } from '@mui/material';
import { useConsultarSetsProductos } from '@Hooks/SetsProductos/useConsultarSetsProductos';
import { tokens } from '@SRC/theme';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useAuth } from '@Hooks/AuthProvider';

const ListaSetsProductos = () => {
  const { setsDeProductos, cargando, error, recargar } = useConsultarSetsProductos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const MENSAJE_POPUP_ELIMINAR =
    '¿Estás seguro de que deseas eliminar los sets de productos seleccionados?';

  const [seleccionados, setSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const { eliminar } = useEliminarSetProductos();
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
        mensaje: 'Sets de productos eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los sets de productos.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUpEliminar(false);
    }
  };

  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 2,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 3,
    },
    {
      field: 'activo',
      headerName: 'Disponibilidad en stock',
      flex: 1,
      renderCell: (params) => {
        const isActivo = params.value === 1;

        return (
          <Chip
            label={isActivo ? 'Disponible' : 'No disponible'}
            variant='filled'
            color={isActivo ? 'primary' : undefined}
            size='medium'
            shape='cuadrada'
            backgroundColor={isActivo ? undefined : '#f0f0f0'}
            textColor={isActivo ? undefined : '#000000'}
          />
        );
      },
    },
  ];

  const rows = setsDeProductos.map((setProducto) => ({
    id: setProducto.idSetProducto,
    nombre: setProducto.nombre,
    descripcion: setProducto.descripcion,
    activo: setProducto.activo,
  }));

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
      outlineColor: colores.altertex[1],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un set de productos para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUpEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_GRUPO_EMPLEADOS),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Sets de productos'
        descripcion='Gestiona y organiza los sets de productos que se pueden asignar a los grupos de empleados.'
        informacionBotones={botones}
      >
        <Box width='100%' mt='20px'>
          {error && (
            <Box mb={2}>
              <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />
            </Box>
          )}
          <Tabla
            columns={columns}
            rows={rows}
            loading={cargando}
            checkboxSelection
            onRowSelectionModelChange={(selectionModel) => {
              const ids = Array.isArray(selectionModel)
                ? selectionModel
                : Array.from(selectionModel?.ids || []);
              setSeleccionados(ids);
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

export default ListaSetsProductos;
