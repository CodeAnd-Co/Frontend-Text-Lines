import { useEffect, useState } from 'react';
import CampoTexto from '@Atomos/CampoTexto';
import EmpleadosModal from '@Organismos/EmpleadosModal';
import { useConsultarEmpleados } from '@Hooks/Empleados/useConsultarEmpleados';

const columns = [
  { field: 'nombreCompleto', headerName: 'Nombre', width: 250 },
  { field: 'areaTrabajo', headerName: 'Área de trabajo', width: 200 },
];

const LIMITE_NOMBRE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormaCrearGrupoEmpleados = ({
                                    nombreGrupo,
                                    setNombreGrupo,
                                    descripcion,
                                    setDescripcion,
                                    setListaEmpleados,
                                    errores,
                                    intentoEnviar,
                                    onMostrarAlerta
                                  }) => {
  const { empleados, cargando, error } = useConsultarEmpleados();
  const [alertaMostrada, setAlertaMostrada] = useState(false);

  useEffect(() => {
    if (intentoEnviar && errores.listaEmpleados && !alertaMostrada) {
      onMostrarAlerta?.({
        tipo: 'warning',
        mensaje: errores.listaEmpleados,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
      setAlertaMostrada(true);

      const timer = setTimeout(() => {
        setAlertaMostrada(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [intentoEnviar, errores.listaEmpleados, onMostrarAlerta, alertaMostrada]);

  const empleadosConId = Array.isArray(empleados)
    ? empleados.map(emp => ({
      ...emp,
      id: emp.idEmpleado ?? emp.id,
    }))
    : [];

  const handleSeleccionCheckbox = (seleccion) => {
    const ids = Array.isArray(seleccion)
      ? seleccion
      : Array.from(seleccion?.ids || []);
    const empleadosSeleccionados = empleadosConId.filter(emp => ids.includes(emp.id));
    setListaEmpleados(empleadosSeleccionados);
  };

  return (
    <>
      <CampoTexto
        label='Nombre'
        fullWidth
        value={nombreGrupo}
        onChange={(evento) => setNombreGrupo(evento.target.value)}
        error={!!errores.nombreGrupo}
        helperText={errores.nombreGrupo || `${nombreGrupo.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`}
        inputProps={{
          maxLength: LIMITE_NOMBRE,
        }}
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

      <CampoTexto
        label='Descripción'
        fullWidth
        value={descripcion}
        onChange={(evento) => setDescripcion(evento.target.value)}
        error={!!errores.descripcion}
        helperText={errores.descripcion || `${descripcion.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`}
        inputProps={{
          maxLength: LIMITE_DESCRIPCION,
        }}
      />
    </>
  );
};

export default FormaCrearGrupoEmpleados