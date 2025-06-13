import { useState, useEffect, useCallback } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import { useActualizarPedido } from '@Hooks/Pedidos/useActualizarPedido';
import { tokens } from '@SRC/theme';

// Constantes para los límites de caracteres
const LIMITE_ESTATUS = 50;
const MENSAJE_LIMITE = 'Máximo caracteres';

// Expresiones regulares para validación
const REGEX_PRECIO = /^\d{1,8}(\.\d{0,2})?$/;
const REGEX_SOLO_LETRAS = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]*$/;

const ModalEditarPedido = ({
  abierto,
  onCerrar,
  datosIniciales,
  onActualizar,
  onMostrarAlerta,
}) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const { actualizarPedido, cargando } = useActualizarPedido();

  const [pedido, setPedido] = useState({});
  const [errores, setErrores] = useState({});

  // Reiniciar estado cuando se abre/cierra el modal
  useEffect(() => {
    if (abierto && datosIniciales) {
      setPedido({ ...datosIniciales });
      setErrores({});
    } else if (!abierto) {
      // Limpiar estado cuando se cierra
      setPedido({});
      setErrores({});
    }
  }, [abierto, datosIniciales]);

  const manejarCambio = useCallback(
    (evento) => {
      const { name, value } = evento.target;
      setPedido((prev) => ({ ...prev, [name]: value }));

      // Limpiar error específico del campo
      if (errores[name]) {
        setErrores((prev) => ({ ...prev, [name]: false }));
      }
    },
    [errores]
  );

  const validarCampos = useCallback(() => {
    const nuevosErrores = {};

    // Validar estatus del pedido
    if (!pedido.estatusPedido?.trim()) {
      nuevosErrores.estatusPedido = true;
    }

    // Validar precio total
    if (!pedido.precioTotal) {
      nuevosErrores.precioTotal = true;
    } else {
      const valor = pedido.precioTotal.toString().trim();
      const esValido = REGEX_PRECIO.test(valor) && parseFloat(valor) >= 0;

      if (!esValido) {
        nuevosErrores.precioTotal = true;
      }
    }

    // Validar estatus de pago
    if (!pedido.estatusPago?.trim()) {
      nuevosErrores.estatusPago = true;
    }

    // Validar estatus de envío
    if (!pedido.estatusEnvio?.trim()) {
      nuevosErrores.estatusEnvio = true;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [pedido]);

  const manejarGuardar = useCallback(async () => {
    if (!validarCampos()) {
      onMostrarAlerta('Completa todos los campos obligatorios correctamente.', 'error');
      return;
    }

    if (!pedido.id) {
      onMostrarAlerta('Falta el ID del pedido. No se puede actualizar.', 'error');
      return;
    }

    // Mapeo de campos para el backend
    const pedidoMapeado = {
      idPedido: pedido.id.toString(),
      estado: pedido.estatusPedido.trim(),
      precioTotal: parseFloat(pedido.precioTotal),
      idEnvio: pedido.estatusEnvio.trim(),
      idPago: pedido.estatusPago.trim(),
    };

    try {
      const resultado = await actualizarPedido(pedidoMapeado);

      if (resultado.exito) {
        onMostrarAlerta(resultado.mensaje, 'success');
        onActualizar();
        onCerrar();
      } else {
        onMostrarAlerta(resultado.mensaje, 'error');
      }
    } catch (error) {
      console.error('Error al actualizar pedido:', error);
      onMostrarAlerta(error.message || 'Error al actualizar el pedido.', 'error');
    }
  }, [pedido, validarCampos, actualizarPedido, onMostrarAlerta, onActualizar, onCerrar]);

  const manejarCambioPrecio = useCallback(
    (evento) => {
      const value = evento.target.value;

      // Permitir campo vacío
      if (value === '') {
        manejarCambio(evento);
        return;
      }

      // Validar formato mientras se escribe
      if (REGEX_PRECIO.test(value)) {
        manejarCambio(evento);
      }
    },
    [manejarCambio]
  );

  const manejarCambioEstatus = useCallback(
    (evento) => {
      const value = evento.target.value;

      // Solo permitir letras, espacios y caracteres especiales del español
      if (REGEX_SOLO_LETRAS.test(value)) {
        manejarCambio(evento);
      }
    },
    [manejarCambio]
  );

  const manejarCambioEstatusPago = useCallback(
    (evento) => {
      const value = evento.target.value;

      // Solo permitir letras, espacios y caracteres especiales del español
      if (REGEX_SOLO_LETRAS.test(value)) {
        manejarCambio(evento);
      }
    },
    [manejarCambio]
  );

  const manejarCambioEstatusEnvio = useCallback(
    (evento) => {
      const value = evento.target.value;

      // Solo permitir letras, espacios y caracteres especiales del español
      if (REGEX_SOLO_LETRAS.test(value)) {
        manejarCambio(evento);
      }
    },
    [manejarCambio]
  );

  // Mostrar mensaje de error específico para precio
  const obtenerMensajeErrorPrecio = () => {
    if (!errores.precioTotal) return '';

    if (!pedido.precioTotal) {
      return 'El precio total es requerido';
    }

    return 'El precio debe tener máximo 8 dígitos enteros y hasta 2 decimales';
  };

  if (!pedido || !abierto) return null;

  return (
    <ModalFlotante
      open={abierto}
      onClose={onCerrar}
      onConfirm={manejarGuardar}
      titulo='Editar Pedido'
      tituloVariant='h4'
      customWidth={800}
      botones={[]}
    >
      <Box display='grid' gridTemplateColumns='1fr 1fr' gap={3}>
        <CampoTexto
          label='Empleado'
          name='nombreEmpleado'
          value={pedido.nombreEmpleado || ''}
          style={{ marginBottom: '2rem' }}
          disabled
        />

        <CampoTexto
          label='Fecha de Orden'
          name='fechaOrden'
          value={pedido.fechaOrden || ''}
          style={{ marginBottom: '2rem' }}
          disabled
        />

        <CampoTexto
          label='Estatus del Pedido *'
          name='estatusPedido'
          value={pedido.estatusPedido || ''}
          onChange={manejarCambioEstatus}
          error={errores.estatusPedido}
          helperText={
            errores.estatusPedido
              ? 'Este campo es requerido'
              : `${(pedido.estatusPedido || '').length}/${LIMITE_ESTATUS} ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_ESTATUS,
          }}
        />

        <CampoTexto
          label='Precio Total *'
          name='precioTotal'
          type='text'
          value={pedido.precioTotal || ''}
          onChange={manejarCambioPrecio}
          error={errores.precioTotal}
          helperText={obtenerMensajeErrorPrecio()}
          inputProps={{
            maxLength: 11, // 8 dígitos + punto + 2 decimales
            inputMode: 'decimal',
            placeholder: 'Ej: 12345678.00',
          }}
        />

        <CampoTexto
          label='Estatus de Pago *'
          name='estatusPago'
          value={pedido.estatusPago || ''}
          onChange={manejarCambioEstatusPago}
          error={errores.estatusPago}
          helperText={
            errores.estatusPago
              ? 'Este campo es requerido'
              : `${(pedido.estatusPago || '').length}/${LIMITE_ESTATUS} ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_ESTATUS,
          }}
        />

        <CampoTexto
          label='Estatus de Envío *'
          name='estatusEnvio'
          value={pedido.estatusEnvio || ''}
          onChange={manejarCambioEstatusEnvio}
          error={errores.estatusEnvio}
          helperText={
            errores.estatusEnvio
              ? 'Este campo es requerido'
              : `${(pedido.estatusEnvio || '').length}/${LIMITE_ESTATUS} ${MENSAJE_LIMITE}`
          }
          inputProps={{
            maxLength: LIMITE_ESTATUS,
          }}
        />
      </Box>

      <Box display='flex' justifyContent='flex-end' gap={2} mt={4}>
        <Button
          variant='outlined'
          onClick={onCerrar}
          sx={{ borderColor: colores.altertex[1], color: colores.altertex[1] }}
          disabled={cargando}
        >
          CANCELAR
        </Button>
        <Button
          variant='contained'
          onClick={manejarGuardar}
          sx={{ backgroundColor: colores.altertex[1], color: 'white' }}
          disabled={cargando}
        >
          {cargando ? 'GUARDANDO...' : 'GUARDAR'}
        </Button>
      </Box>
    </ModalFlotante>
  );
};

export default ModalEditarPedido;
