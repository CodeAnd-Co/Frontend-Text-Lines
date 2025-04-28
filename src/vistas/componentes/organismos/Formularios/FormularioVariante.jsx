import { Grid } from '@mui/material';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import TarjetaElementoAccion from '../../Moleculas/TarjetaElementoAccion';
import CamposVariante from './CamposVariante';
import FormularioOpcion from './FormularioOpcion';

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

const FormularioVariante = ({ proveedor, producto, variantes, setVariantes, estados }) => {
  console.log(variantes);
  const handleVarianteChange = (index, e) => {
    const { name, value } = e.target;
    const nuevasVariantes = [...variantes];
    nuevasVariantes[index][name] = value;
    setVariantes(nuevasVariantes);
  };

  const handleOpcionChange = (varianteIndex, opcionIndex, e) => {
    const { name, value } = e.target;
    const nuevasVariantes = [...variantes];
    nuevasVariantes[varianteIndex].opciones[opcionIndex][name] = value;
    setVariantes(nuevasVariantes);
  };

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

  return (
    <>
      {variantes.map((variante, varianteIndex) => (
        <Grid
          item
          size={12}
          key={varianteIndex}
          sx={{
            mt: 2,
            mb: 2,
            padding: 2,
          }}
        >
          <Grid container spacing={2}>
            <CamposVariante
              variante={variante}
              handleChange={(e) => handleVarianteChange(varianteIndex, e)}
              onAgregarImagen={() => console.log('Agregar nueva imagen a variante')}
            />

            {[1, 2].map((i) => (
              <Grid item size={12} key={i}>
                <TarjetaElementoAccion
                  icono='Image'
                  texto='toyota.png'
                  onEliminar={() => {}}
                  tooltipEliminar='Eliminar'
                  borderColor='primary.light'
                  backgroundColor='primary.lighter'
                  iconColor='primary'
                  iconSize='large'
                  textoVariant='caption'
                  tabIndex={0}
                  disabled={false}
                />
              </Grid>
            ))}

            {variante.opciones.map((opcion, opcionIndex) => (
              <Grid item size={12} key={opcionIndex}>
                <FormularioOpcion
                  variantes={opcion}
                  handleChange={(e) => handleOpcionChange(varianteIndex, opcionIndex, e)}
                  estados={estados}
                  onAgregarOpcion={() => agregarOpcion(varianteIndex)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid
            item
            size={12}
            sx={{
              mt: 3,
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

export default FormularioVariante;
