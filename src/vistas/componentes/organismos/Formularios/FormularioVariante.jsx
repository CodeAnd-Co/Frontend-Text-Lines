import { memo } from 'react';
import { Box, Grid } from '@mui/material';
import CampoTexto from '../../Atomos/CampoTexto';
import Texto from '../../Atomos/Texto';
import Icono from '../../Atomos/Icono';
import TarjetaAccion from '../../moleculas/TarjetaAccion';
import TarjetaElementoAccion from '../../Moleculas/TarjetaElementoAccion';

const FormularioVariante = memo(
  ({ variante, handleChange, imagenes, setImagenes, varianteIndex, onEliminarVariante }) => {
    const onAgregarImagen = () => {
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';
      fileInput.onchange = (evento) => {
        const file = evento.target.files[0];
        if (file) {
          setImagenes((prevState) => {
            const newVariantes = [...prevState.imagenesVariante];
            newVariantes[varianteIndex] = newVariantes[varianteIndex] || [];
            newVariantes[varianteIndex].push(file);
            return {
              ...prevState,
              imagenesVariante: newVariantes,
            };
          });
        }
      };
      fileInput.click();
    };

    return (
      <>
        <Grid item size={12}>
          <Box display='flex' alignItems='center'>
            <Texto variant='h6'>Variante de Producto</Texto>
            <Icono
              nombre='Cancel'
              color='error'
              clickable={true}
              tooltip='Eliminar Variante'
              onClick={() => onEliminarVariante(varianteIndex)}
            />
          </Box>
        </Grid>

        <Grid item size={6}>
          <CampoTexto
            label='Nombre'
            name='nombreVariante'
            value={variante.nombreVariante || ''}
            onChange={handleChange}
            size='medium'
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
            size='medium'
            required
            placeholder='Ingresa la descripción de la variante'
          />
        </Grid>

        <Grid item size={12}>
          <Texto variant='h6'>Sube las Imágenes de las Variantes</Texto>
        </Grid>

        <Grid item size={12}>
          <TarjetaAccion
            icono='AddPhotoAlternate'
            texto='Agregar imagen'
            onClick={onAgregarImagen}
            hoverScale={false}
          />
        </Grid>

        {imagenes?.imagenesVariante[varianteIndex]?.map((image, index) => (
          <Grid item size={6} key={index}>
            <TarjetaElementoAccion
              icono='Image'
              texto={image.name}
              onEliminar={() => {
                setImagenes((prevState) => {
                  const newVariantes = [...prevState.imagenesVariante];
                  newVariantes[varianteIndex] = [...newVariantes[varianteIndex]];
                  newVariantes[varianteIndex].splice(index, 1);
                  return {
                    ...prevState,
                    imagenesVariante: newVariantes,
                  };
                });
              }}
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
      </>
    );
  }
);

export default FormularioVariante;
