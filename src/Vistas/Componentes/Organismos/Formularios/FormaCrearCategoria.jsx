import Alerta from '../../Moleculas/Alerta';
import CampoTexto from '../../Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerProductos from '../../../../dominio/servicios/obtenerProductos';
import ProductosModal from '../ProductosModal';
import { useAuth } from '../../../../hooks/AuthProvider';

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'nombreProducto', headerName: 'Nombre', width: 220 },
  { field: 'tipo', headerName: 'Tipo', width: 100 },
];

/**
 * @see [RF[46] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46)
 */
const FormaCrearCategorias = ({
  nombreCategoria,
  setNombreCategoria,
  descripcionCategoria,
  setDescripcionCategoria,
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
        value={nombreCategoria}
        onChange={(evento) => setNombreCategoria(evento.target.value)}
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
        value={descripcionCategoria}
        onChange={(evento) => setDescripcionCategoria(evento.target.value)}
      />

      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje={'Ingresa el nombre y selecciona al menos un producto.'}
          cerrable
          duracion={10000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
    </>
  );
};

export default FormaCrearCategorias;
