import { useState, useEffect } from 'react';
import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import CustomDataGrid from '@Organismos/Tabla';
import obtenerPermisos from '@Servicios/obtenerPermisos';

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
  erroresCampos = {},
  setErroresCampos, 
}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const cargarPermisos = async () => {
      const permisos = await obtenerPermisos();
      setRows(permisos);
    };
    cargarPermisos();
  }, []);

  return (
    <>
      {/* CAMPO: NOMBRE */}
      <CampoTexto
        label="Nombre del Rol"
        fullWidth
        type="text"
        value={nombreRol}
        onChange={(evento) => {
          setNombreRol(evento.target.value);
          setErroresCampos((prev) => ({ ...prev, nombreRol: undefined })); 
        }}
        error={Boolean(erroresCampos.nombreRol)}
        helperText={erroresCampos.nombreRol}
      />

      {/* TABLA DE PERMISOS */}
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

          const seleccionados = rows.filter((permiso) => ids.includes(permiso.id));

          setPermisosSeleccionados(seleccionados);
          setErroresCampos((prev) => ({ ...prev, permisosSeleccionados: undefined })); 
        }}
      />

      {/* ALERTA DE PERMISOS (debajo de la tabla, arriba de descripción) */}
      {erroresCampos.permisosSeleccionados && (
        <Alerta
          tipo="warning"
          mensaje={erroresCampos.permisosSeleccionados}
          cerrable
          duracion={8000}
          sx={{ my: 2, mb: 2}}
        />
      )}

      {/* CAMPO: DESCRIPCIÓN */}
      <CampoTexto
        label="Descripción"
        fullWidth
        type="text"
        value={descripcionRol}
        onChange={(evento) => setDescripcionRol(evento.target.value)}
      />
    </>
  );
};

export default FormaCrearRol;
