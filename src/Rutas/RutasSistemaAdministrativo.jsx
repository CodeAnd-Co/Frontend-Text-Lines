import { Routes, Route } from 'react-router-dom';
import { RUTAS } from '../Utilidades/Constantes/rutas';
import { PERMISOS } from '../Utilidades/Constantes/permisos';
import ListaClientes from '../Vistas/Paginas/Clientes/ListaClientes';
<<<<<<< HEAD
import ListaProductos from '../Vistas/Paginas/Productos/ListaProductos';
=======
import Productos from '../vistas/paginas/productos';
import ListaCategorias from '../vistas/Paginas/Categorias/ListaCategorias';
import ListaCuotas from '../vistas/Paginas/Cuotas/ListaCuotas';
>>>>>>> b74a10438c3d0a1b08d44e058aa6c9fed6bf595f
import SistemaAdministrativo from '../Vistas/Paginas/SistemaAdministrativo';
import Configuracion from '../Vistas/Paginas/Configuracion/ConfiguracionGeneral';
import Error404 from '../Vistas/Paginas/Errores/Error404';
import EditarCuotas from '../vistas/Paginas/Cuotas/EditarCuotas';

import RutaProtegida from './RutaProtegida';
import VerificarClienteSeleccionado from './VerificarClienteSeleccionado';

const RutasSistemaAdministrativo = () => {
  return (
    <Routes>
      <Route path={RUTAS.RAIZ} element={<Error404 />} />
      <Route path={RUTAS.INICIO} element={<ListaClientes />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CONFIGURACION} element={<Configuracion />} />
<<<<<<< HEAD
=======
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.BASE} element={<ListaCuotas />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS} element={<EditarCuotas />} />
      <Route path={RUTAS.SISTEMA_ADMINISTRATIVO.PRODUCTOS} element={<Productos />} />
>>>>>>> b74a10438c3d0a1b08d44e058aa6c9fed6bf595f
      <Route
        path={RUTAS.SISTEMA_ADMINISTRATIVO.TABLERO + RUTAS.RAIZ}
        element={
          <VerificarClienteSeleccionado>
            <RutaProtegida permiso={PERMISOS.CONSULTAR_SISTEMA_ADMINISTRATIVO}>
              <SistemaAdministrativo />
            </RutaProtegida>
          </VerificarClienteSeleccionado>
        }
      >
        <Route path='productos' element={<ListaProductos />} />
      </Route>
    </Routes>
  );
};

export default RutasSistemaAdministrativo;
