// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import { useAuth } from '@Hooks/AuthProvider';
import { Box } from '@mui/material';
import CampoSelect from '../../Atomos/CampoSelect';

// Constantes para mensajes y límites
const LIMITE_NOMBRE = 100;
const LIMITE_DESCRIPCION = 300;
const LIMITE_PERIODO = 50;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormularioCrearEvento = ({
  nombreEvento,
  setNombreEvento,
  descripcionEvento,
  setDescripcionEvento,
  puntosEvento,
  setPuntosEvento,
  multiplicadorEvento,
  setMultiplicadorEvento,
  periodoEvento,
  setPeriodoEvento,
  renovacionEvento,
  setRenovacionEvento,
  mostrarAlerta,
  setMostrarAlerta,
}) => {
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  const esNumeroValido = (valor) => {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    return regex.test(valor);
  };
  
  return (
    <>
      <CampoTexto
        label={'Nombre del Evento'}
        fullWidth
        type={'text'}
        value={nombreEvento}
        onChange={(evento) => setNombreEvento(evento.target.value.slice(0, LIMITE_NOMBRE))}
        inputProps={{ maxLength: LIMITE_NOMBRE }}
        helperText={`${nombreEvento.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`}
        sx={{ mb: 2 }}
      />
      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionEvento}
        onChange={(evento) =>
          setDescripcionEvento(evento.target.value.slice(0, LIMITE_DESCRIPCION))
        }
        inputProps={{ maxLength: LIMITE_DESCRIPCION }}
        helperText={`${descripcionEvento.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`}
        sx={{ mb: 2 }}
        multiline
        rows={3}
      />
      <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={2}>
        <CampoTexto
          label={'Puntos'}
          fullWidth
          type={'number'}
          value={puntosEvento}
          onChange={(evento) =>
            esNumeroValido(evento.target.value) && setPuntosEvento(evento.target.value)
          }
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
        />
        <CampoTexto
          label={'Multiplicador'}
          fullWidth
          type={'number'}
          value={multiplicadorEvento}
          onChange={(evento) =>
            esNumeroValido(evento.target.value) && setMultiplicadorEvento(evento.target.value)
          }
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
        />
      </Box>
      <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={2}>
        <CampoTexto
          label={'Periodo de Renovación'}
          fullWidth
          type={'text'}
          value={periodoEvento}
          onChange={(evento) => setPeriodoEvento(evento.target.value)}
          inputProps={{ maxLength: LIMITE_PERIODO }}
          helperText={`${periodoEvento.length}/${LIMITE_PERIODO} - ${MENSAJE_LIMITE}`}
          sx={{ mb: 2 }}
        />
        <CampoSelect
          label={'Renovación Automática'}
          fullWidth
          value={renovacionEvento}
          onChange={(evento) => setRenovacionEvento(evento.target.value)}
          options={[
            { value: true, label: 'Sí' },
            { value: false, label: 'No' },
          ]}
          placeholder={'Selecciona una opción'}
          sx={{ mb: 2 }}
        />
      </Box>

      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje={'Completa todos los campos.'}
          cerrable
          duracion={10000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
    </>
  );
};

export default FormularioCrearEvento;
