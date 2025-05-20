// RF[23] Lee grupo de empleados -https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23

import React, { useState } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import Chip from '@Atomos/Chip';
import { tokens } from '@SRC/theme';
import Tabla from '@Organismos/Tabla';
import TarjetaBasica from '@SRC/Vistas/Componentes/Moleculas/TarjetaBasica';
import InfoSetProductos from '@Moleculas/SetProductosInfo';
import { useConsultarSetsProductos } from '@SRC/hooks/SetsProductos/useConsultarSetsProductos';

const InfoGrupoEmpleados = ({ descripcion, setsProductos, empleados, setsDisponibles = [] }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [setSeleccionado, setSetSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const { setsDeProductos } = useConsultarSetsProductos();
  const setsDisponiblesFinal = setsDisponibles.length ? setsDisponibles : setsDeProductos;

  const columnas = [
    { field: 'nombreCompleto', headerName: 'Nombre del Empleado', flex: 0.9 },
    { field: 'correoElectronico', headerName: 'Correo Electrónico', flex: 1 },
    { field: 'areaTrabajo', headerName: 'Área de Trabajo', flex: 0.85 },
  ];

  const filas = empleados.map((empleado, index) => {
    const [nombreCompleto, correoElectronico, areaTrabajo] = empleado.split(' | ');
    return {
      id: index + 1,
      nombreCompleto,
      correoElectronico,
      areaTrabajo,
    };
  });

  const setsList = Array.isArray(setsProductos)
    ? setsProductos.map((set) =>
        typeof set === 'string'
          ? { nombre: set }
          : set
      )
    : [];

  const ChipClick = (set) => {
    const nombreSet = set.nombre || set;

    if (setSeleccionado?.nombre === nombreSet && modalDetalleAbierto) {
      setModalDetalleAbierto(false);
      setSetSeleccionado(null);
      return;
    }

    const setCompleto = setsDisponiblesFinal.find(
      s => s.nombre === nombreSet
    );
    setSetSeleccionado(setCompleto || set);
    setModalDetalleAbierto(true);
  };

  return (
    <Box p={3} sx={{ borderRadius: '10px', maxWidth: '600px' }}>
      <Grid container spacing={2}>
        {/* Descripción */}
        <Grid item xs={12}>
          <Texto variant='h6' sx={{ color: colores.texto[1] }}>
            Descripción:
          </Texto>
          <Texto variant='body2' sx={{ color: 'text.secondary' }}>
            {descripcion || 'No especificada'}
          </Texto>
        </Grid>

        {/* Sets de Productos */}
        <Grid item xs={12}>
          <Texto variant='h6' sx={{ color: colores.texto[1] }}>
            Sets de Productos:
          </Texto>
            <Box display='flex' gap={1} flexWrap='wrap' mb={2}>
              {setsProductos === 'Sin sets de productos asociados' ? (
                <Texto variant='body1' sx={{ color: colores.texto[4] }}>
                  {setsProductos}
                </Texto>
              ) : setsList.length > 0 ? (
                setsList.map((set, index) => {
                  const nombreSet = set.nombre || set;
                  const esSeleccionado = setSeleccionado?.nombre === nombreSet;

                  return (
                    <Chip
                      key={index}
                      label={nombreSet}
                      sx={{
                        borderRadius: '16px',
                        backgroundColor: esSeleccionado
                          ? colores.primario[3] 
                          : colores.primario[2],
                        color: colores.primario[4],
                        cursor: 'pointer',
                        boxShadow: esSeleccionado ? '0 0 5px rgba(0,0,0,0.2)' : 'none',
                        fontWeight: esSeleccionado ? 'bold' : 'normal',
                        '&:hover': {
                          backgroundColor: colores.primario[3],
                        },
                      }}
                      onClick={() => ChipClick(set)}
                    />
                  );
                })
              ) : (
                <Texto variant='body1' sx={{ color: colores.texto[4] }}>
                  No especificada
                </Texto>
              )}
            </Box>

        {/* Modal de detalle del set de productos */}
        {modalDetalleAbierto && setSeleccionado && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            mb={2}
            width="100%"
          >
          <TarjetaBasica
            tituloPrincipal={setSeleccionado.nombre}
            descripcion={setSeleccionado.descripcion}
            textoBoton={null}  
          >
            <InfoSetProductos
              productos={setSeleccionado.productos}
              mostrarGrupos={false}
            />

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Texto
                variant="body2"
                sx={{
                  cursor: 'pointer',
                  color: colores.primario[3],
                  fontWeight: 'bold',
                  '&:hover': { textDecoration: 'underline' },
                }}
                onClick={() => {
                  setModalDetalleAbierto(false);
                  setSetSeleccionado(null);
                }}
              >
                CERRAR
              </Texto>
            </Box>
          </TarjetaBasica>
          </Box>
        )}
        </Grid>

        <Grid item xs={12}>
          <Texto variant='h6' sx={{ color: colores.texto[1] }}>
            Empleados:
          </Texto>
          {empleados === 'Sin empleados asociados' ? (
            <Texto variant='body1' sx={{ color: colores.texto[4] }}>
              {empleados}
            </Texto>
          ) : (
            <Box width={'700px'} mt={2}>
              {filas.length > 0 ? (
                <Tabla columns={columnas} rows={filas} pageSize={3} />
              ) : (
                <Texto variant='body1' sx={{ color: colores.texto[4] }}>
                  No especificada
                </Texto>
              )}
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoGrupoEmpleados;
