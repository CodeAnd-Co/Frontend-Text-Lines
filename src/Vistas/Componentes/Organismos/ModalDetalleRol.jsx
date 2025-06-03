// RF[8] Leer Rol - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF8

import { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useLeerRol } from '@Hooks/Roles/useLeerRol';
import Alerta from '@Moleculas/Alerta';
import Tabla from '@Organismos/Tabla';
import ListaTransferencia from '@Organismos/ListaTransferencia';
import CampoTexto from '@Atomos/CampoTexto';
import obtenerPermisos from '@Servicios/obtenerPermisos';
import { tokens } from '@SRC/theme';

const ModalDetalleRol = ({ abierto, onCerrar, idRol }) => {
  const { detalle, cargando, error, leerRol } = useLeerRol();
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  // Estados para los campos editables
  const [nombreRol, setNombreRol] = useState('');
  const [descripcionRol, setDescripcionRol] = useState('');

  // Add ref to track if permissions have been loaded
  const permisosLoadedRef = useRef(false);

  useEffect(() => {
    if (abierto && idRol) leerRol(idRol);
  }, [abierto, idRol, leerRol]);

  // Initialize editable fields when detail is loaded
  useEffect(() => {
    if (detalle) {
      setNombreRol(detalle.nombre || '');
      setDescripcionRol(detalle.descripcion || '');
    }
  }, [detalle]);

  // Reset the ref when modal closes or role changes
  useEffect(() => {
    if (!abierto || !modoEdicion) {
      permisosLoadedRef.current = false;
    }
  }, [abierto, modoEdicion]);

  // Modified useEffect with ref check to prevent infinite loop
  useEffect(() => {
    const cargarPermisos = async () => {
      if (detalle && modoEdicion && !permisosLoadedRef.current) {
        const todosLosPermisos = await obtenerPermisos();
        const permisosDelRol = detalle.permisos || [];

        const permisosNoAsignados = todosLosPermisos.filter(
          permiso => !permisosDelRol.some(asignado => asignado.id === permiso.id)
        );

        setPermisosDisponibles(permisosNoAsignados);
        setPermisosSeleccionados(permisosDelRol);
        permisosLoadedRef.current = true;
      }
    };

    cargarPermisos();
  }, [detalle, modoEdicion]);

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

  const manejarCambioEdicion = () => {
    setModoEdicion(!modoEdicion);
  };

  const manejarCambioTransferencia = useCallback(({ disponibles, seleccionados }) => {
    setPermisosDisponibles(disponibles);
    setPermisosSeleccionados(seleccionados);
  }, []);

  const manejarGuardar = () => {
    // Console log the data that would be sent to the API
    const datosParaEnviar = {
      nombre: nombreRol,
      descripcion: descripcionRol,
      permisos: permisosSeleccionados.map(permiso => ({ id: permiso.id, nombre: permiso.nombre }))
    };

    console.log('Datos para enviar:', datosParaEnviar);
    console.log('Permisos seleccionados:', permisosSeleccionados);

    // TODO: Implement custom hook call here
    // useActualizarRol(idRol, datosParaEnviar);

    setModoEdicion(false);
  };

  const manejarCancelar = () => {
    // Reset fields to original values
    setNombreRol(detalle?.nombre || '');
    setDescripcionRol(detalle?.descripcion || '');
    setModoEdicion(false);
  };

  const manejarCerrar = () => {
    setModoEdicion(false);
    onCerrar();
  };

  const manejarCambioNombre = (event) => {
    setNombreRol(event.target.value);
  };

  const manejarCambioDescripcion = (event) => {
    setDescripcionRol(event.target.value);
  };

  const botonesModo = modoEdicion ? [
    {
      label: 'Cancelar',
      variant: 'outlined',
      size: 'large',
      outlineColor: colores.altertex[1],
      onClick: manejarCancelar,
    },
    {
      label: 'Guardar',
      variant: 'contained',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: manejarGuardar,
    }
  ] : [
    {
      label: 'Editar',
      variant: 'contained',
      size: 'large',
      backgroundColor: colores.altertex[1],
      onClick: manejarCambioEdicion,
    },
    {
      label: 'Salir',
      variant: 'outlined',
      size: 'large',
      outlineColor: colores.altertex[1],
      onClick: manejarCerrar,
    }
  ];

  return (
    <>
      {error && (
        <Box
          sx={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1500,
            width: 'calc(100% - 32px)',
            maxWidth: 600,
          }}
        >
          <Alerta
            tipo="error"
            mensaje={error}
            duracion={4000}
            cerrable
            onClose={() => {}}
          />
        </Box>
      )}

      <ModalFlotante
        open={abierto}
        onClose={manejarCerrar}
        onConfirm={manejarCerrar}
        titulo={modoEdicion ? "Editar Rol" : "Detalles del Rol"}
        tituloVariant="h4"
        customWidth={modoEdicion ? 800 : 800}
        botones={botonesModo}
      >
        {cargando && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            Cargando...
          </Typography>
        )}

        {!cargando && detalle && (
          <>
            {modoEdicion ? (
              <Box sx={{ mb: 3 }}>
                <CampoTexto
                  label="Nombre del Rol"
                  name="nombreRol"
                  value={nombreRol}
                  onChange={manejarCambioNombre}
                  fullWidth
                  required
                  maxLength={50}
                  helperText={`${nombreRol.length}/50 caracteres`}
                  sx={{ mb: 2 }}
                />
                <CampoTexto
                  label="Descripción"
                  name="descripcionRol"
                  value={descripcionRol}
                  onChange={manejarCambioDescripcion}
                  fullWidth
                  multiline
                  rows={3}
                  maxLength={150}
                  helperText={`${descripcionRol.length}/150 caracteres`}
                  sx={{ mb: 2 }}
                />
              </Box>
            ) : (
              <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Rol:</strong> {detalle.nombre}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  <strong>Descripción:</strong> {detalle.descripcion}
                </Typography>
              </Box>
            )}

            <Typography variant="body1" sx={{ mb: 3 }}>
              <strong>Número de usuarios asociados a este rol:</strong> {detalle.totalUsuarios}
            </Typography>

            {modoEdicion ? (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
                  Gestionar Permisos
                </Typography>
                <ListaTransferencia
                  elementosDisponibles={permisosDisponibles}
                  elementosSeleccionados={permisosSeleccionados}
                  alCambiarSeleccion={manejarCambioTransferencia}
                  tituloIzquierda="Permisos Disponibles"
                  tituloDerecha="Permisos Asignados"
                  obtenerEtiquetaElemento={(permiso) => permiso.nombre}
                  obtenerClaveElemento={(permiso) => permiso.id}
                  alturaMaxima={300}
                  ancho={300}
                />
              </Box>
            ) : (
              <Box sx={{ mb: 4 }}>
                <Tabla
                  columns={columnas}
                  rows={filas}
                  loading={cargando}
                  disableRowSelectionOnClick
                />
              </Box>
            )}
          </>
        )}
      </ModalFlotante>
    </>
  );
};

export default ModalDetalleRol;