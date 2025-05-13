import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerSetsProductos from '@Servicios/obtenerSetsProductos';
import obtenerEmpleados from '@Servicios/obtenerEmpleados';
import ProductosModal from '@Organismos/ProductosModal';
import { useAuth } from '@Hooks/AuthProvider';
import Tabla from '@Organismos/Tabla';
import { Box, Button, Chip, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';

const InfoGrupoEmpleadosEditable = ({
  nombre: nombreInicial,
  descripcion: descripcionInicial,
  setsProductos: setsProductosInicial,
  empleados: empleadosInicial,
}) => {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [empleadosDisponibles, setEmpleadosDisponibles] = useState([]); // Lista de empleados disponibles
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  // Estados locales
  const [nombre, setNombre] = useState(nombreInicial || '');
  const [descripcion, setDescripcion] = useState(descripcionInicial || '');
  const [setsProductos, setSetsProductos] = useState(setsProductosInicial || []);
  const [empleados, setEmpleados] = useState(empleadosInicial || []);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      const productos = await obtenerSetsProductos(clienteSeleccionado);
      setProductosDisponibles(productos);

      const empleados = await obtenerEmpleados(clienteSeleccionado); // Obtener empleados disponibles
      setEmpleadosDisponibles(empleados);
    };

    obtenerDatos();
  }, [clienteSeleccionado]);

  const handleAgregarProducto = (evento) => {
    const productoSeleccionado = evento.row;

    const yaExiste = setsProductos.some((producto) => producto.id === productoSeleccionado.id);
    if (!yaExiste) {
      setSetsProductos((prev) => [...prev, productoSeleccionado]);
    }
  };

  const handleAgregarEmpleado = (evento) => {
    const empleadoSeleccionado = evento.row;

    const yaExiste = empleados.some((empleado) => empleado.id === empleadoSeleccionado.id);
    if (!yaExiste) {
      setEmpleados((prev) => [...prev, empleadoSeleccionado]);
    }
  };

  const filasEmpleados = empleados.map((empleado, index) => {
    const [nombreCompleto, correoElectronico, areaTrabajo] = empleado.split(' | ');
    return {
      id: index + 1,
      nombreCompleto,
      correoElectronico,
      areaTrabajo,
    };
  });

  const handleGuardar = () => {
    if (!nombre || !descripcion || setsProductos.length === 0 || empleados.length === 0) {
      setMostrarAlerta(true); // Mostrar alerta si faltan datos
      return;
    }

    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Sets de Productos:', setsProductos);
    console.log('Empleados:', empleados);
    // Aquí puedes implementar la lógica para guardar los cambios
  };

  return (
    <Box p={3}>
      <Grid container spacing={2}>
        {/* Nombre */}
        <Grid item xs={12}>
          <Texto variant='h6'>Nombre:</Texto>
          <CampoTexto
            fullWidth
            variant='outlined'
            value={nombre}
            placeholder='Nombre del grupo'
            onChange={(e) => setNombre(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Grid>

        {/* Descripción */}
        <Grid item xs={12}>
          <Texto variant='h6'>Descripción:</Texto>
          <CampoTexto
            fullWidth
            variant='outlined'
            value={descripcion}
            placeholder='Escribe una descripción'
            onChange={(e) => setDescripcion(e.target.value)}
            sx={{ mt: 1 }}
          />
        </Grid>

        {/* Sets de Productos */}
        <Grid item xs={12}>
          <Texto variant='h6'>Sets de Productos:</Texto>
          <Box display='flex' gap={1} flexWrap='wrap' mb={2}>
            {setsProductos?.length > 0 ? (
              setsProductos.map((set, index) => (
                <Chip
                  key={index}
                  label={set.nombreProducto || set}
                  onDelete={() => setSetsProductos(setsProductos.filter((_, i) => i !== index))}
                  sx={{
                    borderRadius: '16px',
                    backgroundColor: '#e0f7fa',
                    color: '#006064',
                  }}
                />
              ))
            ) : (
              <Texto variant='body1' sx={{ color: '#9e9e9e' }}>
                No especificada
              </Texto>
            )}
          </Box>
          <ProductosModal
            elevacion={1}
            sx={{ width: '100%', height: '350px' }}
            columnas={[
              { field: 'id', headerName: 'Id', width: 100 },
              { field: 'nombreProducto', headerName: 'Nombre', width: 220 },
              { field: 'tipo', headerName: 'Tipo', width: 100 },
            ]}
            filas={productosDisponibles}
            paginacion={4}
            checkBox={true}
            onRowClick={handleAgregarProducto}
          />
        </Grid>

        {/* Empleados */}
        <Grid item xs={12}>
          <Texto variant='h6'>Empleados:</Texto>
          <Box display='flex' gap={1} flexWrap='wrap' mb={2}>
            {empleados?.length > 0 ? (
              empleados.map((empleado, index) => (
                <Chip
                  key={index}
                  label={empleado.nombreCompleto || empleado}
                  onDelete={() => setEmpleados(empleados.filter((_, i) => i !== index))}
                  sx={{
                    borderRadius: '16px',
                    backgroundColor: '#e0f7fa',
                    color: '#006064',
                  }}
                />
              ))
            ) : (
              <Texto variant='body1' sx={{ color: '#9e9e9e' }}>
                No especificada
              </Texto>
            )}
          </Box>
          <ProductosModal
            elevacion={1}
            sx={{ width: '100%', height: '350px' }}
            columnas={[
              { field: 'id', headerName: 'Id', width: 100 },
              { field: 'nombre', headerName: 'Nombre', width: 220 },
              { field: 'area', headerName: 'Área de Trabajo', width: 200 },
            ]}
            filas={empleadosDisponibles}
            paginacion={4}
            checkBox={true}
            onRowClick={handleAgregarEmpleado}
          />
        </Grid>

        {/* Botón Guardar */}
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={handleGuardar} sx={{ mt: 2 }}>
            Guardar Cambios
          </Button>
        </Grid>
      </Grid>

      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje='Completa todos los campos y selecciona al menos un producto.'
          cerrable
          duracion={10000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
    </Box>
  );
};

export default InfoGrupoEmpleadosEditable;
