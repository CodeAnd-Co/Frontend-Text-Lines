import { Routes, Route } from 'react-router-dom';
import Tienda from '@Tienda';
// import RUTAS from './Utilidades/Constates/rutas';
// import Carrito from './Paginas/tienda/Carrito';
// import Catalogo from './Paginas/tienda/Catalogo';

const RutasTienda = () => {
  return (
    <Routes>
      <Route path="" element={<Tienda />} />
      {/* <Route path={RUTAS.SISTEMA_TIENDA.CARRITO} element={<Carrito />} />
      <Route path={RUTAS.SISTEMA_TIENDA.CATALOGO} element={<Catalogo />} /> */}
    </Routes>
  );
};

export default RutasTienda;
