// RF42 - Super Administrador, Cliente Consulta Lista de Sets de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF42
// RF45 - Eliminar set de productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF45
// RF48 - Super Administrador, Cliente Lee Categoria de Productos - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf48/
// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

import React, { useState } from 'react';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import Alerta from '@Moleculas/Alerta';
import Chip from '@Atomos/Chip';
import { useEliminarSetProductos } from '@Hooks/SetsProductos/useEliminarSetProductos';
import PopUp from '@Moleculas/PopUp';
import ModalFlotante from '@Organismos/ModalFlotante';
import InfoSetProductos from '@Moleculas/SetProductosInfo';
import { Box, useTheme } from '@mui/material';
import { useConsultarSetsProductos } from '@Hooks/SetsProductos/useConsultarSetsProductos';
import { tokens } from '@SRC/theme';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useAuth } from '@Hooks/AuthProvider';
import ModalCrearSetsProductos from '@Organismos/ModalCrearSetsProductos.jsx';
import InfoSetProductosEditable from '@SRC/Vistas/Componentes/Moleculas/SetProductosEditable';
import { useActualizarSetsProductos } from '@Hooks/SetsProductos/useActualizarSetsProductos';

const ListaSetsProductos = () => {
  const { setsDeProductos, cargando, error, recargar } = useConsultarSetsProductos();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const MENSAJE_POPUP_ELIMINAR =
    '¿Estás seguro de que deseas eliminar los sets de productos seleccionados?';

  const [seleccionados, setSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [abrirEliminar, setAbrirPopUpEliminar] = useState(false);
  const [setSeleccionado, setSetSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [abrirModalEditar, setAbrirModalEditar] = useState(false);
  const [formData, setFormData] = useState(null);
  const { eliminar } = useEliminarSetProductos();
  const { usuario } = useAuth();

  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };

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

  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  const handleSetProductoCreadoExitosamente = () => {
    handleCerrarModalCrear();
    recargar();
  };

  const handleFormDataChange = (data) => {
    setFormData(data);
  };

  const { actualizarSet } = useActualizarSetsProductos();

  const handleGuardar = async () => {
    if (!formData?.esValido()) {
      setAlerta({
        tipo: 'error',
        mensaje: 'El nombre y la descripción son obligatorios.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      return;
    }

    try {
      await actualizarSet(
        setSeleccionado.idSetProducto,
        formData.nombre,
        formData.descripcion,
        formData.productos,
        formData.grupos
      );
      await recargar();
      setAbrirModalEditar(false);
      setAlerta({
        tipo: 'success',
        mensaje: 'Set de productos actualizado correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } catch (error) {
      setAlerta({
        tipo: 'error',
        mensaje: error?.message || 'Error al actualizar el set de productos.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
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
            shape='circular'
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
    datosCompletos: {
      ...setProducto,
      productos:
        typeof setProducto.productos === 'string'
          ? setProducto.productos.split(',').map((prod) => prod.trim())
          : setProducto.productos || [],
      grupos:
        typeof setProducto.grupos === 'string'
          ? setProducto.grupos.split(',').map((grp) => grp.trim())
          : setProducto.grupos || [],
    },
  }));

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: () => setModalCrearAbierto(true),
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
      color: 'error',
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
            disableRowSelectionOnClick={true}
            checkboxSelection
            onRowClick={(params) => {
              setSetSeleccionado(params.row.datosCompletos);
              setModalDetalleAbierto(true);
            }}
            onRowSelectionModelChange={(selectionModel) => {
              const ids = Array.isArray(selectionModel)
                ? selectionModel
                : Array.from(selectionModel?.ids || []);
              setSeleccionados(ids);
            }}
          />
        </Box>
      </ContenedorLista>

      <ModalCrearSetsProductos
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={handleSetProductoCreadoExitosamente}
      />

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
        abrir={abrirEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />

      {/* MODAL DETALLE */}
      {modalDetalleAbierto && setSeleccionado && (
        <ModalFlotante
          open={modalDetalleAbierto}
          onClose={() => {
            setModalDetalleAbierto(false);
            setSetSeleccionado(null);
          }}
          onConfirm={() => setModalDetalleAbierto(false)}
          titulo={setSeleccionado.nombre || 'Detalles del Set'}
          tituloVariant='h4'
          botones={[
            {
              label: 'EDITAR',
              variant: 'contained',
              color: 'error',
              backgroundColor: colores.altertex[1],
              onClick: () => {
                setModalDetalleAbierto(false);
                setAbrirModalEditar(true);
              },
            },
            {
              label: 'SALIR',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[1],
              onClick: () => setModalDetalleAbierto(false),
            },
          ]}
        >
          <InfoSetProductos
            nombre={''}
            descripcion={setSeleccionado.descripcion}
            productos={setSeleccionado.productos || []}
            grupos={setSeleccionado.grupos || []}
          />
        </ModalFlotante>
      )}
      {abrirModalEditar && (
        <ModalFlotante
          open={abrirModalEditar}
          onClose={() => setAbrirModalEditar(false)}
          titulo='Editar Set de Productos'
          tituloVariant='h4'
          customWidth={900}
          botones={[
            {
              label: 'Guardar',
              variant: 'contained',
              color: 'primary',
              outlineColor: colores.primario[10],
              onClick: handleGuardar,
            },
            {
              label: 'Cancelar',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[10],
              onClick: () => setAbrirModalEditar(false),
            },
          ]}
        >
          <InfoSetProductosEditable
            nombre={setSeleccionado?.nombre || ''}
            descripcion={setSeleccionado?.descripcion || ''}
            productos={setSeleccionado?.productos || []}
            grupos={setSeleccionado?.grupos || []}
            onFormDataChange={handleFormDataChange}
          />
        </ModalFlotante>
      )}
    </>
  );
};

export default ListaSetsProductos;
