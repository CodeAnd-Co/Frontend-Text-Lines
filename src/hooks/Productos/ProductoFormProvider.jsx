import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { useConsultarProveedores } from '@Hooks/Proveedores/useConsultarProveedores';
import { useCrearProducto } from '@Hooks/Productos/useCrearProducto';
import { useGenerarSKU } from '@Hooks/Productos/useGenerarSKU';
import { v4 as uuidv4 } from 'uuid';

const ProductoFormContext = createContext();

const prevenirNumerosNegativos = (evento) => {
  const regex = /^[0-9]$/;
  if (!regex.test(evento.key) && evento.key !== 'Backspace' && evento.key !== 'Tab') {
    evento.preventDefault();
  }
};

const prevenirNumerosNoDecimales = (evento) => {
  const regex = /^[0-9.]$/;
  if (!regex.test(evento.key) && evento.key !== 'Backspace' && evento.key !== 'Tab') {
    evento.preventDefault();
  }
};

function parsearNumero(valor) {
  if (valor === undefined || valor === null || valor === '') return false;
  const numero = Number(valor);
  return isNaN(numero) ? false : numero;
}

export const useProductoForm = () => {
  const context = useContext(ProductoFormContext);
  if (!context) {
    throw new Error('useProductoForm debe usarse dentro de un ProductoFormProvider');
  }
  return context;
};

export const ProductoFormProvider = ({ children, alCerrarFormularioProducto }) => {
  const refInputArchivo = useRef();

  const [cargando, setCargando] = useState(false);

  const [alerta, setAlerta] = useState(null);

  const [variantes, setVariantes] = useState({
    1: {
      nombreVariante: '',
      descripcion: '',
      opciones: [],
    },
  });

  const [idsVariantes, setIdsVariantes] = useState([1]);
  const [siguienteIdImagen, setSiguienteIdImagen] = useState(1);

  const [producto, setProducto] = useState({
    nombreComun: '',
    nombreComercial: '',
    descripcion: '',
    marca: '',
    modelo: '',
    tipoProducto: '',
    precioPuntos: undefined,
    precioCliente: undefined,
    precioVenta: undefined,
    costo: undefined,
    impuesto: 16,
    descuento: 0,
    estado: 1,
    envio: undefined,
    idProveedor: undefined,
  });

  const [imagenes, setImagenes] = useState({
    imagenProducto: null,
    imagenesVariantes: {},
  });

  const { proveedores } = useConsultarProveedores();
  const { erroresProducto, erroresVariantes, guardarProducto } = useCrearProducto();

  const generarSKUAutomatico = useGenerarSKU();

  const manejarCrearVariante = useCallback(() => {
    // Buscar el menor número positivo no usado como ID
    const usados = new Set(idsVariantes);
    let nuevoId = 1;
    while (usados.has(nuevoId)) {
      nuevoId += 1;
    }

    setVariantes((prev) => ({
      ...prev,
      [nuevoId]: {
        nombreVariante: '',
        descripcion: '',
        opciones: [],
      },
    }));

    setIdsVariantes((prev) => [...prev, nuevoId].sort((id1, id2) => id1 - id2));

    setImagenes((prev) => ({
      ...prev,
      imagenesVariantes: {
        ...prev.imagenesVariantes,
        [nuevoId]: [],
      },
    }));
  }, [idsVariantes]);

  const manejarActualizarVariante = useCallback((idVariante, campo, valor) => {
    setVariantes((prev) => {
      if (prev[idVariante] && prev[idVariante][campo] === valor) {
        return prev;
      }

      return {
        ...prev,
        [idVariante]: {
          ...prev[idVariante],
          [campo]: valor,
        },
      };
    }, []);
  });

  const manejarEliminarVariante = useCallback((idVariante) => {
    setVariantes((prev) => {
      // Eliminar la variante
      const nuevasVariantes = { ...prev };
      delete nuevasVariantes[idVariante];

      // Reasignar los IDs para que sean consecutivos desde 1
      const idsRestantes = Object.keys(nuevasVariantes)
        .map(Number)
        .sort((id1, id2) => id1 - id2);

      const variantesReordenadas = {};
      idsRestantes.forEach((oldId, idx) => {
        variantesReordenadas[idx + 1] = { ...nuevasVariantes[oldId] };
      });

      return variantesReordenadas;
    });

    setImagenes((prev) => {
      // Eliminar imágenes de la variante eliminada
      const nuevasImagenesVariantes = { ...prev.imagenesVariantes };
      delete nuevasImagenesVariantes[idVariante];

      // Reasignar los IDs para que sean consecutivos desde 1
      const idsRestantes = Object.keys(nuevasImagenesVariantes)
        .map(Number)
        .sort((id1, id2) => id1 - id2);

      const imagenesReordenadas = {};
      idsRestantes.forEach((oldId, idx) => {
        imagenesReordenadas[idx + 1] = nuevasImagenesVariantes[oldId];
      });

      return {
        ...prev,
        imagenesVariantes: imagenesReordenadas,
      };
    });

    setIdsVariantes((prev) => {
      // Eliminar el ID y reasignar los IDs para que sean consecutivos desde 1
      const nuevosIds = prev
        .filter((id) => id !== idVariante)
        .sort((id1, id2) => id1 - id2)
        .map((unused, idx) => idx + 1);
      return nuevosIds;
    });

    setAlerta({
      tipo: 'success',
      mensaje: 'Variante eliminada',
    });
  }, []);

  const manejarAgregarOpcion = useCallback(
    (idVariante) => {
      setVariantes((prev) => {
        if (!prev[idVariante]) {
          return prev;
        }

        const nombreVariante = prev[idVariante].nombreVariante || '';
        const sku = generarSKUAutomatico(producto.nombreComun, nombreVariante, '');

        const nuevaOpcion = {
          id: Date.now(),
          cantidad: undefined,
          valorOpcion: '',
          SKUautomatico: sku,
          SKUcomercial: '',
          costoAdicional: 0,
          descuento: 0,
          estado: 1,
        };

        return {
          ...prev,
          [idVariante]: {
            ...prev[idVariante],
            opciones: [...(prev[idVariante].opciones || []), nuevaOpcion],
          },
        };
      });
    },
    [generarSKUAutomatico, producto.nombreComun]
  );

  const manejarActualizarOpcion = useCallback(
    (idVariante, indiceOpcion, campo, valor) => {
      setVariantes((prev) => {
        const varianteActual = prev[idVariante];
        if (!varianteActual) return prev;

        const opcionesActuales = varianteActual.opciones || [];

        if (indiceOpcion < 0 || indiceOpcion >= opcionesActuales.length) {
          return prev;
        }

        const opcionesActualizadas = [...opcionesActuales];

        if (campo === 'valorOpcion') {
          const nuevoSKU = generarSKUAutomatico(
            producto.nombreComun,
            varianteActual.nombreVariante,
            valor
          );

          opcionesActualizadas[indiceOpcion] = {
            ...opcionesActuales[indiceOpcion],
            [campo]: valor,
            SKUautomatico: nuevoSKU,
          };
        } else {
          opcionesActualizadas[indiceOpcion] = {
            ...opcionesActuales[indiceOpcion],
            [campo]: valor,
          };
        }

        return {
          ...prev,
          [idVariante]: {
            ...varianteActual,
            opciones: opcionesActualizadas,
          },
        };
      });
    },
    [generarSKUAutomatico, producto.nombreComun]
  );

  const manejarEliminarOpcion = useCallback((idVariante, indiceOpcion) => {
    setVariantes((prev) => {
      const varianteActual = prev[idVariante];
      // prettier-ignore
      if (
        !varianteActual 
        || !varianteActual.opciones 
        || indiceOpcion >= varianteActual.opciones.length
      ) {
        return prev;
      }

      const opcionesActualizadas = [
        ...varianteActual.opciones.slice(0, indiceOpcion),
        ...varianteActual.opciones.slice(indiceOpcion + 1),
      ];

      setAlerta({
        tipo: 'success',
        mensaje: 'Opción eliminada',
      });

      return {
        ...prev,
        [idVariante]: {
          ...varianteActual,
          opciones: opcionesActualizadas,
        },
      };
    });
  }, []);

  const manejarActualizarProducto = useCallback((evento) => {
    const { name, value } = evento.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  }, []);

  const manejarAgregarImagenVariante = useCallback(
    (idVariante, archivos) => {
      setImagenes((prev) => {
        const imagenesVariante = prev.imagenesVariantes[idVariante] || [];
        const nuevasImagenes = archivos.map((archivo) => ({
          id: `${archivo.name}_${uuidv4()}_${idVariante}`,
          idVariante,
          file: archivo,
        }));

        setSiguienteIdImagen(siguienteIdImagen + archivos.length);

        return {
          ...prev,
          imagenesVariantes: {
            ...prev.imagenesVariantes,
            [idVariante]: [...imagenesVariante, ...nuevasImagenes],
          },
        };
      });

      setAlerta({
        tipo: 'success',
        mensaje: `${
          archivos.length > 1 ? `${archivos.length} imágenes agregadas` : 'Imagen agregada'
        } a la variante`,
      });
    },
    [siguienteIdImagen]
  );

  const manejarEliminarImagenVariante = useCallback((idVariante, idImagen) => {
    setImagenes((prev) => {
      const imagenesVariante = prev.imagenesVariantes[idVariante] || [];

      return {
        ...prev,
        imagenesVariantes: {
          ...prev.imagenesVariantes,
          [idVariante]: imagenesVariante.filter((img) => img.id !== idImagen),
        },
      };
    });

    setAlerta({
      tipo: 'success',
      mensaje: 'Imagen eliminada',
    });
  }, []);

  const manejarCrearProducto = useCallback(async () => {
    const datosVariantes = Object.entries(variantes).map(([id, datos]) => ({
      identificador: id,
      nombreVariante: datos.nombreVariante,
      descripcion: datos.descripcion,
      opciones: datos.opciones.map((opcion) => ({
        cantidad: parsearNumero(opcion.cantidad),
        valorOpcion: opcion.valorOpcion,
        SKUautomatico: opcion.SKUautomatico || '',
        SKUcomercial: opcion.SKUcomercial || '',
        costoAdicional: parsearNumero(opcion.costoAdicional),
        descuento: parsearNumero(opcion.descuento),
        estado: Number(opcion.estado) || 1,
      })),
    }));

    const productoFormateado = {
      ...producto,
      precioPuntos: parsearNumero(producto.precioPuntos),
      precioCliente: parsearNumero(producto.precioCliente),
      precioVenta: parsearNumero(producto.precioVenta),
      costo: parsearNumero(producto.costo),
      impuesto: parsearNumero(producto.impuesto),
      descuento: parsearNumero(producto.descuento),
      estado: Number(producto.estado) || 1,
      envio: parsearNumero(producto.envio),
      idProveedor: parsearNumero(producto.idProveedor),
    };

    setAlerta({
      tipo: 'info',
      mensaje: 'Guardando producto...',
    });

    setCargando(true);

    try {
      const resultado = await guardarProducto({
        producto: productoFormateado,
        variantes: datosVariantes,
        imagenProducto: imagenes.imagenProducto,
        imagenesVariantes: imagenes.imagenesVariantes,
      });

      if (resultado?.exito) {
        const resumenProducto = `
        Producto ${producto.nombreComun} creado exitosamente.
        `;

        setAlerta({
          tipo: 'success',
          mensaje: resumenProducto,
        });

        setProducto({
          nombreComun: '',
          nombreComercial: '',
          descripcion: '',
          marca: '',
          modelo: '',
          tipoProducto: '',
          precioPuntos: undefined,
          precioCliente: undefined,
          precioVenta: undefined,
          costo: undefined,
          impuesto: 16,
          descuento: undefined,
          estado: 1,
          envio: 1,
          idProveedor: undefined,
        });

        setVariantes({
          1: {
            nombreVariante: '',
            descripcion: '',
            opciones: [],
          },
        });

        setIdsVariantes([1]);
        setSiguienteIdImagen(1);

        setImagenes({
          imagenProducto: null,
          imagenesVariantes: { 1: [] },
        });

        setTimeout(() => {
          alCerrarFormularioProducto();
        }, 2000);
      } else if (resultado?.mensaje) {
        setAlerta({
          tipo: 'error',
          mensaje: resultado.mensaje,
        });
      } else {
        setAlerta({
          tipo: 'error',
          mensaje: 'No se recibió respuesta del servidor al guardar el producto.',
        });
      }
    } catch {
      setAlerta({
        tipo: 'error',
        mensaje: 'Ocurrió un error inesperado al guardar el producto.',
      });
    } finally {
      setCargando(false);
    }
  }, [guardarProducto, imagenes, producto, variantes, alCerrarFormularioProducto]);

  const manejarAgregarImagenProducto = useCallback((evento) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    setImagenes((prev) => ({ ...prev, imagenProducto: archivo }));

    setAlerta({
      tipo: 'success',
      mensaje: 'Imagen agregada',
    });
  }, []);

  const listaProveedores = useMemo(
    () =>
      proveedores?.map((proveedor) => ({
        value: proveedor.idProveedor,
        label: `${proveedor.nombreCompania} - ${proveedor.nombre}`,
      })) || [],
    [proveedores]
  );

  useMemo(() => {
    setImagenes((prev) => {
      const imagenesActualizadas = { ...prev };

      idsVariantes.forEach((id) => {
        if (!imagenesActualizadas.imagenesVariantes[id]) {
          imagenesActualizadas.imagenesVariantes[id] = [];
        }
      });

      return imagenesActualizadas;
    });
  }, [idsVariantes]);

  const contextValue = {
    refInputArchivo,
    alerta,
    setAlerta,
    variantes,
    idsVariantes,
    producto,
    imagenes,
    setImagenes,
    erroresProducto,
    erroresVariantes,
    listaProveedores,
    cargando,
    manejarCrearVariante,
    manejarActualizarVariante,
    manejarEliminarVariante,
    manejarAgregarOpcion,
    manejarActualizarOpcion,
    manejarEliminarOpcion,
    manejarAgregarImagenVariante,
    manejarEliminarImagenVariante,
    manejarCrearProducto,
    manejarActualizarProducto,
    manejarAgregarImagenProducto,
    prevenirNumerosNegativos,
    prevenirNumerosNoDecimales,
  };

  return (
    <ProductoFormContext.Provider value={contextValue}>{children}</ProductoFormContext.Provider>
  );
};

export default ProductoFormProvider;
