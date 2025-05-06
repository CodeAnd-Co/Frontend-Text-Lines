// RF[32] - Consulta Lista de Cuotas - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme, Box } from '@mui/material';
import { tokens } from '@SRC/theme';
import { useConsultarCuotas } from '@Hooks/Cuotas/useConsultarCuotas';
import { useAuth } from '@Hooks/AuthProvider';
import ContenedorLista from '@Organismos/ContenedorLista';
import Tabla from '@Organismos/Tabla';
import Chip from '@Atomos/Chip';
import ModalCrearCuotaSet from '@Organismos/ModalCrearCuotaSet';
import Alerta from '@Moleculas/Alerta';
import { RUTAS } from '@Constantes/rutas';
import ModalEliminarSetCuotas from '../../Componentes/Organismos/ModalEliminarSetCuotas';


/**
 * Página para consultar y mostrar la lista de cuotas en una tabla.
 *
 * Muestra los resultados en un CustomDataGrid, incluyendo
 * nombre, periodo de renovación y estado de renovación de cada set de cuotas.
 *
 * @see [RF[32] Consulta lista de cuotas](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF32)
 */

const ListaCuotas = () => {
  const navegar = useNavigate();
  const { usuario } = useAuth();
  const { cuotas, cargando, error } = useConsultarCuotas();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Estado para controlar la visualización del modal crear
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [idsSetCuotas, setIdsSetCuotas] = useState([]);
  const [alerta, setAlerta] = useState(null);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  useEffect(() => {
    if (!usuario?.clienteSeleccionado) {
      navegar(RUTAS.SISTEMA_ADMINISTRATIVO.BASE);
    }
  }, [usuario, navegar]);

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
        nombre: cuota.nombre,
        periodoRenovacion: cuota.periodoRenovacion,
        renovacionHabilitada: cuota.renovacionHabilitada === 1,
      }))
    : [];

  const handleAbrirModalCrear = () => {
    setModalCrearAbierto(true);
  };

  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
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
          setOpenModalEliminar(true);
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
            checkboxSelection
            onRowSelectionModelChange={(nuevosIds) => {
              const ids = Array.isArray(nuevosIds) ? nuevosIds : Array.from(nuevosIds?.ids || []);
              console.log('IDs seleccionados:', ids);
              setSeleccionados(ids);
            }}                      
          />
        </Box>
      </ContenedorLista>

      <ModalCrearCuotaSet abierto={modalCrearAbierto} onCerrar={handleCerrarModalCrear} />
      <ModalEliminarSetCuotas
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsSetCuotas={Array.from(idsSetCuotas)}
        setAlerta={setAlerta}
        refrescarPagina={() => window.location.reload()} 
      />

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          icono={alerta.icono}
          cerrable={alerta.cerrable}
          duracion={2500}
          centradoInferior={alerta.centradoInferior}
          onClose={() => setAlerta(null)}
        />
      )}

    </>
  );
};

export default ListaCuotas;
