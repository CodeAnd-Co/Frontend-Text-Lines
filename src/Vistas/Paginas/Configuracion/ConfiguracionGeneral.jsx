import ContenedorLista from '@Organismos/ContenedorLista';
import TarjetaConfiguracionPagos from '@Organismos/TarjetaConfiguracionPagos';

const ConfiguracionGeneral = () => {
  return (
    <ContenedorLista titulo='Configuracion' descripcion='Metodos de pago habilitados.'>
      <TarjetaConfiguracionPagos />
    </ContenedorLista>
  );
};

export default ConfiguracionGeneral;
