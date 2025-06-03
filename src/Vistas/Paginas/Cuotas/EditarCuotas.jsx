import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Texto from '@Atomos/Texto';
import Alerta from '@Moleculas/Alerta';
import { useCrearCuotaSet } from '@Hooks/Cuotas/useCrearCuotaSet';
import CuerpoPrincipal from '@Organismos/Cuotas/CuerpoPrincipal';
import { useAuth } from '@Hooks/AuthProvider';
import { RUTAS } from '@Constantes/rutas';

//RF[31] Consulta crear set de cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31]

const EditarCuotas = () => {
  const ubicacion = useLocation();
  const navegar = useNavigate();
  const { usuario } = useAuth();

  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

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

  if (!usuario?.clienteSeleccionado || !productos) {
    return null;
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
          duracion={exito ? 3000 : 3000}
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
        cuotas={cuotas}
        productos={productos}
      />
    </>
  );
};

export default EditarCuotas;
