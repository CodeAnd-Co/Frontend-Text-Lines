import { useState, useEffect } from 'react';
import Alerta from '../../moleculas/Alerta';
import CampoTexto from '../../atomos/CampoTexto';
import CustomDataGrid from '../../organismos/Tabla';
import obtenerPermisos from '../../../../dominio/servicios/obtenerPermisos';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'nombre', headerName: 'Permiso', width: 250 },
];

const FormaCrearRol = ({
  nombreRol,
  setNombreRol,
  permisosSeleccionados,
  setPermisosSeleccionados,
  mostrarAlerta,
  setMostrarAlerta,
}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const cargarPermisos = async () => {
      const permisos = await obtenerPermisos();
      console.log("🟡 Permisos cargados:", permisos); // 👈 AQUI

      setRows(permisos);
    };

    cargarPermisos(); // ← ya no depende de ningún cliente
  }, []);

  return (
    <>
      <CampoTexto
        label="Nombre del Rol"
        fullWidth
        type="text"
        value={nombreRol}
        onChange={(e) => setNombreRol(e.target.value)}
      />

<CustomDataGrid
  sx={{ width: '100%', height: '350px' }}
  columns={columns}
  rows={rows}
  pageSize={5}
  checkboxSelection
  onRowSelectionModelChange={(selectionModel) => {
    const idsSeleccionados = Array.from(selectionModel.ids);
    console.log("🟣 IDs seleccionados:", idsSeleccionados);
  
    const seleccionados = rows.filter((permiso) =>
      idsSeleccionados.includes(permiso.id)
    );
    console.log("🟣 Permisos seleccionados:", seleccionados);
    setPermisosSeleccionados(seleccionados);
  }}
  
/>




      {mostrarAlerta && (
        <Alerta
          tipo="warning"
          mensaje="Completa el nombre del rol y selecciona al menos un permiso."
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
