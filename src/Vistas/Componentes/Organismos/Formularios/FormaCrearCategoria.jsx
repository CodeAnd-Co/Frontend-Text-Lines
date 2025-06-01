import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerProductos from '@Servicios/obtenerProductos';
import ProductosModal from '@Organismos/ProductosModal';
import { useAuth } from '@Hooks/AuthProvider';

const columns = [
  { field: 'id', headerName: 'Id', width: 100 },
  { field: 'nombreProducto', headerName: 'Nombre', width: 220 },
  { field: 'tipo', headerName: 'Tipo', width: 100 },
];

/**
 * @see [RF[46] Consulta lista de categorías](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF46)
 */

const LIMITE_NOMBRE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormaCrearCategorias = ({
                                nombreCategoria,
                                setNombreCategoria,
                                descripcionCategoria,
                                setDescripcionCategoria,
                                productos,
                                setProductos,
                                mostrarAlerta,
                                setMostrarAlerta,
                                errores,
                                intentoEnviar,
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

  const handleFilaSeleccion = (itemSeleccion) => {
    const ids = Array.isArray(itemSeleccion) ? itemSeleccion : Array.from(itemSeleccion?.ids || []);

    // Get the products that correspond to the selected IDs
    const productosSeleccionados = ids
      .map((id) => rows.find((row) => row.id === id))
      .filter((fila) => fila); // Remove any undefined entries

    // Update the productos state to match exactly what's selected
    setProductos(productosSeleccionados);

    // Clear the validation alert when products are selected
    if (productosSeleccionados.length > 0 && mostrarAlerta) {
      setMostrarAlerta(false);
    }
  };

  return (
    <>
      <CampoTexto
        label='Nombre'
        fullWidth
        type='text'
        value={nombreCategoria}
        onChange={(evento) => setNombreCategoria(evento.target.value.slice(0, LIMITE_NOMBRE))}
        inputProps={{ maxLength: LIMITE_NOMBRE }}
        helperText={
          errores?.nombreCategoria || `${nombreCategoria.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`
        }
        error={intentoEnviar && !!errores?.nombreCategoria}
        required
        sx={{ mb: 2 }}
      />

      <ProductosModal
        elevacion={1}
        sx={{ width: '100%', height: '350px' }}
        columnas={columns}
        filas={rows}
        paginacion={4}
        checkBox={true}
        onRowClick={handleClickFila}
        onRowSeleccion={(ids) => handleFilaSeleccion(ids)}
      />

      <CampoTexto
        label='Descripción'
        fullWidth
        type='text'
        value={descripcionCategoria}
        onChange={(evento) => setDescripcionCategoria(evento.target.value.slice(0, LIMITE_DESCRIPCION))}
        inputProps={{ maxLength: LIMITE_DESCRIPCION }}
        helperText={
          errores?.descripcionCategoria || `${descripcionCategoria.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`
        }
        error={intentoEnviar && !!errores?.descripcionCategoria}
        required
        sx={{ mt: 2 }}
        multiline
        rows={3}
      />

      {/* Alert moved to parent component */}
    </>
  );
};

export default FormaCrearCategorias;