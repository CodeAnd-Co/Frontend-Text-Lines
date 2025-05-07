import Contenedor from '@Atomos/Contenedor';
import Switch from '@Atomos/Switch';
import { useEffect, useState } from 'react';
import { useConsultarTipoPagos } from '@Hooks/Pagos/useConsultarTipoPagos';

const TarjetaConfiguracionPagos = () => {
  const { tipoPagos, cargando } = useConsultarTipoPagos();
  const [creditoHabilitado, setCreditoHabilitado] = useState(false);
  const [debitoHabilitado, setDebitoHabilitado] = useState(false);
  const [puntosHabilitado, setPuntosHabilitado] = useState(false);

  useEffect(() => {
    if (!cargando && tipoPagos.length > 0) {
      tipoPagos.forEach(({ metodo, habilitado }) => {
        switch (metodo) {
          case 'Tarjeta de Crédito':
            setCreditoHabilitado(habilitado);
            break;
          case 'Tarjeta de Débito':
            setDebitoHabilitado(habilitado);
            break;
          case 'Puntos':
            setPuntosHabilitado(habilitado);
            break;
        }
      });
    }
  }, [tipoPagos, cargando]);

  return (
    <Contenedor
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        height: '100px',
      }}
    >
      <Switch label='Tarjeta de Crédito' checked={creditoHabilitado} />
      <Switch label='Tarjeta de Débito' checked={debitoHabilitado} />
      <Switch label='Puntos' checked={puntosHabilitado} />
    </Contenedor>
  );
};

export default TarjetaConfiguracionPagos;
