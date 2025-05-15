import { useEffect, useState } from 'react';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import EmpleadosModal from '@Organismos/EmpleadosModal';
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
  errores,
  intentoEnviar,
}) => {
  const { empleados, cargando, error } = useConsultarEmpleados();
  const { usuario } = useAuth();
  const [mostrarAlertaEmpleados, setMostrarAlertaEmpleados] = useState(false);

  useEffect(() => {
    if (intentoEnviar && errores.listaEmpleados) {
      setMostrarAlertaEmpleados(true);
      const timer = setTimeout(() => {
        setMostrarAlertaEmpleados(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [intentoEnviar, errores.listaEmpleados]);

  const empleadosConId = Array.isArray(empleados)
    ? empleados.map(emp => ({
        ...emp,
        id: emp.idEmpleado ?? emp.id,
      }))
    : [];

  const handleSeleccionCheckbox = (seleccion) => {
    const ids = Array.isArray(seleccion) ? seleccion : Array.from(seleccion?.ids || []);
    const empleadosSeleccionados = empleadosConId.filter(emp => ids.includes(emp.id));
    setListaEmpleados(empleadosSeleccionados);
  };

  return (
    <>
      <CampoTexto
        label='Nombre'
        fullWidth
        value={nombreGrupo}
        onChange={(e) => setNombreGrupo(e.target.value)}
        error={!!errores.nombreGrupo}
        helperText={errores.nombreGrupo}
      />

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

      {mostrarAlertaEmpleados && (
        <Alerta
          tipo='warning'
          mensaje={errores.listaEmpleados}
          sx={{ mt: 2, mb: 2 }}
        />
      )}

      <CampoTexto
        label='Descripción'
        fullWidth
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        error={!!errores.descripcion}
        helperText={errores.descripcion}
      />
    </>
  );
};

export default FormaCrearGrupoEmpleados;