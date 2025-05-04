// RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
import React, { useState } from 'react';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import Alerta from '../../Componentes/moleculas/Alerta'; // Asegúrate de importar Alerta
import Chip from '../../Componentes/atomos/Chip';
import ModalEliminarSetProductos from '../../Componentes/organismos/ModalEliminarSetProductos';
import { Box, useTheme } from '@mui/material';
import { useConsultarSetsProductos } from '../../../hooks/SetsProductos/useConsultarSetsProductos';
import { tokens } from '../../../theme';

const ListaSetsProductos = () => {
  const { setsDeProductos, cargando, error, recargar } = useConsultarSetsProductos();
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsSetProductos, setIdsSetProductos] = useState([]);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Estado para controlar la visualización del modal eliminar
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

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
      outlineColor: colores.primario[10],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.size === 0 || seleccionados.ids.size === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un set de productos para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsSetProductos(Array.from(seleccionados.ids));
          setOpenModalEliminar(true);
        }
      },
      color: 'error',
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
            onRowSelectionModelChange={(newSelection) => {
              setSeleccionados(newSelection);
            }}
          />
        </Box>
      </ContenedorLista>
      <ModalEliminarSetProductos
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsSetProductos={idsSetProductos}
        setAlerta={setAlerta}
        refrescarPagina={recargar}
      />
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
    </>
  );
};

export default ListaSetsProductos;
