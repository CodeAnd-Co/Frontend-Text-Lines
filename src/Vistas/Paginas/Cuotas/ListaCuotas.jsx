// RF[32] - Consulta Lista de Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32
//RF[31] Consulta crear set de cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF31]
//RF[33] Leer cuota - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF33]

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, Box } from '@mui/material';
import { tokens } from '@SRC/theme';
import { useAuth } from '@Hooks/AuthProvider';
import ContenedorLista from '@Organismos/ContenedorLista';
import Tabla from '@Organismos/Tabla';
import Chip from '@Atomos/Chip';
import ModalCrearCuotaSet from '@Organismos/Cuotas/ModalCrearCuotaSet';
import ModalEditarCuotas from '@Organismos/Cuotas/ModalEditarCuotas';
import Alerta from '@Moleculas/Alerta';
import { useCuotaId } from '@Hooks/Cuotas/useLeerCuota';
import PopUpEliminar from '@Moleculas/PopUp';
import { RUTAS } from '@Constantes/rutas';
import { RepositorioEliminarSetCuotas } from '@Dominio/Repositorios/Cuotas/repositorioEliminarSetCuotas';
import { PERMISOS } from '@Utilidades/Constantes/permisos';
import { useConsultarCuotas } from '@Hooks/Cuotas/useConsultarCuotas';
import ModalFlotante from '@Organismos/ModalFlotante';
import CuotasInfo from '@Moleculas/CuotasInfo';

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const { cuotas, cargando, error, recargar } = useConsultarCuotas();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [idsSetCuotas, setIdsSetCuotas] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [abrirPopUpEliminar, setAbrirPopUpEliminar] = useState(false);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [idSetCuotaSeleccionado, setIdSetCuotaSeleccionado] = useState(null);

  const {
    cuota,
    cargando: cargandoDetalle,
    error: errorDetalle,
  } = useCuotaId(modalDetalleAbierto || modalEditarAbierto ? idSetCuotaSeleccionado : null);


  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

  const manejarMostrarAlerta = (configAlerta) => {
    setAlerta(configAlerta);
  };

  const columnas = [
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    {
      field: 'periodoRenovacion',
      headerName: 'Periodo de Renovación (meses)',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'renovacionHabilitada',
      headerName: 'Renovación Habilitada',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Activo' : 'Inactivo'}
          shape='circular'
          size='medium'
          variant='filled'
          backgroundColor={params.value ? colores.primario[2] : colores.texto[3]}
          textColor='#fff'
        />
      ),
    },
  ];

  const filas = Array.isArray(cuotas)
    ? cuotas.map((cuota) => ({
        id: cuota.idCuotaSet,
        idCuotaSet: cuota.idCuotaSet,
        nombre: cuota.nombre,
        periodoRenovacion: cuota.periodoRenovacion,
        renovacionHabilitada: cuota.renovacionHabilitada === 1,
        descripcion: cuota.descripcion,
        ultimaActualizacion: cuota.ultimaActualizacion,
      }))
    : [];

  const handleAbrirModalCrear = () => setModalCrearAbierto(true);
  const handleCerrarModalCrear = () => setModalCrearAbierto(false);

  const manejarCancelarEliminar = () => setAbrirPopUpEliminar(false);

  const manejarConfirmarEliminar = async () => {
    try {
      await RepositorioEliminarSetCuotas.eliminarSetCuotas(idsSetCuotas);
      await recargar();
      setAlerta({
        tipo: 'success',
        mensaje: 'Sets de cuotas eliminados correctamente.',
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } catch (error) {
      setAlerta({
        tipo: 'error',
        mensaje: `Error al eliminar sets de cuotas: ${error.message}`,
        icono: true,
        cerrable: true,
        centradoInferior: true,
      });
    } finally {
      setAbrirPopUpEliminar(false);
    }
  };

  // 👈 FUNCIONES CORREGIDAS
  const handleAbrirEditar = () => {
    setModalDetalleAbierto(false);
    setModalEditarAbierto(true);
  };

  const handleCerrarEditar = () => {
    setModalEditarAbierto(false);
    // NO limpies el idSetCuotaSeleccionado aquí para mantener los datos
  };

  const handleCuotaActualizada = async () => {
    await recargar();
    setModalEditarAbierto(false);
    setIdSetCuotaSeleccionado(null); // Ahora sí limpia aquí
    setAlerta({
      tipo: 'success',
      mensaje: 'Set de cuotas actualizado correctamente.',
      icono: true,
      cerrable: true,
      centradoInferior: true,
    });
  };

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: handleAbrirModalCrear,
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un set de cuotas para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsSetCuotas(seleccionados);
          setAbrirPopUpEliminar(true);
        }
      },
      color: 'error',
      size: 'large',
      backgroundColor: colores.altertex[1],
    },
  ];

  return (
    <>
      <ContenedorLista
        titulo='Lista de Sets de Cuotas'
        descripcion='Consulta y administra los sets de cuotas registrados para cada cliente.'
        informacionBotones={botones}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '10px',
            mb: '20px',
          }}
        ></Box>

        <Box width='100%'>
          {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
          <Tabla
            columns={columnas}
            rows={filas}
            loading={cargando}
            disableRowSelectionOnClick={true}
            checkboxSelection
            onRowSelectionModelChange={(nuevosIds) => {
              const ids = Array.isArray(nuevosIds) ? nuevosIds : Array.from(nuevosIds?.ids || []);
              setSeleccionados(ids);
            }}
            onRowClick={(params) => {
              setIdSetCuotaSeleccionado(params.row.idCuotaSet);
              setModalDetalleAbierto(true);
            }}
          />
        </Box>
      </ContenedorLista>

      <ModalCrearCuotaSet
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onMostrarAlerta={manejarMostrarAlerta}
      />

      <PopUpEliminar
        abrir={abrirPopUpEliminar}
        cerrar={manejarCancelarEliminar}
        confirmar={manejarConfirmarEliminar}
        dialogo='¿Estás seguro de que deseas eliminar los sets de cuotas seleccionados? Esta acción no se puede deshacer.'
      />

      {/* MODAL DE DETALLE */}
      {modalDetalleAbierto && (
        <ModalFlotante
          open={modalDetalleAbierto}
          onClose={() => setModalDetalleAbierto(false)}
          titulo={cuota?.nombre || 'Cargando...'}
          tituloVariant='h4'
          customWidth={530}
          botones={[
            ...(usuario?.permisos?.includes(PERMISOS.ACTUALIZAR_SET_CUOTAS) ? [{
              label: 'EDITAR',
              variant: 'contained',
              color: 'error',
              backgroundColor: colores.altertex[1],
              onClick: handleAbrirEditar,
            }] : []),
            {
              label: 'Salir',
              variant: 'outlined',
              color: 'primary',
              outlineColor: colores.primario[1],
              onClick: () => setModalDetalleAbierto(false),
              style: { marginTop: '10px' },
            },
          ]}
        >
          {cargandoDetalle ? (
            <p>Cargando información del set de cuotas...</p>
          ) : errorDetalle ? (
            <p>Error al cargar la información del set de cuotas: {errorDetalle}</p>
          ) : (
            <CuotasInfo {...cuota} />
          )}
        </ModalFlotante>
      )}

      {/* MODAL DE EDITAR */}
      <ModalEditarCuotas
        open={modalEditarAbierto}
        cuotaOriginal={cuota} // 👈 Pasa el objeto completo 'cuota'
        onClose={handleCerrarEditar}
        onActualizado={handleCuotaActualizada}
        cargandoDetalle={cargandoDetalle}
        errorDetalle={errorDetalle}
      />

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={3000}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}
    </>
  );
};

export default ListaCuotas;