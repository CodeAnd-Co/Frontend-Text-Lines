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

const LIMITE_NOMBRE = 50;
const LIMITE_NOMBRE_VISIBLE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormaCrearSetsProducto = ({
                                  nombreSetsProducto,
                                  setNombreSetsProducto,
                                  nombreVisible,
                                  setNombreVisible,
                                  descripcionSetsProducto,
                                  setDescripcionSetsProducto,
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

  const handleFilaSeleccion = (itemSeleccion) => {
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
        value={nombreSetsProducto}
        onChange={(evento) => {
          if (evento.target.value.trim() !== '') {
            setNombreSetsProducto(evento.target.value.slice(0, LIMITE_NOMBRE));
          } else if (nombreSetsProducto !== '') {
            setNombreSetsProducto('');
          }
        }}
        inputProps={{ maxLength: LIMITE_NOMBRE }}
        helperText={`${nombreSetsProducto.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`}
        required
        sx={{ mb: 2 }}
      />

      <CampoTexto
        label={'Nombre Visible'}
        fullWidth
        type={'text'}
        value={nombreVisible}
        onChange={(evento) => {
          if (evento.target.value.trim() !== '') {
            setNombreVisible(evento.target.value.slice(0, LIMITE_NOMBRE_VISIBLE));
          } else if (nombreVisible !== '') {
            setNombreVisible('');
          }
        }}
        inputProps={{ maxLength: LIMITE_NOMBRE_VISIBLE }}
        helperText={`${nombreVisible.length}/${LIMITE_NOMBRE_VISIBLE} - ${MENSAJE_LIMITE}`}
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
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionSetsProducto}
        onChange={(evento) => {
          if (evento.target.value.trim() !== '') {
            setDescripcionSetsProducto(evento.target.value.slice(0, LIMITE_DESCRIPCION));
          } else if (descripcionSetsProducto !== '') {
            setDescripcionSetsProducto('');
          }
        }}
        inputProps={{ maxLength: LIMITE_DESCRIPCION }}
        helperText={`${descripcionSetsProducto.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`}
        required
        sx={{ mt: 2 }}
        multiline
        rows={3}
      />
    </>
  );
};

export default FormaCrearSetsProducto;