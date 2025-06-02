import ContenedorLista from '@Organismos/ContenedorLista';
import TarjetaConfiguracionPagos from '@Organismos/TarjetaConfiguracionPagos';

//RF[52] Consulta Lista de Pago - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF52]

const ConfiguracionGeneral = () => {
  return (
    <ContenedorLista titulo='Configuración' descripcion='Métodos de pago habilitados.'>
      <TarjetaConfiguracionPagos />
    </ContenedorLista>
  );
};

export default ConfiguracionGeneral;
