// Importación de hooks y componentes necesarios desde React y el sistema de diseño del proyecto.
import { useEffect, useState } from 'react';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import EmpleadosModal from '@Organismos/EmpleadosModal';
import { useConsultarEmpleados } from '@Hooks/Empleados/useConsultarEmpleados';

// Definición de las columnas que se mostrarán en el modal de selección de empleados.
const columns = [
  { field: 'nombreCompleto', headerName: 'Nombre', width: 250 },
  { field: 'areaTrabajo', headerName: 'Área de trabajo', width: 200 },
];

/**
 * Componente de formulario para crear un nuevo grupo de empleados.
 *
 * @component
 * @param {object} props - Props del componente.
 * @param {string} nombreGrupo - Valor del campo de nombre del grupo.
 * @param {Function} setNombreGrupo - Función para actualizar el nombre del grupo.
 * @param {string} descripcion - Valor del campo de descripción.
 * @param {Function} setDescripcion - Función para actualizar la descripción.
 * @param {Array} listaEmpleados - Lista actual de empleados seleccionados.
 * @param {Function} setListaEmpleados - Función para actualizar los empleados seleccionados.
 * @param {object} errores - Objeto con errores de validación por campo.
 * @param {boolean} intentoEnviar - Bandera que indica si se intentó enviar el formulario.
 * @returns {JSX.Element} El formulario con inputs, modal de empleados y alertas.
 */
const FormaCrearGrupoEmpleados = ({
  nombreGrupo,
  setNombreGrupo,
  descripcion,
  setDescripcion,
  setListaEmpleados,
  errores,
  intentoEnviar,
}) => {
  const { empleados, cargando, error } = useConsultarEmpleados(); // Hook para obtener empleados desde el backend.

  const [mostrarAlertaEmpleados, setMostrarAlertaEmpleados] = useState(false); // Controla visibilidad de la alerta de validación de empleados.

  // Efecto que muestra una alerta temporal si se intenta enviar el formulario sin seleccionar empleados.
  useEffect(() => {
    if (intentoEnviar && errores.listaEmpleados) {
      setMostrarAlertaEmpleados(true);
      const timer = setTimeout(() => {
        setMostrarAlertaEmpleados(false);
      }, 10000);
      return () => clearTimeout(timer); // Limpieza del temporizador si se desmonta el componente.
    }
  }, [intentoEnviar, errores.listaEmpleados]);

  // Prepara los empleados con una propiedad "id" obligatoria para la tabla.
  const empleadosConId = Array.isArray(empleados)
    ? empleados.map(emp => ({
        ...emp,
        id: emp.idEmpleado ?? emp.id,
      }))
    : [];

  /**
   * Maneja la selección de empleados desde el modal y actualiza la lista seleccionada.
   *
   * @param {Array|Object} seleccion - Lista de IDs seleccionados o evento con propiedad `.ids`.
   */
  const handleSeleccionCheckbox = (seleccion) => {
    const ids = Array.isArray(seleccion)
      ? seleccion
      : Array.from(seleccion?.ids || []);
    const empleadosSeleccionados = empleadosConId.filter(emp => ids.includes(emp.id));
    setListaEmpleados(empleadosSeleccionados);
  };

  return (
    <>
      {/* Campo de texto para el nombre del grupo */}
      <CampoTexto
        label='Nombre'
        fullWidth
        value={nombreGrupo}
        onChange={(evento) => setNombreGrupo(evento.target.value)}
        error={!!errores.nombreGrupo}
        helperText={errores.nombreGrupo}
        inputProps={{
          maxLength: 50,
        }}
      />

      {/* Modal para selección de empleados mediante checkboxes */}
      <EmpleadosModal
        elevacion={1}
        sx={{ width: '100%', height: '350px' }}
        columnas={columns}
        filas={empleadosConId}
        paginacion={10}
        checkBox={true}
        cargando={cargando}
        error={error}
        onSeleccionCheckbox={handleSeleccionCheckbox}
        onRowClick={null}
      />

      {/* Alerta visible si hay error en la selección de empleados */}
      {mostrarAlertaEmpleados && (
        <Alerta
          tipo='warning'
          mensaje={errores.listaEmpleados}
          sx={{ mt: 2, mb: 2 }}
        />
      )}

      {/* Campo de texto para la descripción del grupo */}
      <CampoTexto
        label='Descripción'
        fullWidth
        value={descripcion}
        onChange={(evento) => setDescripcion(evento.target.value)}
        error={!!errores.descripcion}
        helperText={errores.descripcion}
        inputProps={{
          maxLength: 150,
        }}
      />
    </>
  );
};

export default FormaCrearGrupoEmpleados;