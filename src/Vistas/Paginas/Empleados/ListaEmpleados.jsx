//RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
import React, { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import Tabla from '@Organismos/Tabla';
import ContenedorLista from '@Organismos/ContenedorLista';
import { useConsultarEmpleados } from '@Hooks/Empleados/useConsultarEmpleados';
import { tokens } from '@SRC/theme';
import ModalFlotante from '@Organismos/ModalFlotante';
import InfoEmpleado from '@Moleculas/EmpleadoInfo';

const ListaGrupoEmpleados = () => {
  const { empleados, cargando, error } = useConsultarEmpleados();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Estado para el modal y el empleado seleccionado
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

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
    idEmpleado: empleado.idEmpleado,
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
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
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
    {
      label: 'Eliminar',
      onClick: () => console.log('Eliminar'),
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
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
        />
      </Box>

      {/* Modal para mostrar detalles del empleado */}
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
              color: 'primary',
              backgroundColor: colores.altertex[1],
              onClick: () => console.log('Editar empleado', empleadoSeleccionado.idEmpleado),
            },
            {
              label: 'SALIR',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.altertex[1],
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
            idEmpleado={empleadoSeleccionado.idEmpleado}
            estadoEmpleado={{
              label: 'Activo',
              color: 'primary',
              shape: 'circular',
              backgroundColor: 'rgba(24, 50, 165, 1)',
            }}
          />
        </ModalFlotante>
      )}
    </ContenedorLista>
  );
};

export default ListaGrupoEmpleados;
