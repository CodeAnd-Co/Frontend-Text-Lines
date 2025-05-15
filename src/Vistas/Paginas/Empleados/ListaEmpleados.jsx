//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
//RF20 - Eliminar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalFlotante from '@Organismos/ModalFlotante';
import InfoEmpleado from '@Moleculas/EmpleadoInfo';
import PopUp from '@Moleculas/PopUp';
import Alerta from '@Moleculas/Alerta';
import { useAuth } from '@Hooks/AuthProvider';
import { useConsultarEmpleados } from '@Hooks/Empleados/useConsultarEmpleados';
import { useEliminarEmpleado } from '@Hooks/Empleados/useEliminarEmpleado';
import { tokens } from '@SRC/theme';
import { PERMISOS } from '@Constantes/permisos';
import ModalImportarEmpleados from '@Organismos/ModalImportarEmpleados';
import useImportarEmpleados from '@Hooks/Empleados/useImportarEmpleados';

const ListaGrupoEmpleados = () => {
  const { empleados, cargando, error, recargar } = useConsultarEmpleados();
  const { eliminar } = useEliminarEmpleado();
  const { usuario } = useAuth();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [modalImportarAbierto, setModalImportarAbierto] = useState(false);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [openModalEliminar, setAbrirPopUpEliminar] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const MENSAJE_POPUP_ELIMINAR =
    '¿Estás seguro de que deseas eliminar los empleados seleccionados? Esta acción no se puede deshacer.';
  const handleAbrirImportar = () => setModalImportarAbierto(true);
  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };
  const { importar, errores, exito, cargando: cargandoImportacion } = useImportarEmpleados();

  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(empleadosSeleccionados);
      await recargar(); // Se asegura de que se recargue la lista
      setAlerta({
        tipo: 'success',
        mensaje: 'Empleados eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setEmpleadosSeleccionados([]);
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error al eliminar los empleados.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUpEliminar(false);
    }
  };

  const columnas = [
    { field: 'nombreCompleto', headerName: 'Nombre del Empleado', flex: 1 },
    { field: 'correoElectronico', headerName: 'Correo Electrónico', flex: 1 },
    { field: 'numeroEmergencia', headerName: 'Número de Emergencia', width: 180 },
    { field: 'areaTrabajo', headerName: 'Área de Trabajo', flex: 1 },
    { field: 'posicion', headerName: 'Posición', flex: 1 },
    { field: 'cantidadPuntos', headerName: 'Puntos', width: 100 },
    { field: 'antiguedad', headerName: 'Antigüedad', flex: 1 },
  ];

  const filas = empleados.map((empleado) => ({
    id: empleado.idEmpleado,
    nombreCompleto: empleado.nombreCompleto,
    correoElectronico: empleado.correoElectronico,
    numeroEmergencia: empleado.numeroEmergencia,
    areaTrabajo: empleado.areaTrabajo,
    posicion: empleado.posicion,
    cantidadPuntos: empleado.cantidadPuntos,
    antiguedad: empleado.antiguedad,
  }));

  const botones = [
    {
      label: 'Añadir',
      onClick: () => console.log('Añadir'),
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      deshabilitado: true,
    },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: handleAbrirImportar,
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.primario[10],
      deshabilitado: true,
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (empleadosSeleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un empleado para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setAbrirPopUpEliminar(true);
        }
      },
      disabled: !usuario?.permisos?.includes(PERMISOS.ELIMINAR_EMPLEADO),
      size: 'large',
      color: 'error',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Lista de Empleados'
        descripcion='Consulta y administra la información de los empleados registrados para cada cliente.'
        informacionBotones={botones}
      >
        <Box width={'100%'}>
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            checkboxSelection
            onRowClick={(params) => {
              setEmpleadoSeleccionado(params.row);
              setModalDetalleAbierto(true);
            }}
            onRowSelectionModelChange={(nuevosIds) => {
              const ids = Array.isArray(nuevosIds) ? nuevosIds : Array.from(nuevosIds?.ids || []);
              setEmpleadosSeleccionados(ids);
            }}
          />
        </Box>
      </ContenedorLista>

      {/* Modal de detalles */}
      {modalDetalleAbierto && empleadoSeleccionado && (
        <ModalFlotante
          open={modalDetalleAbierto}
          onClose={() => setModalDetalleAbierto(false)}
          onConfirm={() => setModalDetalleAbierto(false)}
          titulo={empleadoSeleccionado.nombreCompleto || 'Detalles del Empleado'}
          tituloVariant='h4'
          botones={[
            {
              label: 'EDITAR',
              variant: 'contained',
              color: 'error',
              backgroundColor: colores.altertex[1],
              onClick: () => console.log('Editar empleado', empleadoSeleccionado.id),
            },
            {
              label: 'SALIR',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[10],
              onClick: () => setModalDetalleAbierto(false),
            },
          ]}
        >
          <InfoEmpleado
            nombreCompleto={empleadoSeleccionado.nombreCompleto}
            correoElectronico={empleadoSeleccionado.correoElectronico}
            numeroEmergencia={empleadoSeleccionado.numeroEmergencia}
            areaTrabajo={empleadoSeleccionado.areaTrabajo}
            posicion={empleadoSeleccionado.posicion}
            cantidadPuntos={empleadoSeleccionado.cantidadPuntos}
            antiguedad={empleadoSeleccionado.antiguedad}
            idEmpleado={empleadoSeleccionado.id}
            estadoEmpleado={{
              label: 'Activo',
              color: 'error',
              shape: 'circular',
              backgroundColor: 'rgba(24, 50, 165, 1)',
            }}
          />
        </ModalFlotante>
      )}

      {/* PopUp de confirmación para eliminar */}
      <PopUp
        abrir={openModalEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />

      {/* Alerta inferior */}
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
      <ModalImportarEmpleados
        abierto={modalImportarAbierto}
        onCerrar={() => setModalImportarAbierto(false)}
        onConfirm={importar}
        cargando={cargandoImportacion}
        errores={errores}
        exito={exito}
        recargar={recargar}
      ></ModalImportarEmpleados>
    </>
  );
};

export default ListaGrupoEmpleados;
