import { useState, useEffect } from 'react';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import EmpleadosModal from '@Organismos/EmpleadosModal'; // similar a ProductosModal
import { useConsultarEmpleados } from '@Hooks/Empleados/useConsultarEmpleados';
import { useAuth } from '@Hooks/AuthProvider';

const columns = [
  { field: 'nombreCompleto', headerName: 'Nombre', width: 250 },
  { field: 'areaTrabajo', headerName: 'Área de trabajo', width: 200 },
];


const FormaCrearGrupoEmpleados = ({
  nombreGrupo,
  setNombreGrupo,
  descripcion,
  setDescripcion,
  listaEmpleados,
  setListaEmpleados,
  mostrarAlerta,
  setMostrarAlerta,
}) => {
  const { empleados, cargando, error } = useConsultarEmpleados();
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;
  
  const empleadosConId = Array.isArray(empleados)
  ? empleados.map(emp => ({
      ...emp,
      id: emp.idEmpleado,
    }))
  : [];

  const handleClickFila = (evento) => {
    const seleccionado = evento.row;
    const yaExiste = listaEmpleados.some((emp) => emp.id === seleccionado.id);
    if (!yaExiste) {
      setListaEmpleados((prev) => [...prev, seleccionado]);
    }
  };

  return (
    <>
      <CampoTexto
        label='Nombre'
        fullWidth
        value={nombreGrupo}
        onChange={(e) => setNombreGrupo(e.target.value)}
      />

      <EmpleadosModal
        elevacion={1}
        sx={{ width: '100%', height: '350px' }}
        columnas={columns}
        filas={empleadosConId}
        paginacion={5}
        checkBox={true}
        onRowClick={handleClickFila}
        cargando={cargando}
        error={error}
      />

      <CampoTexto
        label='Descripción'
        fullWidth
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje='Completa todos los campos y selecciona al menos un empleado.'
          cerrable
          duracion={4000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
    </>
  );
};

export default FormaCrearGrupoEmpleados;