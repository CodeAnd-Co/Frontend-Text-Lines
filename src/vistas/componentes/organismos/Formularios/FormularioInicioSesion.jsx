import { useState } from 'react';
import Box from '@mui/material/Box';
import Texto from '../../atomos/Texto';
import CampoTexto from '../../atomos/CampoTexto';
import Contenedor from '../../atomos/Contenedor';
import Imagen from '../../atomos/Imagen';
import Cargador from '../../atomos/Cargador';
import Boton from '../../atomos/Boton';
import Alerta from '../../moleculas/Alerta';

const estilosContenedorFormulario = {
  width: 650,
  maxWidth: '90%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '10px',
  padding: 10,
};

const estilosFormulario = {
  width: '100%',
};

const estilosLogo = {
  maxWidth: '345px',
};

const estilosTitulo = {
  margin: '2rem 0',
};

const estilosAlerta = {
  marginTop: '2rem',
};

const FormularioInicioSesion = ({ alEnviar, cargando, mensaje }) => {
  const [formulario, setFormulario] = useState({ correo: '', contrasenia: '' });

  const manejarCambio = ({ target: { name, value } }) => {
    setFormulario((anterior) => ({ ...anterior, [name]: value }));
  };

  return (
    <Contenedor elevation={3} sx={estilosContenedorFormulario}>
      <Imagen
        src='/logoAltertexLight.svg'
        alt='Icono de inicio de sesión'
        width='100%'
        sx={estilosLogo}
      />
      <Texto variant='h5' gutterBottom sx={estilosTitulo}>
        Iniciar sesión
      </Texto>

      <form
        onSubmit={(evento) => {
          evento.preventDefault();
          alEnviar(formulario);
        }}
        style={estilosFormulario}
      >
        <CampoTexto
          label='Correo Electrónico'
          name='correo'
          size='medium'
          value={formulario.correo}
          onChange={manejarCambio}
          fullWidth
          required
        />
        <CampoTexto
          label='Contraseña'
          name='contrasenia'
          type='password'
          size='medium'
          value={formulario.contrasenia}
          onChange={manejarCambio}
          fullWidth
          required
        />

        <Box mt={3} display='flex' justifyContent='center'>
          {cargando ? (
            <Cargador />
          ) : (
            <Boton
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              fullWidth
              label='Iniciar Sesión'
            />
          )}
        </Box>

        {mensaje && (
          <Alerta
            tipo={mensaje.includes('exitoso') ? 'success' : 'error'}
            mensaje={mensaje}
            icono={true}
            textoVariant='body1'
            cerrable={true}
            duracion={5000}
            posicionAbsoluta={false}
            sx={estilosAlerta}
          />
        )}
      </form>
    </Contenedor>
  );
};

export default FormularioInicioSesion;
