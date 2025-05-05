import Alerta from '@SRC/Vistas/Componentes/Moleculas/Alerta';
import CampoTexto from '@SRC/Vistas/Componentes/Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerProductos from '@SRC/Dominio/Servicios/obtenerProductos';
import ProductosModal from '@SRC/Vistas/Componentes/Organismos/ProductosModal';
import { useAuth } from '@Hooks/AuthProvider';

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'nombreProducto', headerName: 'Nombre', width: 220 },
  { field: 'tipo', headerName: 'Tipo', width: 100 },
];

const FormaCrearCuotaSet = ({
  nombreCuotaSet,
  setNombreCuotaSet,
  descripcionCuotaSet,
  setDescripcionCuotaSet,
  productos,
  setProductos,
  mostrarAlerta,
  setMostrarAlerta,
}) => {
  const [rows, setRows] = useState([]);
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  useEffect(() => {
    const obtenerDatosProductos = async (clienteSeleccionado) => {
      const productos = await obtenerProductos(clienteSeleccionado);
      setRows(productos);
    };

    obtenerDatosProductos(clienteSeleccionado);
  }, [clienteSeleccionado]);

  const handleClickFila = (evento) => {
    const productoSeleccionado = evento.row;

    const yaExiste = productos.some((producto) => producto.id === productoSeleccionado.id);
    if (!yaExiste) {
      setProductos((prev) => [...prev, productoSeleccionado]);
    }
  };

  return (
    <>
      <CampoTexto
        label={'Nombre'}
        fullWidth
        type={'text'}
        value={nombreCuotaSet}
        onChange={(evento) => setNombreCuotaSet(evento.target.value)}
      />

      <ProductosModal
        elevacion={1}
        sx={{ width: '100%', height: '350px' }}
        columnas={columns}
        filas={rows}
        paginacion={4}
        checkBox={true}
        onRowClick={handleClickFila}
      />

      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionCuotaSet}
        onChange={(evento) => setDescripcionCuotaSet(evento.target.value)}
      />

      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje={'Completa todos los campos y selecciona al menos un producto.'}
          cerrable
          duracion={10000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
    </>
  );
};

export default FormaCrearCuotaSet;
