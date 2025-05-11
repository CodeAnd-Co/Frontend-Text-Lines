//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo, useRef, useMemo, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';
import TarjetaAccion from '@Moleculas/TarjetaAccion';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import CamposVariante from '@Organismos/Formularios/CamposVariante';
import CamposProducto from '@Organismos/Formularios/CamposProducto';
import { useConsultarProveedores } from '@Hooks/Proveedores/useConsultarProveedores';
import { useCrearProducto } from '@Hooks/Productos/useCrearProducto';

const TituloFormulario = memo(({ titulo, varianteTitulo, tamano = 12 }) => (
  <Grid size={tamano} overflow='hidden'>
    <Texto variant={varianteTitulo} gutterBottom>
      {titulo}
    </Texto>
  </Grid>
));

const CampoCrear = memo(({ etiqueta, onClick }) => (
  <Grid size={12}>
    <TarjetaAccion icono='Add' texto={etiqueta} onClick={onClick} hoverScale={false} />
  </Grid>
));

const FormularioProducto = memo(
  ({ formularioAbierto, alMostrarFormularioProveedor, alCerrarFormularioProducto }) => {
    const refInputArchivo = useRef();

    const [alerta, setAlerta] = useState(null);

    const [variantes, setVariantes] = useState({
      1: {
        nombreVariante: '',
        descripcion: '',
        opciones: [],
      },
    });

    const [idsVariantes, setIdsVariantes] = useState([1]);
    const [siguienteIdVariante, setSiguienteIdVariante] = useState(2);
    const [siguienteIdImagen, setSiguienteIdImagen] = useState(1);

    const [producto, setProducto] = useState({
      nombreComun: '',
      nombreComercial: '',
      descripcion: '',
      marca: '',
      modelo: '',
      tipoProducto: '',
      precioPuntos: 0,
      precioCliente: 0,
      precioVenta: 0,
      costo: 0,
      impuesto: 16,
      descuento: 0,
      estado: 1,
      envio: 1,
      idProveedor: -1,
    });

    const [imagenes, setImagenes] = useState({
      imagenProducto: null,
      imagenesVariantes: {},
    });

    const { proveedores } = useConsultarProveedores();
    const { erroresProducto, erroresVariantes, guardarProducto } = useCrearProducto();

    const manejarCrearVariante = useCallback(() => {
      const nuevoId = siguienteIdVariante;

      setVariantes((prev) => ({
        ...prev,
        [nuevoId]: {
          nombreVariante: '',
          descripcion: '',
          opciones: [],
        },
      }));

      setIdsVariantes((prev) => [...prev, nuevoId]);

      setImagenes((prev) => ({
        ...prev,
        imagenesVariantes: {
          ...prev.imagenesVariantes,
          [nuevoId]: [],
        },
      }));

      setSiguienteIdVariante((prev) => prev + 1);
    }, [siguienteIdVariante]);

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
      });
    }, []);

    const manejarEliminarVariante = useCallback((idVariante) => {
      setVariantes((prev) => {
        const nuevasVariantes = { ...prev };
        delete nuevasVariantes[idVariante];
        return nuevasVariantes;
      });

      setImagenes((prev) => {
        const nuevasImagenesVariantes = { ...prev.imagenesVariantes };
        delete nuevasImagenesVariantes[idVariante];
        return {
          ...prev,
          imagenesVariantes: nuevasImagenesVariantes,
        };
      });

      setAlerta({
        tipo: 'success',
        mensaje: 'Variante eliminada',
      });

      setIdsVariantes((prev) => prev.filter((id) => id !== idVariante));
    }, []);

    const manejarAgregarOpcion = useCallback((idVariante) => {
      setVariantes((prev) => {
        if (!prev[idVariante]) {
          return prev;
        }

        const nuevaOpcion = {
          id: Date.now(),
          cantidad: 0,
          valorOpcion: '',
          SKUautomatico: '',
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
    }, []);

    const manejarActualizarOpcion = useCallback((idVariante, indiceOpcion, campo, valor) => {
      setVariantes((prev) => {
        const varianteActual = prev[idVariante];
        if (!varianteActual) return prev;

        const opcionesActuales = varianteActual.opciones || [];

        if (indiceOpcion < 0 || indiceOpcion >= opcionesActuales.length) {
          return prev;
        }

        const opcionesActualizadas = [...opcionesActuales];
        opcionesActualizadas[indiceOpcion] = {
          ...opcionesActuales[indiceOpcion],
          [campo]: valor,
        };

        return {
          ...prev,
          [idVariante]: {
            ...varianteActual,
            opciones: opcionesActualizadas,
          },
        };
      });
    }, []);

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

    const manejarAgregarImagenVariante = useCallback(
      (idVariante, archivos) => {
        setImagenes((prev) => {
          const imagenesVariante = prev.imagenesVariantes[idVariante] || [];
          const nuevasImagenes = archivos.map((archivo) => ({
            id: `${archivo.name}_${idVariante}`,
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
          cantidad: Number(opcion.cantidad) || 0,
          valorOpcion: opcion.valorOpcion,
          SKUautomatico: opcion.SKUautomatico || '',
          SKUcomercial: opcion.SKUcomercial || '',
          costoAdicional: Number(opcion.costoAdicional) || 0,
          descuento: Number(opcion.descuento) || 0,
          estado: Number(opcion.estado) || 1,
        })),
      }));

      const productoFormateado = {
        ...producto,
        precioPuntos: Number(producto.precioPuntos) || 0,
        precioCliente: Number(producto.precioCliente) || 0,
        precioVenta: Number(producto.precioVenta) || 0,
        costo: Number(producto.costo) || 0,
        impuesto: Number(producto.impuesto) || 16,
        descuento: Number(producto.descuento) || 0,
        estado: Number(producto.estado) || 1,
        envio: Number(producto.envio),
        idProveedor: Number(producto.idProveedor),
      };

      setAlerta({
        tipo: 'info',
        mensaje: 'Guardando producto...',
      });

      const resultado = await guardarProducto({
        producto: productoFormateado,
        variantes: datosVariantes,
        imagenProducto: imagenes.imagenProducto,
        imagenesVariantes: imagenes.imagenesVariantes,
      });

      if (resultado?.mensaje) {
        if (resultado.exito) {
          const resumenProducto = `
          Producto ${producto.nombreComun} creado exitosamente.
        `;

          setAlerta({
            tipo: 'success',
            mensaje: resumenProducto,
          });

          setTimeout(() => {
            setProducto({
              nombreComun: '',
              nombreComercial: '',
              descripcion: '',
              marca: '',
              modelo: '',
              tipoProducto: '',
              precioPuntos: 0,
              precioCliente: 0,
              precioVenta: 0,
              costo: 0,
              impuesto: 16,
              descuento: 0,
              estado: 1,
              envio: 1,
              idProveedor: -1,
            });

            setVariantes({
              1: {
                nombreVariante: '',
                descripcion: '',
                opciones: [],
              },
            });

            setIdsVariantes([1]);
            setSiguienteIdVariante(2);
            setSiguienteIdImagen(1);

            setImagenes({
              imagenProducto: null,
              imagenesVariantes: { 1: [] },
            });

            alCerrarFormularioProducto();
          }, 2000);
        } else {
          setAlerta({
            tipo: 'error',
            mensaje: resultado.mensaje,
          });
        }
      }
    }, [guardarProducto, imagenes, producto, variantes, alCerrarFormularioProducto]);

    const manejarActualizarProducto = useCallback((evento) => {
      const { name, value } = evento.target;
      setProducto((prev) => ({ ...prev, [name]: value }));
    }, []);

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

    return (
      <>
        <ModalFlotante
          open={formularioAbierto}
          onClose={alCerrarFormularioProducto}
          onConfirm={manejarCrearProducto}
          titulo='Crear Producto'
          confirmLabel='Guardar'
          cancelLabel='Cerrar'
        >
          <Box
            component='form'
            method='POST'
            noValidate
            autoComplete='off'
            sx={{
              flexGrow: 1,
              '& .MuiTextField-root': { margin: 1, width: '30ch' },
              '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
              mt: 3,
              mb: 3,
            }}
          >
            <Grid container spacing={2}>
              <CamposProducto
                producto={producto}
                imagenProducto={imagenes.imagenProducto}
                refInputArchivo={refInputArchivo}
                erroresProducto={erroresProducto}
                listaProveedores={listaProveedores}
                alActualizarProducto={manejarActualizarProducto}
                alAgregarImagenProducto={manejarAgregarImagenProducto}
                setImagenes={setImagenes}
                alMostrarFormularioProveedor={alMostrarFormularioProveedor}
              />

              <TituloFormulario titulo='Datos de las Variantes' varianteTitulo='h6' />

              {idsVariantes.map((idVariante) => (
                <CamposVariante
                  key={`variante-${idVariante}`}
                  varianteId={idVariante}
                  variante={
                    variantes[idVariante] || { nombreVariante: '', descripcion: '', opciones: [] }
                  }
                  imagenesVariante={imagenes.imagenesVariantes[idVariante] || []}
                  erroresVariantes={erroresVariantes}
                  alActualizarVariante={manejarActualizarVariante}
                  alEliminarVariante={manejarEliminarVariante}
                  alAgregarOpcion={manejarAgregarOpcion}
                  alActualizarOpcion={manejarActualizarOpcion}
                  alEliminarOpcion={manejarEliminarOpcion}
                  alAgregarImagenVariante={manejarAgregarImagenVariante}
                  alEliminarImagenVariante={manejarEliminarImagenVariante}
                />
              ))}

              <CampoCrear etiqueta='Crear Variante' onClick={manejarCrearVariante} />
            </Grid>
          </Box>
        </ModalFlotante>

        {alerta && (
          <Alerta
            sx={{ marginBottom: 2 }}
            tipo={alerta.tipo}
            mensaje={alerta.mensaje}
            duracion='2000'
            centradoInferior={true}
            onClose={() => setAlerta(null)}
          />
        )}
      </>
    );
  }
);

export default FormularioProducto;
