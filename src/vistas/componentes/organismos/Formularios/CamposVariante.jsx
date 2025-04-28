import { Grid } from '@mui/material';
import CampoTexto from '../../Atomos/CampoTexto';
import Texto from '../../Atomos/Texto';
import TarjetaAccion from '../../moleculas/TarjetaAccion';

const CamposVariante = ({ variante, handleChange, onAgregarImagen }) => {
  return (
    <>
      <Grid item size={12}>
        <Texto variant='h6'>Variante de Producto</Texto>
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='Nombre'
          name='nombreVariante'
          value={variante.nombreVariante || ''}
          onChange={handleChange}
          required
          placeholder='Ingresa el nombre de la variante'
        />
      </Grid>

      <Grid item size={6}>
        <CampoTexto
          label='Descripción'
          name='descripcion'
          value={variante.descripcion || ''}
          onChange={handleChange}
          required
          placeholder='Ingresa la descripción de la variante'
        />
      </Grid>

      <Grid item size={12}>
        <TarjetaAccion
          icono='AddPhotoAlternate'
          texto='Agregar imagen'
          onClick={onAgregarImagen}
          hoverScale={false}
        />
      </Grid>
    </>
  );
};

export default CamposVariante;
