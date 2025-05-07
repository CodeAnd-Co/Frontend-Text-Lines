import Contenedor from '@Atomos/Contenedor';
import Switch from '@Atomos/Switch';
import Boton from '@Atomos/Boton';
import { useEffect, useState } from 'react';
import { useConsultarTipoPagos } from '@Hooks/Pagos/useConsultarTipoPagos';

const TarjetaConfiguracionPagos = () => {
  const { tipoPagos, cargando } = useConsultarTipoPagos();
  const [creditoHabilitado, setCreditoHabilitado] = useState(false);
  const [debitoHabilitado, setDebitoHabilitado] = useState(false);
  const [puntosHabilitado, setPuntosHabilitado] = useState(false);
  const [estadoInicial, setEstadoInicial] = useState({
    credito: false,
    debito: false,
    puntos: false,
  });
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    if (!cargando && tipoPagos.length > 0) {
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

      // Guardar el estado inicial
      setEstadoInicial({
        credito,
        debito,
        puntos,
      });
    }
  }, [tipoPagos, cargando]);

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

    // Mostrar botón de confirmación cuando hay cambios
    setMostrarConfirmacion(true);
  };

  const confirmarCambios = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log('Guardando cambios:', {
      credito: creditoHabilitado,
      debito: debitoHabilitado,
      puntos: puntosHabilitado,
    });

    // Actualizar el estado inicial con los nuevos valores
    setEstadoInicial({
      credito: creditoHabilitado,
      debito: debitoHabilitado,
      puntos: puntosHabilitado,
    });

    // Ocultar el botón de confirmación
    setMostrarConfirmacion(false);
  };

  const cancelarCambios = () => {
    // Restaurar al estado inicial
    setCreditoHabilitado(estadoInicial.credito);
    setDebitoHabilitado(estadoInicial.debito);
    setPuntosHabilitado(estadoInicial.puntos);

    // Ocultar el botón de confirmación
    setMostrarConfirmacion(false);
  };

  return (
    <Contenedor
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: '20px',
      }}
    >
      <Contenedor
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          marginBottom: '20px',
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
        <Contenedor
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginTop: '15px',
            width: '100%',
          }}
        >
          <Boton
            variant='contained'
            color='primary'
            label='Confirmar cambios'
            onClick={confirmarCambios}
          />
          <Boton variant='outlined' label='Cancelar' onClick={cancelarCambios} />
        </Contenedor>
      )}
    </Contenedor>
  );
};

export default TarjetaConfiguracionPagos;
