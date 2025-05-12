import { Box, Grid, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto';
import Chip from '@Atomos/Chip';
import { tokens } from '@SRC/theme';
import Tabla from '@Organismos/Tabla';

// RF[23] Lee grupo de empleados -https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF23

const InfoGrupoEmpleados = ({ descripcion, setsProductos, empleados }) => {
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  // Columnas para la tabla
  const columnas = [
    { field: 'nombreCompleto', headerName: 'Nombre del Empleado', flex: 0.9 },
    { field: 'correoElectronico', headerName: 'Correo Electrónico', flex: 1 },
    { field: 'areaTrabajo', headerName: 'Área de Trabajo', flex: 0.85 },
  ];

  // Generación de filas desde el arreglo de empleados
  const filas = empleados.map((empleado, index) => {
    const [nombreCompleto, correoElectronico, areaTrabajo] = empleado.split(' | ');
    return {
      id: index + 1,
      nombreCompleto,
      correoElectronico,
      areaTrabajo,
    };
  });

  return (
    <Box
      p={3}
      sx={{
        borderRadius: '10px',
        maxWidth: '600px',
      }}
    >
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

        {/* Sets de Productos y Empleados */}
        <Grid item xs={12}>
          <Texto variant='h6' sx={{ color: colores.texto[1] }}>
            Sets de Productos:
          </Texto>
          <Box display='flex' gap={1} flexWrap='wrap' mb={2}>
            {setsProductos?.length ? (
              setsProductos.map((set, index) => (
                <Chip
                  key={index}
                  label={set}
                  sx={{
                    borderRadius: '16px',
                    backgroundColor: colores.primario[2],
                    color: colores.primario[4],
                  }}
                />
              ))
            ) : (
              <Texto variant='body1' sx={{ color: colores.texto[4] }}>
                No especificada
              </Texto>
            )}
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Texto variant='h6' sx={{ color: colores.texto[1] }}>
            Empleados:
          </Texto>
          <Box width={'700px'} mt={2}>
            {filas.length > 0 ? (
              <Tabla columns={columnas} rows={filas} pageSize={3} />
            ) : (
              <Texto variant='body1' sx={{ color: colores.texto[4] }}>
                No especificada
              </Texto>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfoGrupoEmpleados;
