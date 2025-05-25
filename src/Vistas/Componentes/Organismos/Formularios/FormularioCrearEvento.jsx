// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
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
  
  // Manejar el cambio de periodo
  const manejarCambioPeriodo = (evento) => setPeriodoEvento(evento.target.value);

  // Manejar el cambio de renovación
  const manejarCambioRenovacion = (evento) => setRenovacionEvento(evento.target.value);

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
      />
      <CampoTexto
        label={'Descripción'}
        fullWidth
        type={'text'}
        value={descripcionEvento}
        onChange={manejarCambioDescripcion}
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
          required
          type={'number'}
          value={puntosEvento}
          onChange={manejarCambioPuntos}
          inputProps={{ min: 0 }}
          sx={{ mb: 2 }}
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
        />
      </Box>
      <Box display={'grid'} gridTemplateColumns={'repeat(2, 1fr)'} gap={2}>
        <CampoTexto
          label={'Periodo de Renovación'}
          fullWidth
          type={'text'}
          value={periodoEvento}
          onChange={manejarCambioPeriodo}
          inputProps={{ maxLength: LIMITE_PERIODO }}
          helperText={`${periodoEvento.length}/${LIMITE_PERIODO} - ${MENSAJE_LIMITE}`}
          sx={{ mb: 2 }}
        />
        <CampoSelect
          label={'Renovación Automática'}
          fullWidth
          required
          value={renovacionEvento}
          onChange={manejarCambioRenovacion}
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
