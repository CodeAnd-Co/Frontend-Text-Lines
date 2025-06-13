// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import { Box } from '@mui/material';
import CampoSelect from '../../Atomos/CampoSelect';

// Constantes para mensajes y límites
const LIMITE_NOMBRE = 100;
const LIMITE_DESCRIPCION = 300;
const MENSAJE_LIMITE = 'Máximo caracteres';

const FormularioCrearEvento = ({
  nombreEvento,
  setNombreEvento,
  nombreError = false,
  descripcionEvento,
  setDescripcionEvento,
  descripcionError = false,
  puntosEvento,
  setPuntosEvento,
  puntosError = false,
  multiplicadorEvento,
  setMultiplicadorEvento,
  multiplicadorError = false,
  mostrarAlerta,
  setMostrarAlerta,
}) => {
  // Validar si el valor es un número válido
  const esNumeroValido = (valor) => {
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    return regex.test(valor) || valor === '';
  };

  // Manejar el cambio de nombre
  const manejarCambioNombre = (evento) => setNombreEvento(evento.target.value);

  // Manejar el cambio de descripción
  const manejarCambioDescripcion = (evento) => setDescripcionEvento(evento.target.value);

  // Manejar el cambio de puntos
  const manejarCambioPuntos = (evento) => {
    const valor = evento.target.value;
    if (esNumeroValido(valor) || valor === null) {
      setPuntosEvento(valor);
    }
  };

  // Manejar el cambio de multiplicador
  const manejarCambioMultiplicador = (evento) => {
    const valor = evento.target.value;
    if (esNumeroValido(valor) || valor === null) {
      setMultiplicadorEvento(valor);
    }
  };

  return (
    <>
      <CampoTexto
        label={'Nombre del Evento'}
        fullWidth
        required
        type={'text'}
        value={nombreEvento}
        onChange={manejarCambioNombre}
        inputProps={{ maxLength: LIMITE_NOMBRE }}
        helperText={`${nombreEvento.length}/${LIMITE_NOMBRE} - ${MENSAJE_LIMITE}`}
        sx={{ mb: 2 }}
        error={nombreError}
      />
      <CampoTexto
        label={'Descripción'}
        fullWidth
        multiline
        type={'text'}
        value={descripcionEvento}
        onChange={manejarCambioDescripcion}
        inputProps={{ maxLength: LIMITE_DESCRIPCION }}
        helperText={`${descripcionEvento.length}/${LIMITE_DESCRIPCION} - ${MENSAJE_LIMITE}`}
        sx={{ mb: 2 }}
        rows={3}
        error={descripcionError}
        />
      <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={2}>
        <CampoTexto
          label={'Puntos'}
          fullWidth
          required
          type={'number'}
          value={puntosEvento}
          onChange={manejarCambioPuntos}
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
          error={puntosError}
        />
        <CampoTexto
          label={'Multiplicador'}
          fullWidth
          required
          type={'number'}
          value={multiplicadorEvento}
          onChange={manejarCambioMultiplicador}
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
          error={multiplicadorError}
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
