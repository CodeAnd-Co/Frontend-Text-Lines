import { useState, useEffect } from 'react';
import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import CustomDataGrid from '@Organismos/Tabla';
import obtenerPermisos from '@SRC/Dominio/Servicios/obtenerPermisos';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'nombre', headerName: 'Permiso', width: 250 },
];

const FormaCrearRol = ({
  nombreRol,
  setNombreRol,
  descripcionRol,
  setDescripcionRol,
  setPermisosSeleccionados,
  mostrarAlerta,
  setMostrarAlerta,
}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const cargarPermisos = async () => {
      const permisos = await obtenerPermisos();
      console.log('🟡 Permisos cargados:', permisos);
      setRows(permisos);
    };
    cargarPermisos();
  }, []);

  return (
    <>
      {/* CAMPO: NOMBRE */}
      <CampoTexto
        label='Nombre del Rol'
        fullWidth
        type='text'
        value={nombreRol}
        onChange={(evento) => setNombreRol(evento.target.value)}
      />

      {/* TABLA PERMISOS */}
      <CustomDataGrid
        sx={{ width: '100%', height: '350px', marginTop: 2 }}
        columns={columns}
        rows={rows}
        pageSize={5}
        checkboxSelection
        onRowSelectionModelChange={(selectionModel) => {
          const ids = Array.isArray(selectionModel)
            ? selectionModel
            : Array.from(selectionModel?.ids || []);

          console.log('🟣 IDs seleccionados:', ids);

          const seleccionados = rows.filter((permiso) => ids.includes(permiso.id));
          console.log('🟣 Permisos seleccionados:', seleccionados);

          setPermisosSeleccionados(seleccionados);
        }}
      />

      {/* CAMPO: DESCRIPCIÓN */}
      <CampoTexto
        label='Descripción'
        fullWidth
        type='text'
        value={descripcionRol}
        onChange={(evento) => setDescripcionRol(evento.target.value)}
      />

      {/* ALERTA */}
      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje='Completa todos los campos y selecciona al menos un permiso.'
          cerrable
          duracion={10000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
    </>
  );
};

export default FormaCrearRol;
