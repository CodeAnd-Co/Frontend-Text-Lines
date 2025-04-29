import React, { useState } from 'react';
import Tabla from '../../componentes/organismos/Tabla';
import Alerta from '../../componentes/moleculas/Alerta';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
//import ModalEliminarEvento from '../../componentes/organismos/ModalEliminarEvento';
import { useConsultarEventos } from '../../../hooks/Eventos/useConsultarEventos';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
//import ModalCrearEvento from '../../componentes/organismos/ModalCrearEvento';

/**
 * Página para consultar y mostrar la lista de eventos en una tabla.
 *
 * Muestra los resultados en un Tabla, incluyendo
 * nombre, descripción, fecha y estado de cada evento.
 *
 * @see [RF37 Consulta lista de eventos](https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF37]
 */

const ListaEventos = () => {
  const { eventos, cargando, error, recargar } = useConsultarEventos();
  const [seleccionados, setSeleccionados] = useState(new Set());
  const [alerta, setAlerta] = useState(null);
  const [idsEvento, setIdsEvento] = useState([]);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Estado para controlar la visualización del modal crear
  const [modalCrearAbierto, setModalCrearAbierto] = useState(false);

  // Estado para controlar la visualización del modal eliminar
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  // Columnas para el DataGrid
  const columns = [
    { field: 'nombreEvento', headerName: 'Nombre', flex: 1 },
    { field: 'descripcion', headerName: 'Descripción', flex: 2 },
    { field: 'fecha', headerName: 'Fecha', flex: 1 },
    { field: 'estado', headerName: 'Estado', flex: 1 },
  ];
  // Las filas deben tener un campo `id`, usamos `idEvento`
  const rows = eventos.map((evento) => ({
    id: evento.idEvento,
    nombreEvento: evento.nombreEvento,
    descripcion: evento.descripcion,
    fecha: evento.fecha,
    estado: evento.estado,
  }));

  // Manejador para abrir el modal
  const handleAbrirModalCrear = () => {
    setModalCrearAbierto(true);
  };

  // Manejador para cerrar el modal
  const handleCerrarModalCrear = () => {
    setModalCrearAbierto(false);
  };

  // Manejador para cuando se crea un nuevo evento
  const handleEventoCreadoExitosamente = () => {
    handleCerrarModalCrear();
    // Recarga la lista de eventos
    recargar();
  };

  const botones = [
    {
      label: 'Añadir',
      variant: 'contained',
      color: 'primary',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: handleAbrirModalCrear, // Ahora abre el modal para crear
    },
    {
      variant: 'outlined',
      label: 'Editar',
      onClick: () => console.log('Editar evento'),
      color: 'primary',
      size: 'large',
      outlineColor: colores.altertex[1],
    },
    {
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.size === 0 || seleccionados.ids?.size === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un evento para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsEvento(Array.from(seleccionados.ids));
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
        titulo='Eventos'
        descripcion='Gestiona y organiza los eventos registrados en el sistema.'
        informacionBotones={botones}
      >
        <Box style={{ height: 400, width: '100%' }}>
          {error && <Alerta tipo='error' mensaje={error} icono cerrable centradoInferior />}
          <Tabla
            columns={columns}
            rows={rows}
            loading={cargando}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => {
              setSeleccionados(newSelection);
            }}
          />
        </Box>
      </ContenedorLista>
      {/* Modal para crear evento */}
      <ModalCrearEvento
        abierto={modalCrearAbierto}
        onCerrar={handleCerrarModalCrear}
        onCreado={handleEventoCreadoExitosamente}
      />
      {/* Modal para eliminar evento */}
      <ModalEliminarEvento
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsEvento={idsEvento}
        setAlerta={setAlerta}
        refrescarPagina={recargar}
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

export default ListaEventos;
