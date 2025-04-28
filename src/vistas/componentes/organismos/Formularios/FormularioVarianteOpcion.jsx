import { useCallback } from 'react';
import { Grid } from '@mui/material';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import FormularioOpcion from './FormularioOpcion';
import FormularioVariante from './FormularioVariante';

const generarSKUautomatico = (proveedor, producto, varianteNombre = '') => {
  const clean = (str) =>
    str
      .toUpperCase()
      .replace(/\s+/g, '')
      .replace(/[^A-Z0-9]/g, '')
      .substring(0, 4);

  const proveedorParte = clean(proveedor.nombreCompania || proveedor.nombre);
  const marcaParte = clean(producto.marca);
  const modeloParte = clean(producto.modelo);
  const varianteParte = clean(varianteNombre);

  const randomParte = Math.floor(1000 + Math.random() * 9000);

  return `${proveedorParte}-${marcaParte}-${modeloParte}-${varianteParte}-${randomParte}`;
};

const FormularioVarianteOpcion = ({
  proveedor,
  producto,
  variantes,
  setVariantes,
  estados,
  imagenes,
  setImagenes,
}) => {
  console.log(variantes);

  const handleVarianteChange = useCallback(
    (index, e) => {
      const { name, value } = e.target;
      setVariantes((prevVariantes) =>
        prevVariantes.map((variante, i) =>
          i !== index ? variante : { ...variante, [name]: value }
        )
      );
    },
    [setVariantes]
  );

  const handleOpcionChange = useCallback(
    (varianteIndex, opcionIndex, evento) => {
      const { name, value } = evento.target;
      setVariantes((prev) =>
        prev.map((variante, vi) =>
          vi !== varianteIndex
            ? variante
            : {
                ...variante,
                opciones: variante.opciones.map((opcion, oi) =>
                  oi !== opcionIndex ? opcion : { ...opcion, [name]: value }
                ),
              }
        )
      );
    },
    [setVariantes]
  );

  const agregarOpcion = (varianteIndex) => {
    const nuevasVariantes = [...variantes];
    nuevasVariantes[varianteIndex].opciones.push({
      cantidad: '',
      valorOpcion: '',
      SKUautomatico: '',
      SKUcomercial: '',
      costoAdicional: '',
      descuento: '',
      estado: '',
    });
    setVariantes(nuevasVariantes);
  };

  const agregarVariante = () => {
    setVariantes((prev) => [
      ...prev,
      {
        nombreVariante: '',
        descripcion: '',
        opciones: [],
      },
    ]);
  };

  const handleEliminarVariante = (index) => {
    setVariantes((prev) => {
      const nuevasVariantes = [...prev];
      nuevasVariantes.splice(index, 1);
      return nuevasVariantes;
    });

    setImagenes((prev) => {
      const nuevasImagenesVariante = [...prev.imagenesVariante];
      nuevasImagenesVariante.splice(index, 1);
      return {
        ...prev,
        imagenesVariante: nuevasImagenesVariante,
      };
    });
  };

  const handleEliminarOpcion = (varianteIndex, opcionIndex) => {
    const nuevasVariantes = [...variantes];
    nuevasVariantes[varianteIndex].opciones.splice(opcionIndex, 1);
    setVariantes(nuevasVariantes);
  };

  return (
    <>
      {variantes.map((variante, varianteIndex) => (
        <Grid
          container
          spacing={2}
          sx={{
            mb: 6,
            borderTop: '2px solid',
            borderColor: 'primary.main',
            pt: 2,
          }}
          key={varianteIndex}
        >
          <FormularioVariante
            variante={variante}
            handleChange={(evento) => handleVarianteChange(varianteIndex, evento)}
            imagenes={imagenes}
            setImagenes={setImagenes}
            varianteIndex={varianteIndex}
            onEliminarVariante={handleEliminarVariante}
          />

          {variante.opciones.map((opcion, opcionIndex) => (
            <Grid item size={12} key={opcionIndex}>
              <FormularioOpcion
                variantes={opcion}
                handleChange={(evento) => handleOpcionChange(varianteIndex, opcionIndex, evento)}
                estados={estados}
                onEliminarOpcion={() => handleEliminarOpcion(varianteIndex, opcionIndex)}
              />
            </Grid>
          ))}
          <Grid
            item
            size={12}
            sx={{
              mt: 1,
            }}
          >
            <TarjetaAccion
              icono='Add'
              texto='Agregar opción'
              key={varianteIndex}
              onClick={() => agregarOpcion(varianteIndex)}
              hoverScale={false}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item size={12}>
        <TarjetaAccion
          icono='Add'
          texto='Agregar variante'
          onClick={agregarVariante}
          hoverScale={false}
        />
      </Grid>
    </>
  );
};

export default FormularioVarianteOpcion;
