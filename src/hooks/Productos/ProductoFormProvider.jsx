import { createContext, useContext, useState, useCallback, useMemo, useRef } from 'react';
import { useConsultarProveedores } from '@Hooks/Proveedores/useConsultarProveedores';
import { useCrearProducto } from '@Hooks/Productos/useCrearProducto';
import { useActualizarProducto } from '@Hooks/Productos/useActualizarProducto';
import { useGenerarSKU } from '@Hooks/Productos/useGenerarSKU';
import { v4 as uuidv4 } from 'uuid';
import { validarProducto } from '@Utilidades/Validaciones/validarProducto';
import { validarVariantes } from '@Utilidades/Validaciones/validarVariantes';

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
  const [intentosEnviar, setIntentosEnviar] = useState(0);
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
    descuento: undefined,
    estado: 1,
    envio: undefined,
    idProveedor: undefined,
  });

  const [imagenes, setImagenes] = useState({
    imagenProducto: null,
    imagenesVariantes: {},
  });
  const { proveedores } = useConsultarProveedores();
  const { guardarProducto } = useCrearProducto();
  const { actualizarProducto } = useActualizarProducto();

  // Estados para manejar los errores
  const [erroresProducto, setErroresProducto] = useState({});
  const [erroresVariantes, setErroresVariantes] = useState({});

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
    // Primero actualizar el estado de las variantes
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
    });

    // Luego, en una operación separada, validar y actualizar errores
    setTimeout(() => {
      setVariantes((variantesActuales) => {
        if (!variantesActuales[idVariante]) return variantesActuales;

        // Validar solo la variante actualizada
        const varianteParaValidar = {
          [idVariante]: {
            ...variantesActuales[idVariante],
            identificador: idVariante,
          },
        };

        const validacionPartial = validarVariantes(varianteParaValidar);

        // Actualizar errores de la variante específica
        setErroresVariantes((prevErrores) => {
          const nuevosErrores = { ...prevErrores };

          if (validacionPartial[idVariante] && validacionPartial[idVariante][campo]) {
            // Si hay un error para este campo en esta variante
            if (!nuevosErrores[idVariante]) {
              nuevosErrores[idVariante] = {};
            }
            nuevosErrores[idVariante][campo] = validacionPartial[idVariante][campo];
          } else if (nuevosErrores[idVariante]) {
            // Si no hay error, eliminarlo
            delete nuevosErrores[idVariante][campo];

            // Si la variante no tiene más errores, eliminar la entrada
            if (Object.keys(nuevosErrores[idVariante]).length === 0) {
              delete nuevosErrores[idVariante];
            }
          }

          return nuevosErrores;
        });

        // No modificar el estado, solo devolver el actual
        return variantesActuales;
      });
    }, 0);
  }, []);

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
          cantidad: 1,
          valorOpcion: '',
          SKUautomatico: sku,
          SKUcomercial: '',
          costoAdicional: undefined,
          descuento: undefined,
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

        const nuevasVariantes = {
          ...prev,
          [idVariante]: {
            ...varianteActual,
            opciones: opcionesActualizadas,
          },
        };

        // Validar solo la variante actualizada
        const varianteParaValidar = {
          [idVariante]: {
            ...nuevasVariantes[idVariante],
            identificador: idVariante,
          },
        };

        const validacionPartial = validarVariantes(varianteParaValidar);

        // Actualizar errores de la opción específica
        setErroresVariantes((prevErrores) => {
          const nuevosErrores = { ...prevErrores };

          if (
            validacionPartial[idVariante] &&
            validacionPartial[idVariante].opciones &&
            validacionPartial[idVariante].opciones[indiceOpcion] &&
            validacionPartial[idVariante].opciones[indiceOpcion][campo]
          ) {
            // Asegurarse de que existe la estructura para guardar el error
            if (!nuevosErrores[idVariante]) {
              nuevosErrores[idVariante] = { opciones: {} };
            } else if (!nuevosErrores[idVariante].opciones) {
              nuevosErrores[idVariante].opciones = {};
            }

            if (!nuevosErrores[idVariante].opciones[indiceOpcion]) {
              nuevosErrores[idVariante].opciones[indiceOpcion] = {};
            }

            // Guardar el error de este campo específico
            nuevosErrores[idVariante].opciones[indiceOpcion][campo] =
              validacionPartial[idVariante].opciones[indiceOpcion][campo];
          } else if (
            nuevosErrores[idVariante] &&
            nuevosErrores[idVariante].opciones &&
            nuevosErrores[idVariante].opciones[indiceOpcion]
          ) {
            // Eliminar el error si ya no existe
            delete nuevosErrores[idVariante].opciones[indiceOpcion][campo];

            // Limpiar la estructura si ya no hay errores
            if (Object.keys(nuevosErrores[idVariante].opciones[indiceOpcion]).length === 0) {
              delete nuevosErrores[idVariante].opciones[indiceOpcion];
            }

            if (Object.keys(nuevosErrores[idVariante].opciones).length === 0) {
              delete nuevosErrores[idVariante].opciones;
            }

            if (Object.keys(nuevosErrores[idVariante]).length === 0) {
              delete nuevosErrores[idVariante];
            }
          }

          return nuevosErrores;
        });

        return nuevasVariantes;
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
  }, []); // Esta función se usa para actualizar y validar un campo individual del producto
  const manejarActualizarProducto = useCallback(
    (evento) => {
      const { name, value } = evento.target;

      // Actualizar el estado del producto sin console.log
      setProducto((prev) => {
        // No necesitamos duplicar la validación del estado previo
        return { ...prev, [name]: value };
      });

      // Posponemos la validación para que se ejecute después de que el estado se haya actualizado
      // pero evitamos usar setTimeout que puede causar problemas
      requestAnimationFrame(() => {
        // Validar solo el campo que se está actualizando
        const campoParaValidar = { [name]: value };
        const validacionPartial = validarProducto({ ...producto, ...campoParaValidar });

        // Actualizar solo el error del campo específico
        setErroresProducto((prevErrores) => {
          const nuevosErrores = { ...prevErrores };

          // Si hay un error para este campo, actualizarlo
          if (validacionPartial[name]) {
            nuevosErrores[name] = validacionPartial[name];
          } else {
            // Si no hay error, eliminarlo de la lista de errores
            delete nuevosErrores[name];
          }

          return nuevosErrores;
        });
      });
    },
    [producto]
  );

  // Esta función se usa para guardar el producto actualizado cuando se presiona "Guardar"
  const manejarGuardarProductoActualizado = useCallback(async () => {
    try {
      setCargando(true);

      // Validate that we have a product ID
      if (!producto.idProducto) {
        setAlerta({
          tipo: 'error',
          mensaje:
            'El ID del producto es requerido para actualizar. Por favor, asegúrate de seleccionar un producto válido.',
        });
        setCargando(false);
        return;
      }

      // Validar tamaño de imágenes primero
      const tamanioMaximoBytes = 5 * 1024 * 1024;
      let erroresImagenes = {};

      // Validar imagen principal
      if (imagenes.imagenProducto && imagenes.imagenProducto.size > tamanioMaximoBytes) {
        erroresImagenes.imagenProducto =
          'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.';
      }

      // Validar imágenes de variantes
      Object.entries(imagenes.imagenesVariantes).forEach(([idVariante, imagenesVariante]) => {
        const imagenesGrandes = imagenesVariante.filter(
          (img) => img.file && img.file.size > tamanioMaximoBytes
        );
        if (imagenesGrandes.length > 0) {
          if (!erroresImagenes.variantes) erroresImagenes.variantes = {};
          erroresImagenes.variantes[
            idVariante
          ] = `${imagenesGrandes.length} imagen(es) excede(n) el tamaño máximo de 5MB.`;
        }
      });

      setAlerta({
        tipo: 'info',
        mensaje: 'Validando datos del producto...',
      });

      // Validar datos del producto
      const erroresValidacionProducto = validarProducto(producto);

      // Validar datos de las variantes
      const erroresValidacionVariantes = validarVariantes(variantes);

      // Combinar todos los errores
      const hayErroresImagenes = Object.keys(erroresImagenes).length > 0;
      const hayErroresProducto = Object.keys(erroresValidacionProducto).length > 0;
      const hayErroresVariantes = Object.keys(erroresValidacionVariantes).length > 0;

      // Actualizar estados de error
      setErroresProducto({
        ...erroresValidacionProducto,
        ...(erroresImagenes.imagenProducto && { imagenProducto: erroresImagenes.imagenProducto }),
      });

      setErroresVariantes((prev) => ({
        ...erroresValidacionVariantes,
        ...(erroresImagenes.variantes || {}),
      }));

      // Si hay errores, mostrar mensaje y detener el proceso
      if (hayErroresImagenes || hayErroresProducto || hayErroresVariantes) {
        setIntentosEnviar((prev) => prev + 1);

        let mensajeError = 'Por favor revisa los siguientes campos:';

        if (hayErroresProducto || erroresImagenes.imagenProducto) {
          const camposConErrores = [
            ...Object.keys(erroresValidacionProducto),
            ...(erroresImagenes.imagenProducto ? ['imagen principal'] : []),
          ].join(', ');
          mensajeError += `\n- Datos del producto: ${camposConErrores}`;
        }

        if (hayErroresVariantes || erroresImagenes.variantes) {
          mensajeError += '\n- Hay errores en una o más variantes y sus opciones';
        }

        setAlerta({
          tipo: 'error',
          mensaje: mensajeError,
        });
        setCargando(false);
        return;
      }

      // Validar estructura básica del producto
      if (!imagenes.imagenProducto) {
        setAlerta({
          tipo: 'error',
          mensaje: 'Debes seleccionar una imagen principal para el producto.',
        });
        setCargando(false);
        return;
      }

      const variantesArray = Object.entries(variantes).map(([idVariante, datos]) => ({
        identificador: idVariante,
        ...datos,
      }));

      if (!variantesArray.length) {
        setAlerta({
          tipo: 'error',
          mensaje: 'Debes agregar al menos una variante al producto.',
        });
        setCargando(false);
        return;
      }

      const variantesSinOpciones = variantesArray.filter(
        (variante) => !Array.isArray(variante.opciones) || variante.opciones.length === 0
      );

      if (variantesSinOpciones.length > 0) {
        setAlerta({
          tipo: 'error',
          mensaje: 'Cada variante debe incluir al menos una opción disponible.',
        });
        setCargando(false);
        return;
      } // Si llegamos aquí, todo está validado. Proceder con la actualización
      setAlerta({
        tipo: 'info',
        mensaje: 'Actualizando producto...',
      });

      try {
        // Formateamos los datos para la actualización
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
          idProducto: producto.idProducto, // Ensure idProducto is included
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

        // Llamada a la API para actualizar el producto
        const resultado = await actualizarProducto({
          productoRaw: productoFormateado,
          variantesRaw: datosVariantes,
          imagenProducto: imagenes.imagenProducto,
          imagenesVariantes: imagenes.imagenesVariantes,
        });

        // Si la actualización fue exitosa
        if (resultado?.exito) {
          setAlerta({
            tipo: 'success',
            mensaje: 'Producto actualizado con éxito',
          });

          // Después de un breve retraso, cerrar el formulario
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
            tipo: 'success',
            mensaje: 'Producto actualizado con éxito',
          });

          // Después de un breve retraso, cerrar el formulario
          setTimeout(() => {
            alCerrarFormularioProducto();
          }, 2000);
        }

        // No cerramos el modal aquí, dejamos que el useEffect en FormularioModal se encargue
        // después de mostrar el mensaje de éxito por un momento
      } catch (error) {
        console.error('Error en la comunicación con el servidor:', error);
        setAlerta({
          tipo: 'error',
          mensaje: 'Error al comunicarse con el servidor',
        });
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      setAlerta({
        tipo: 'error',
        mensaje: `Ocurrió un error al actualizar el producto: ${
          error.message || 'Error desconocido'
        }`,
      });
    } finally {
      setCargando(false);
    }
  }, [producto, variantes, imagenes, alCerrarFormularioProducto, actualizarProducto]);

  const manejarAgregarImagenVariante = useCallback(
    (idVariante, archivos) => {
      // Tamaño máximo permitido: 5MB (5 * 1024 * 1024 bytes)
      const tamanioMaximoBytes = 5 * 1024 * 1024;

      // Verificar cada archivo por tamaño
      const archivosSobredimensionados = archivos.filter(
        (archivo) => archivo.size > tamanioMaximoBytes
      );

      if (archivosSobredimensionados.length > 0) {
        const mensajeError =
          archivosSobredimensionados.length > 1
            ? `${archivosSobredimensionados.length} imágenes exceden el tamaño máximo de 5MB.`
            : 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.';

        setAlerta({
          tipo: 'error',
          mensaje: mensajeError,
        });

        // Añadir error a la variante específica
        setErroresVariantes((prevErrores) => {
          const nuevosErrores = { ...prevErrores };
          if (!nuevosErrores[idVariante]) {
            nuevosErrores[idVariante] = {};
          }
          nuevosErrores[idVariante].imagenes = mensajeError;
          return nuevosErrores;
        });

        // Si hay archivos válidos, continuamos con ellos
        if (archivosSobredimensionados.length === archivos.length) {
          return; // Si todos los archivos exceden el tamaño, no hacemos nada
        }
      } else {
        // Limpiar errores de imágenes para esta variante si todos los archivos son válidos
        setErroresVariantes((prevErrores) => {
          const nuevosErrores = { ...prevErrores };
          if (nuevosErrores[idVariante]?.imagenes) {
            delete nuevosErrores[idVariante].imagenes;
            if (Object.keys(nuevosErrores[idVariante]).length === 0) {
              delete nuevosErrores[idVariante];
            }
          }
          return nuevosErrores;
        });
      }

      // Filtrar solo los archivos que no exceden el tamaño
      const archivosValidos = archivos.filter((archivo) => archivo.size <= tamanioMaximoBytes);

      if (archivosValidos.length === 0) return;

      setImagenes((prev) => {
        const imagenesVariante = prev.imagenesVariantes[idVariante] || [];
        const nuevasImagenes = archivosValidos.map((archivo) => ({
          id: `${archivo.name}_${uuidv4()}_${idVariante}`,
          idVariante,
          file: archivo,
        }));

        setSiguienteIdImagen(siguienteIdImagen + archivosValidos.length);

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
          archivosValidos.length > 1
            ? `${archivosValidos.length} imágenes agregadas`
            : 'Imagen agregada'
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

    // Tamaño máximo permitido: 5MB (5 * 1024 * 1024 bytes)
    const tamanioMaximoBytes = 5 * 1024 * 1024;

    if (archivo.size > tamanioMaximoBytes) {
      // Mostrar alerta de error y no actualizar la imagen
      setAlerta({
        tipo: 'error',
        mensaje: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.',
      });

      // Añadir error específico para la imagen
      setErroresProducto((prevErrores) => ({
        ...prevErrores,
        imagenProducto: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.',
      }));

      // No actualizar la imagen si excede el tamaño
      evento.target.value = '';
      return;
    }

    // Limpiar cualquier error de imagen anterior
    setErroresProducto((prevErrores) => {
      const nuevosErrores = { ...prevErrores };
      delete nuevosErrores.imagenProducto;
      return nuevosErrores;
    });

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
  }, [idsVariantes]); // Función para inicializar los datos del formulario a partir de detalleProducto
  const inicializarDatosProducto = useCallback(
    (detalleProducto) => {
      if (!detalleProducto) return;

      // Resetear estados de errores al inicializar un producto
      setErroresProducto({});
      setErroresVariantes({});
      setIntentosEnviar(0);

      // Inicializar datos básicos del producto
      setProducto({
        idProducto: detalleProducto.idProducto, // Ensure idProducto is included
        nombreComun: detalleProducto.nombreComun || '',
        nombreComercial: detalleProducto.nombreComercial || '',
        descripcion: detalleProducto.descripcion || '',
        marca: detalleProducto.marca || '',
        modelo: detalleProducto.modelo || '',
        tipoProducto: detalleProducto.tipoProducto || '',
        precioPuntos: detalleProducto.precioPuntos || undefined,
        precioCliente: detalleProducto.precioCliente || undefined,
        precioVenta: detalleProducto.precioVenta || undefined,
        costo: detalleProducto.costo || undefined,
        impuesto: detalleProducto.impuesto || 16,
        descuento: detalleProducto.descuento || undefined,
        estado: detalleProducto.estado || 1,
        envio: detalleProducto.envio || 1,
        idProveedor: detalleProducto.idProveedor || undefined,
      });

      // Inicializar las variantes si existen
      if (detalleProducto.variantes && detalleProducto.variantes.length > 0) {
        // Transformar el arreglo de variantes a un objeto con idVariante como clave
        const variantesObj = {};
        const varianteIds = [];

        detalleProducto.variantes.forEach((variante) => {
          const idVariante = variante.idVariante;
          varianteIds.push(idVariante);

          variantesObj[idVariante] = {
            nombreVariante: variante.nombreVariante || '',
            descripcion: variante.descripcion || '',
            opciones:
              variante.opciones?.map((opcion) => ({
                id: Date.now() + Math.random(),
                cantidad: opcion.cantidad || 0,
                valorOpcion: opcion.valorOpcion || '',
                SKUautomatico: opcion.SKUautomatico || '',
                SKUcomercial: opcion.SKUcomercial || '',
                costoAdicional: opcion.costoAdicional || undefined,
                descuento: opcion.descuento || undefined,
                estado: opcion.estado || 1,
              })) || [],
          };
        });

        setVariantes(variantesObj);
        setIdsVariantes(varianteIds);

        // Inicializar el objeto de imágenes para cada variante
        const nuevasImagenes = {
          imagenProducto: detalleProducto.imagenProducto || null,
          imagenesVariantes: {},
        };

        varianteIds.forEach((id) => {
          nuevasImagenes.imagenesVariantes[id] = [];
        });

        setImagenes(nuevasImagenes);
      } else {
        // Si no hay variantes, inicializar con una variante vacía
        setVariantes({
          1: {
            nombreVariante: '',
            descripcion: '',
            opciones: [],
          },
        });

        setIdsVariantes([1]);

        setImagenes({
          imagenProducto: null,
          imagenesVariantes: { 1: [] },
        });
      }
    },
    [setErroresProducto, setErroresVariantes, setIntentosEnviar]
  );
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
    intentosEnviar,
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
    manejarGuardarProductoActualizado,
    manejarAgregarImagenProducto,
    prevenirNumerosNegativos,
    prevenirNumerosNoDecimales,
    inicializarDatosProducto,
  };

  return (
    <ProductoFormContext.Provider value={contextValue}>{children}</ProductoFormContext.Provider>
  );
};

export default ProductoFormProvider;
