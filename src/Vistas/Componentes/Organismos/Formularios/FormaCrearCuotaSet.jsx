import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerProductos from '@Servicios/obtenerProductos';
import ProductosModal from '@Organismos/ProductosModal';
import { useAuth } from '@Hooks/AuthProvider';

//RF[31] Consulta crear set de cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31]

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

  const handleRowSeleccion = (itemSeleccion) => {
    const ids = Array.isArray(itemSeleccion) ? itemSeleccion : Array.from(itemSeleccion?.ids || []);

    const nuevasFilas = ids
      .map((id) => rows.find((row) => row.id === id))
      .filter((fila) => fila && !productos.some((producto) => producto.id === fila.id));

    if (nuevasFilas.length > 0) {
      setProductos((prev) => [...prev, ...nuevasFilas]);
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
        onRowSeleccion={(ids) => handleRowSeleccion(ids)}
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
