import { useCallback, useMemo } from 'react';
import { Grid } from '@mui/material';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import FormularioOpcion from './FormularioOpcion';
import FormularioVariante from './FormularioVariante';

const FormularioVarianteOpcion = ({ variantes, setVariantes, estados, imagenes, setImagenes }) => {
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

  const agregarOpcion = useCallback(
    (varianteIndex) => {
      setVariantes((prevVariantes) => {
        const nuevasVariantes = [...prevVariantes];
        nuevasVariantes[varianteIndex].opciones.push({
          cantidad: '',
          valorOpcion: '',
          SKUautomatico: '',
          SKUcomercial: '',
          costoAdicional: '',
          descuento: '',
          estado: '',
        });
        return nuevasVariantes;
      });
    },
    [setVariantes]
  );

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

  const handleEliminarVariante = useCallback(
    (index) => {
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
    },
    [setVariantes, setImagenes]
  );

  const handleEliminarOpcion = useCallback(
    (varianteIndex, opcionIndex) => {
      setVariantes((prevVariantes) => {
        const nuevasVariantes = [...prevVariantes];
        nuevasVariantes[varianteIndex].opciones.splice(opcionIndex, 1);
        return nuevasVariantes;
      });
    },
    [setVariantes]
  );

  const tarjetasVariante = useMemo(() => {
    return variantes.map((variante, varianteIndex) => (
      <Grid container spacing={2} key={varianteIndex}>
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
        <Grid item size={12}>
          <TarjetaAccion
            icono='Add'
            texto='Agregar opción'
            onClick={() => agregarOpcion(varianteIndex)}
            hoverScale={false}
          />
        </Grid>
      </Grid>
    ));
  }, [
    variantes,
    imagenes,
    setImagenes,
    handleEliminarVariante,
    handleVarianteChange,
    estados,
    handleOpcionChange,
    handleEliminarOpcion,
    agregarOpcion,
  ]);

  return (
    <>
      {tarjetasVariante}
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
