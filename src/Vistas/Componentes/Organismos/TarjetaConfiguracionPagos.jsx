import Contenedor from '@Atomos/Contenedor';
import Switch from '@Atomos/Switch';
import Boton from '@Atomos/Boton';
import { useEffect, useState } from 'react';
import { useConsultarTipoPagos } from '@Hooks/Pagos/useConsultarTipoPagos';
import { useActualizarTipoPago } from '@Hooks/Pagos/useActualizarTipoPago';
import Alerta from '@Moleculas/Alerta';
import { tokens } from '@SRC/theme';
import { useTheme } from '@mui/material';

const TarjetaConfiguracionPagos = () => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);
  const { tipoPagos, tipoPagosMapeado, cargando: cargandoConsulta } = useConsultarTipoPagos();
  const { actualizar, cargando: cargandoActualizacion, error, mensaje } = useActualizarTipoPago();

  const [creditoHabilitado, setCreditoHabilitado] = useState(false);
  const [debitoHabilitado, setDebitoHabilitado] = useState(false);
  const [puntosHabilitado, setPuntosHabilitado] = useState(false);

  const [estadoInicial, setEstadoInicial] = useState({
    credito: false,
    debito: false,
    puntos: false,
  });

  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [alerta, setAlerta] = useState(null);

  // Objeto para mapear los tipos de pago internos a los nombres de la API
  const tiposPagoMap = {
    credito: 'Tarjeta de Crédito',
    debito: 'Tarjeta de Débito',
    puntos: 'Puntos',
  };

  useEffect(() => {
    if (!cargandoConsulta && tipoPagos.length > 0) {
      let credito = false;
      let debito = false;
      let puntos = false;

      tipoPagos.forEach(({ metodo, habilitado }) => {
        switch (metodo) {
          case 'Tarjeta de Crédito':
            setCreditoHabilitado(habilitado);
            credito = habilitado;
            break;
          case 'Tarjeta de Débito':
            setDebitoHabilitado(habilitado);
            debito = habilitado;
            break;
          case 'Puntos':
            setPuntosHabilitado(habilitado);
            puntos = habilitado;
            break;
        }
      });

      setEstadoInicial({ credito, debito, puntos });
    }
  }, [tipoPagos, cargandoConsulta]);

  const handleCambioSwitch = (tipo, nuevoEstado) => {
    switch (tipo) {
      case 'credito':
        setCreditoHabilitado(nuevoEstado);
        break;
      case 'debito':
        setDebitoHabilitado(nuevoEstado);
        break;
      case 'puntos':
        setPuntosHabilitado(nuevoEstado);
        break;
    }
    setMostrarConfirmacion(true);
  };

  const confirmarCambios = async () => {
    // Obtener estado actual
    const estadoActual = {
      credito: creditoHabilitado,
      debito: debitoHabilitado,
      puntos: puntosHabilitado,
    };

    // Filtrar solo los métodos que cambiaron
    const cambios = Object.keys(estadoActual)
      .filter((tipo) => estadoActual[tipo] !== estadoInicial[tipo])
      .map((tipo) => ({
        id: tipoPagosMapeado[tiposPagoMap[tipo]]?.id,
        metodo: tiposPagoMap[tipo],
        habilitado: estadoActual[tipo],
      }));

    // Solo enviar si hay cambios
    if (cambios.length > 0) {
      await actualizar(cambios);

      // Actualizar el estado inicial con los nuevos valores
      setEstadoInicial({
        credito: creditoHabilitado,
        debito: debitoHabilitado,
        puntos: puntosHabilitado,
      });

      if (mensaje) {
        setAlerta({ tipo: 'success', mensaje });
      } else if (error) {
        setAlerta({ tipo: 'error', mensaje: error });
      }
    }

    setMostrarConfirmacion(false);
  };

  const cancelarCambios = () => {
    setCreditoHabilitado(estadoInicial.credito);
    setDebitoHabilitado(estadoInicial.debito);
    setPuntosHabilitado(estadoInicial.puntos);
    setMostrarConfirmacion(false);
  };

  return (
    <>
      <Contenedor
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          height: '100px',
        }}
      >
        <Switch
          label='Tarjeta de Crédito'
          checked={creditoHabilitado}
          onChange={(e) => handleCambioSwitch('credito', e.target.checked)}
        />
        <Switch
          label='Tarjeta de Débito'
          checked={debitoHabilitado}
          onChange={(e) => handleCambioSwitch('debito', e.target.checked)}
        />
        <Switch
          label='Puntos'
          checked={puntosHabilitado}
          onChange={(e) => handleCambioSwitch('puntos', e.target.checked)}
        />
      </Contenedor>

      {mostrarConfirmacion && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '15px' }}>
          <Boton
            variant='contained'
            color='error'
            backgroundColor={colores.altertex[1]}
            label={cargandoActualizacion ? 'Guardando...' : 'Confirmar cambios'}
            onClick={confirmarCambios}
            disabled={cargandoActualizacion}
          />
          <Boton
            variant='outlined'
            label='Cancelar'
            onClick={cancelarCambios}
            disabled={cargandoActualizacion}
            outlineColor={colores.primario[10]}
          />
        </div>
      )}

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          cerrable
          duracion={5000}
          centradoInferior
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
};

export default TarjetaConfiguracionPagos;
