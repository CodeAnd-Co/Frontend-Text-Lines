//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
//RF20 - Eliminar empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF20
//RF59 - Exportar Empleados - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF59

import React, { useState, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import ModalFlotante from '@Organismos/ModalFlotante';
import ModalActualizarEmpleado from '@Organismos/ModalActualizarEmpleado';
import ModalCrearEmpleado from '@Organismos/ModalCrearEmpleado';
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
import useExportarEmpleados from '@Hooks/Empleados/useExportarEmpleados';

const ListaGrupoEmpleados = () => {
  const { empleados, cargando, error, recargar } = useConsultarEmpleados();
  const { eliminar } = useEliminarEmpleado();
  const { usuario } = useAuth();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [modalImportarAbierto, setModalImportarAbierto] = useState(false);
  const [modalAgregarAbierto, setModalAgregarAbierto] = useState(false);
  const [modalActualizarAbierto, setModalActualizarAbierto] = useState(false);
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [openModalEliminar, setAbrirPopUpEliminar] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const MENSAJE_POPUP_ELIMINAR
    = '¿Estás seguro de que deseas eliminar los empleados seleccionados? Esta acción no se puede deshacer.';
  const handleAbrirImportar = () => setModalImportarAbierto(true);
  const manejarCancelarEliminar = () => {
    setAbrirPopUpEliminar(false);
  };
  const { importar, errores, exito, cargando: cargandoImportacion } = useImportarEmpleados();

  const manejarAbrirAgregar = () => setModalAgregarAbierto(true);
  const manejarCerrarAgregar = () => setModalAgregarAbierto(false);

  const manejarConfirmarEliminar = async () => {
    try {
      await eliminar(empleadosSeleccionados);
      await recargar();
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

  const [openModalExportar, setAbrirPopUpExportar] = useState(false);
  const MENSAJE_POPUP_EXPORTAR = '¿Deseas exportar la lista de empleados? El archivo será generado en formato CSV.';
  const manejarCancelarExportar = () => {
    setAbrirPopUpExportar(false);
  };

  const manejarConfirmarExportar = async () => {
    if (empleadosSeleccionados.length === 0) {
      setAlerta({
        tipo: 'warning',
        mensaje: 'Selecciona al menos un empleado para exportar.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      return;
    }

    await exportar(empleadosSeleccionados);
    setAbrirPopUpExportar(false);
  };

  const { exportar, error: errorExportar, csv, mensaje } = useExportarEmpleados();

  useEffect(() => {
  if (csv) {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'empleados.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }, [csv]);
  
  useEffect(() => {
    if (errorExportar) {
      setAlerta({
        tipo: 'error',
        mensaje: errorExportar,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    }
  }, [errorExportar]);

  useEffect(() => {
    if (csv && mensaje) {
      setAlerta({
        tipo: 'success',
        mensaje,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    }
  }, [csv, mensaje]);

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
    idUsuario: empleado.idUsuario,
    nombreCompleto: empleado.nombreCompleto,
    correoElectronico: empleado.correoElectronico,
    numeroEmergencia: empleado.numeroEmergencia,
    areaTrabajo: empleado.areaTrabajo,
    posicion: empleado.posicion,
    cantidadPuntos: empleado.cantidadPuntos,
    antiguedad: empleado.antiguedad,
    antiguedadDate: empleado.antiguedadDate,
  }));

  const botones = [
    {
      label: 'Añadir',
      onClick: manejarAbrirAgregar,
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      disabled: !usuario?.permisos?.includes(PERMISOS.CREAR_EMPLEADO),
    },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: handleAbrirImportar,
      color: 'primary',
      outlineColor: colores.altertex[1],
      size: 'large',
      disabled: !usuario?.permisos?.includes(PERMISOS.IMPORTAR_EMPLEADOS),
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => setAbrirPopUpExportar(true),
      color: 'primary',
      outlineColor: colores.altertex[1],
      size: 'large',
      disabled: !usuario?.permisos?.includes(PERMISOS.EXPORTAR_EMPLEADOS),
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
            disableRowSelectionOnClick={true}
            checkboxSelection
            onRowClick={(params) => {
              setEmpleadoSeleccionado(params.row);
              setModalDetalleAbierto(true);
            }}
            onRowSelectionModelChange={(nuevosIds) => {
              const ids = (Array.isArray(nuevosIds) ? nuevosIds : Array.from(nuevosIds?.ids || []))
                .map(id => parseInt(id));
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
              onClick: () => {
                setModalActualizarAbierto(true);
                setModalDetalleAbierto(false);
              },
              disabled: !usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_EMPLEADO),
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
          <InfoEmpleado
            nombreCompleto={empleadoSeleccionado.nombreCompleto}
            correoElectronico={empleadoSeleccionado.correoElectronico}
            numeroEmergencia={empleadoSeleccionado.numeroEmergencia}
            areaTrabajo={empleadoSeleccionado.areaTrabajo}
            posicion={empleadoSeleccionado.posicion}
            cantidadPuntos={empleadoSeleccionado.cantidadPuntos}
            antiguedad={empleadoSeleccionado.antiguedad}
            idEmpleado={empleadoSeleccionado.id}
            antiguedadFecha={empleadoSeleccionado.antiguedadDate}
            estadoEmpleado={{
              label: 'Activo',
              color: 'error',
              shape: 'circular',
              backgroundColor: 'rgba(24, 50, 165, 1)',
            }}
          />
        </ModalFlotante>
      )}

      {/* Modal para actualizar empleado */}
      {modalActualizarAbierto && (
        <ModalActualizarEmpleado
          open={modalActualizarAbierto}
          onClose={() => setModalActualizarAbierto(false)}
          onAccion={recargar}
          empleadoEdicion={empleadoSeleccionado}
        />
      )}

      {/* Modal para agregar empleado */}
      {modalAgregarAbierto && (
        <ModalCrearEmpleado
          open={modalAgregarAbierto}
          onClose={manejarCerrarAgregar}
          onAccion={recargar}
        />
      )}

      {/* PopUp de confirmación para eliminar */}
      <PopUp
        abrir={openModalEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo={MENSAJE_POPUP_ELIMINAR}
      />

      <PopUp
        abrir={openModalExportar}
        cerrar={manejarCancelarExportar}
        confirmar={manejarConfirmarExportar}
        dialogo={MENSAJE_POPUP_EXPORTAR}
        labelCancelar = 'Cancelar'
        labelConfirmar = 'Confirmar'
        disabledConfirmar={cargando}
      />

      {/* Alerta inferior */}
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