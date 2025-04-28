import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Texto from '../../componentes/atomos/Texto';
import Alerta from '../../componentes/moleculas/Alerta';
import { useCrearCuotaSet } from '../../../hooks/Cuotas//useCrearCuotaSet';
import CuerpoPrincipal from '../../componentes/organismos/Cuotas/CuerpoPrincipal';
import { useAuth } from '../../../hooks/AuthProvider';
import { RUTAS } from '../../../Utilidades/Constantes/rutas';

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const navegar = useNavigate();
  const { usuario } = useAuth();

  // Use useEffect to handle client selection check
  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

  // Check if location state exists before destructuring
  const { nombreCuotaSet, descripcion, productos } = ubicacion.state || {};

  const [periodoRenovacion, setPeriodoRenovacion] = useState(6);
  const [renovacionActiva, setRenovacionActiva] = useState(true);
  const [cuotas, setCuotas] = useState(
    productos?.reduce((acc, producto) => {
      acc[producto.id.toString()] = 1;
      return acc;
    }, {}) || {}
  );
  const [abrirConfirmacion, setAbrirConfirmacion] = useState(false);

  const { enviarCuota, exito, error, mensaje, cargando, setError } = useCrearCuotaSet({
    nombreCuotaSet,
    descripcion,
    periodoRenovacion,
    renovacionActiva,
    productos,
    cuotas,
    redirectPath: '/admin/tablero/cuotas',
  });

  // Return early to avoid rendering the rest of the component when redirecting
  if (!usuario?.clienteSeleccionado || !productos) {
    return null; // Or a loading indicator if preferred
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
        periodoRenovacion={periodoRenovacion}
        renovacionActiva={renovacionActiva}
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
