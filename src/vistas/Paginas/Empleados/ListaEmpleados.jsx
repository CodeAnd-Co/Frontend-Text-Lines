// RF17 - Consulta Lista Empleados - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF17
import React, { useState } from 'react'; 
import { Box } from '@mui/material';
import Tabla from '../../Componentes/Organismos/Tabla';
import ContenedorLista from '../../Componentes/Organismos/ContenedorLista';
import { useConsultarEmpleados } from '../../../hooks/Empleados/useConsultarEmpleados';
import ModalEliminarEmpleado from '../../componentes/organismos/ModalEliminarEmpleado';
import Alerta from '../../componentes/moleculas/Alerta';

const ListaGrupoEmpleados = () => {
  const { empleados, cargando, error } = useConsultarEmpleados();


  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [seleccionados, setSeleccionados] = useState([]);
  const [idsEmpleado, setIdsEmpleado] = useState([]);
  const [alerta, setAlerta] = useState(null);

  const columnas = [
    { field: 'nombreCompleto', headerName: 'Nombre del Empleado', flex: 1 },
    { field: 'correoElectronico', headerName: 'Correo Electrónico', flex: 1 },
    { field: 'numeroEmergencia', headerName: 'Número de Emergencia', width: 180 },
    { field: 'areaTrabajo', headerName: 'Área de Trabajo', flex: 1 },
    { field: 'posicion', headerName: 'Posición', flex: 1 },
    { field: 'cantidadPuntos', headerName: 'Puntos', width: 100 },
    { field: 'antiguedad', headerName: 'Antigüedad', flex: 1 },
  ];

  const filas = empleados.map((empleado) => ({
    id: empleado.idEmpleado,
    nombreCompleto: empleado.nombreCompleto,
    correoElectronico: empleado.correoElectronico,
    idEmpleado: empleado.idEmpleado,
    numeroEmergencia: empleado.numeroEmergencia,
    areaTrabajo: empleado.areaTrabajo,
    posicion: empleado.posicion,
    cantidadPuntos: empleado.cantidadPuntos,
    antiguedad: empleado.antiguedad,
  }));

  const botones = [
    { label: 'Añadir', onClick: () => console.log('Añadir'), size: 'large' },
    {
      variant: 'outlined',
      label: 'Importar',
      onClick: () => console.log('Importar'),
      size: 'large',
    },
    {
      variant: 'outlined',
      label: 'Exportar',
      onClick: () => console.log('Exportar'),
      size: 'large',
    },
    { variant: 'outlined', label: 'Editar', onClick: () => console.log('Editar'), size: 'large' },
    { 
      label: 'Eliminar',
      onClick: () => {
        if (seleccionados.length === 0) {
          setAlerta({
            tipo: 'error',
            mensaje: 'Selecciona al menos un empleado para eliminar.',
            icono: true,
            cerrable: true,
            centradoInferior: true,
          });
        } else {
          setIdsEmpleado(Array.from(seleccionados));
          setOpenModalEliminar(true);
        }
      },
      size: 'large',
    },
  ];

  return (
    <ContenedorLista
      titulo='Lista de Empleados'
      descripcion='Consulta y administra la información de los empleados registrados para cada cliente.'
      informacionBotones={botones}
    >
      <Box width={'100%'}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <Tabla 
          columns={columnas} 
          rows={filas} 
          loading={cargando} 
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSeleccionados(newSelection);
        }}
/>
      </Box>

      <ModalEliminarEmpleado
        open={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
        idsEmpleado={idsEmpleado}
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
    </ContenedorLista>
  );
};

export default ListaGrupoEmpleados;