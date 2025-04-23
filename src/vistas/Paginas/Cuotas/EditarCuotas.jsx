import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Texto from '../../componentes/atomos/Texto';
import Alerta from '../../componentes/moleculas/Alerta';
import { useCrearCuotaSet } from '../../../hooks/useCrearCuotaSet'; // Asegúrate de ajustar la ruta
import CuerpoPrincipal from '../../componentes/organismos/Cuotas/CuerpoPrincipal';
import { useAuth } from '../../../hooks/AuthProvider';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const navegar = useNavigate();
  const { nombreCuotaSet, descripcion, productos } = ubicacion.state;
  const [periodoRenovacion, setPeriodoRenovacion] = useState(6);
  const [renovacionActiva, setRenovacionActiva] = useState(true);
  const [cuotas, setCuotas] = useState(
    productos.reduce((acc, producto) => {
      acc[producto.id.toString()] = 1;
      return acc;
    }, {})
  );
  const [abrirConfirmacion, setAbrirConfirmacion] = useState(false);

  const { usuario, cargandoHook } = useAuth();

  const { enviarCuota, exito, error, mensaje, cargando, setError } = useCrearCuotaSet({
    nombreCuotaSet,
    descripcion,
    periodoRenovacion,
    renovacionActiva,
    productos,
    cuotas,
    redirectPath: '/admin/cuotas', // Especificamos la ruta de redirección
  });

  //si no hay un cliente seleccionado te manda a seleccionar cliente
  if (!usuario.clienteSeleccionado) {
    navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
  }

  return (
    <>
      <Texto variant='h4' sx={{ margin: 7 }}>
        {nombreCuotaSet}
      </Texto>

      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 8000 : 10000}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
        />
      )}

      <CuerpoPrincipal
        setPeriodoRenovacion={setPeriodoRenovacion}
        setRenovacionActiva={setRenovacionActiva}
        setAbrirConfirmacion={setAbrirConfirmacion}
        abrirConfirmacion={abrirConfirmacion}
        enviarCuota={enviarCuota}
        cargando={cargando}
        setCuotas={setCuotas}
        productos={productos}
      />
    </>
  );
};

export default EditarCuotas;
