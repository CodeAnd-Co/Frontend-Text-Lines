// RF[8] Leer Rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF8

import { useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useLeerRol } from '@Hooks/Roles/useLeerRol';
import Alerta from '@Moleculas/Alerta';
import Tabla from '@Organismos/Tabla';
import { tokens } from '@SRC/theme';

const ModalDetalleRol = ({ abierto, onCerrar, idRol }) => {
  const { detalle, cargando, error, leerRol } = useLeerRol();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);

  useEffect(() => {
    if (abierto && idRol) leerRol(idRol);
  }, [abierto, idRol]);

  const columnas = [
    {
      field: 'nombre',
      headerName: 'Permisos',
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      flex: 2,
    },
  ];

  const filas = (detalle?.permisos || []).map((permiso) => ({
    id: permiso.id,
    nombre: permiso.nombre,
    descripcion: permiso.descripcion,
  }));

  return (
    <ModalFlotante
      open={abierto}
      onClose={onCerrar}
      onConfirm={onCerrar}
      titulo="Detalles del Rol"
      tituloVariant="h4"
      customWidth={700}
      botones={[
        {
          label: 'Salir',
          variant: 'contained',
          size: 'large',
          color: 'error',
          backgroundColor: colores.altertex[1],
          onClick: onCerrar,
        },
      ]}
    >
      {error && (
        <Alerta
          tipo="error"
          mensaje={error}
          duracion={3000}
          cerrable
          onClose={() => {}}
        />
      )}

      {detalle && (
        <>
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Rol:</strong> {detalle.nombre}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            <strong>Número de usuarios asociados a este rol:</strong> {detalle.totalUsuarios}
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Tabla
              columns={columnas}
              rows={filas}
              loading={cargando}
              disableRowSelectionOnClick
            />
          </Box>
        </>
      )}
    </ModalFlotante>
  );
};

export default ModalDetalleRol;