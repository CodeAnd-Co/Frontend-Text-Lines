import { useState, useEffect, useCallback } from 'react';
import { Box, Button, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import { useActualizarPedido } from '@Hooks/Pedidos/useActualizarPedido';
import { tokens } from '@SRC/theme';

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

  useEffect(() => {
    if (abierto && datosIniciales) {
      setPedido({ ...datosIniciales });
      setErrores({});
    }
  }, [abierto, datosIniciales]);

  const manejarCambio = useCallback((e) => {
    const { name, value } = e.target;
    setPedido((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: false }));
  }, []);

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!pedido.estatusPedido?.trim()) nuevosErrores.estatusPedido = true;
    if (!pedido.precioTotal?.toString().trim()) nuevosErrores.precioTotal = true;
    if (!pedido.estatusPago?.trim()) nuevosErrores.estatusPago = true;
    if (!pedido.estatusEnvio?.trim()) nuevosErrores.estatusEnvio = true;
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const manejarGuardar = async () => {
    console.log('Iniciando manejarGuardar');
    console.log('Pedido actual:', pedido);
    if (!validarCampos()) {
      console.log('Validación de campos falló');
      onMostrarAlerta('Completa todos los campos obligatorios.', 'error');
      return;
    }

    if (!pedido.id) {
      console.log('Falta ID del pedido');
      onMostrarAlerta('Falta el ID del pedido. No se puede actualizar.', 'error');
      return;
    }
    console.log('Validaciones pasadas correctamente');

    // ✅ Mapeo de campos como espera el backend    console.log('Preparando datos para mapeo');
    const pedidoMapeado = {
      idPedido: pedido.id.toString(),
      estado: pedido.estatusPedido, // Mapeo correcto para el backend
      precioTotal: parseFloat(pedido.precioTotal),
      idEnvio: pedido.estatusEnvio,
      idPago: pedido.estatusPago,
    };

    console.log('[DEBUG] Pedido original:', pedido);
    console.log('[DEBUG] Pedido mapeado:', pedidoMapeado);
    console.log('Intentando actualizar pedido...');

    try {
      const resultado = await actualizarPedido(pedidoMapeado);
      console.log('Resultado de actualización:', resultado);

      if (resultado.exito) {
        console.log('Actualización exitosa');
        onMostrarAlerta(resultado.mensaje, 'success');
        onActualizar();
        onCerrar();
      } else {
        console.log('Actualización fallida:', resultado.mensaje);
        onMostrarAlerta(resultado.mensaje, 'error');
      }
    } catch (error) {
      console.error('Error en la actualización:', error);
      onMostrarAlerta(error.message || 'Error al actualizar el pedido.', 'error');
    }
  };

  if (!pedido) return null;

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
      <Box display='grid' gridTemplateColumns='1fr 1fr' gap={2}>
        <CampoTexto
          label='Empleado'
          name='nombreEmpleado'
          value={pedido.nombreEmpleado || ''}
          disabled
        />
        <CampoTexto
          label='Fecha de Orden'
          name='fechaOrden'
          value={pedido.fechaOrden || ''}
          disabled
        />
        <CampoTexto
          label='Estatus del Pedido'
          name='estatusPedido'
          value={pedido.estatusPedido || ''}
          onChange={manejarCambio}
          error={errores.estatusPedido}
        />
        <CampoTexto
          label='Precio Total'
          name='precioTotal'
          value={pedido.precioTotal || ''}
          onChange={manejarCambio}
          error={errores.precioTotal}
        />
        <CampoTexto
          label='Estatus de Pago'
          name='estatusPago'
          value={pedido.estatusPago || ''}
          onChange={manejarCambio}
          error={errores.estatusPago}
        />
        <CampoTexto
          label='Estatus de Envío'
          name='estatusEnvio'
          value={pedido.estatusEnvio || ''}
          onChange={manejarCambio}
          error={errores.estatusEnvio}
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
          GUARDAR
        </Button>
      </Box>
    </ModalFlotante>
  );
};

export default ModalEditarPedido;
