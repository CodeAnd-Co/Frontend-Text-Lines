import Contenedor from '../atomos/Contenedor';
import axios from 'axios';
import CampoTexto from '../atomos/CampoTexto';
import CustomDataGrid from './dataGrid';
import { useState, useEffect } from 'react';

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'nombreProducto', headerName: 'Nombre', width: 220 },
  { field: 'tipo', headerName: 'Tipo', width: 100 },
];

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const FormaCrearCuotaSet = ({
  nombreCuotaSet,
  setNombreCuotaSet,
  descripcionCuotaSet,
  setDescripcionCuotaSet,
  productos,
  setProductos,
}) => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}/api/cuotas/obtener-opciones`, {
          params: { idCliente: 102 },
          headers: {
            'x-api-key': API_KEY,
          },
        });

        const filasFormateadas = respuesta.data.resultado.map((p) => ({
          id: p.id,
          nombreProducto: p.nombreProducto,
          tipo: p.tipo,
        }));

        setRows(filasFormateadas);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProductos();
  }, []);

  const handleClickFila = (evento) => {
    const productoSeleccionado = evento.row;

    const yaExiste = productos.some((p) => p.id === productoSeleccionado.id);
    if (!yaExiste) {
      setProductos((prev) => [...prev, productoSeleccionado]);
    }
  };

  return (
    <Contenedor
      elevation={0}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <CampoTexto
        label={'Nombre'}
        fullWidth
        type={'text'}
        value={nombreCuotaSet}
        onChange={(e) => setNombreCuotaSet(e.target.value)}
      />

      <Contenedor elevation={1} sx={{ width: '100%', height: '350px' }}>
        <CustomDataGrid
          columns={columns}
          rows={rows}
          pageSize={4}
          checkboxSelection={true}
          onRowClick={handleClickFila}
        />
      </Contenedor>

      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionCuotaSet}
        onChange={(e) => setDescripcionCuotaSet(e.target.value)}
      />
    </Contenedor>
  );
};

export default FormaCrearCuotaSet;
