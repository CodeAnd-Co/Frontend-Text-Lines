import Contenedor from '../atomos/Contenedor';
import Texto from '../atomos/Texto';
import CampoTexto from '../atomos/CampoTexto';

const FormaCrearCuotaSet = ({
  nombreCuotaSet,
  setNombreCuotaSet,
  descripcionCuotaSet,
  setDescripcionCuotaSet,
}) => {
  return (
    <Contenedor
      elevation={0}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Texto variant={'h6'}>Nombre del Set</Texto>
      <CampoTexto
        label={'Nombre'}
        fullWidth
        type={'text'}
        value={nombreCuotaSet}
        onChange={(e) => setNombreCuotaSet(e.target.value)}
      />

      <Contenedor elevation={1} sx={{ width: '100%', height: '330px', mt: 2, mb: 2 }} />

      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionCuotaSet}
        onChange={(e) => setDescripcionCuotaSet(e.target.value)}
      />
    </Contenedor>
  );
};

export default FormaCrearCuotaSet;
