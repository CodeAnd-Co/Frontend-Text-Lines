import Alerta from '@Moleculas/Alerta';
import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect } from 'react';
import obtenerSetsProductos from '@Servicios/obtenerSetsProductos';
import obtenerEmpleados from '@Servicios/obtenerEmpleados';
import TablaSetsEmpleados from '@Organismos/TablaSetsEmpleados';
import { useAuth } from '@Hooks/AuthProvider';
import { Box, Button, Chip, Grid } from '@mui/material';
import Texto from '@Atomos/Texto';

const InfoGrupoEmpleadosEditable = ({
  nombre: nombreInicial,
  descripcion: descripcionInicial,
  setsProductos: setsProductosInicial,
  idsSetProductos: idsSetsProductosInicial, // IDs iniciales de sets de productos
  empleados: empleadosInicial,
  idsEmpleados: idsEmpleadosInicial, // IDs iniciales de empleados
}) => {
  const [productosDisponibles, setProductosDisponibles] = useState([]);
  const [empleadosDisponibles, setEmpleadosDisponibles] = useState([]);
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  // Estados locales
  const [nombre, setNombre] = useState(nombreInicial || '');
  const [descripcion, setDescripcion] = useState(descripcionInicial || '');
  const [setsProductos, setSetsProductos] = useState(setsProductosInicial || []);
  const [empleados, setEmpleados] = useState(empleadosInicial || []);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Estados para manejar las selecciones en las tablas - INICIALIZADOS CON LOS IDs
  const [productosSeleccionados, setProductosSeleccionados] = useState(
    idsSetsProductosInicial || []
  );
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState(idsEmpleadosInicial || []);

  useEffect(() => {
    const obtenerDatos = async () => {
      const productos = await obtenerSetsProductos(clienteSeleccionado);
      setProductosDisponibles(productos);

      const empleadosData = await obtenerEmpleados(clienteSeleccionado);
      setEmpleadosDisponibles(empleadosData);
    };

    obtenerDatos();
  }, [clienteSeleccionado]);

  // Efecto para sincronizar cuando cambien los IDs iniciales (por si se recarga el componente)
  useEffect(() => {
    if (idsSetsProductosInicial && idsSetsProductosInicial.length > 0) {
      setProductosSeleccionados(idsSetsProductosInicial);
    }
  }, [idsSetsProductosInicial]);

  useEffect(() => {
    if (idsEmpleadosInicial && idsEmpleadosInicial.length > 0) {
      setEmpleadosSeleccionados(idsEmpleadosInicial);
    }
  }, [idsEmpleadosInicial]);

  // Efecto para mantener sincronizados los chips con las selecciones
  useEffect(() => {
    if (productosDisponibles.length > 0 && productosSeleccionados.length > 0) {
      const productosActualizados = productosDisponibles.filter((producto) =>
        productosSeleccionados.includes(producto.id)
      );
      setSetsProductos(productosActualizados);
    }
  }, [productosDisponibles, productosSeleccionados]);

  useEffect(() => {
    if (empleadosDisponibles.length > 0 && empleadosSeleccionados.length > 0) {
      const empleadosActualizados = empleadosDisponibles.filter((empleado) =>
        empleadosSeleccionados.includes(empleado.id)
      );
      setEmpleados(empleadosActualizados);
    }
  }, [empleadosDisponibles, empleadosSeleccionados]);

  // Manejar cambios en la selección de productos
  const handleSeleccionProductos = (selectionData) => {
    console.log('Selecciones productos recibidas:', selectionData);

    let seleccionesArray = [];
    if (selectionData && selectionData.ids && selectionData.ids instanceof Set) {
      seleccionesArray = Array.from(selectionData.ids);
    } else if (Array.isArray(selectionData)) {
      seleccionesArray = selectionData;
    }

    setProductosSeleccionados(seleccionesArray);

    // Actualizar los chips basándose en las selecciones
    const productosActualizados = productosDisponibles.filter((producto) =>
      seleccionesArray.includes(producto.id)
    );
    setSetsProductos(productosActualizados);
  };

  // Manejar cambios en la selección de empleados
  const handleSeleccionEmpleados = (selectionData) => {
    console.log('Selecciones empleados recibidas:', selectionData);
    let seleccionesArray = [];
    if (selectionData && selectionData.ids && selectionData.ids instanceof Set) {
      seleccionesArray = Array.from(selectionData.ids);
    } else if (Array.isArray(selectionData)) {
      seleccionesArray = selectionData;
    }

    setEmpleadosSeleccionados(seleccionesArray);

    // Actualizar los chips basándose en las selecciones
    const empleadosActualizados = empleadosDisponibles.filter((empleado) =>
      seleccionesArray.includes(empleado.id)
    );
    setEmpleados(empleadosActualizados);
  };

  // Preparar filas para la tabla de empleados
  const filas = empleadosDisponibles.map((empleado) => ({
    id: empleado.id,
    nombreCompleto: empleado.nombre,
    correo: empleado.correo,
    areaTrabajo: empleado.area,
  }));
  console.log('Productos seleccionados:', productosSeleccionados);
  console.log('Empleados seleccionados:', empleadosSeleccionados);

  const handleGuardar = () => {
    if (!nombre || !descripcion || setsProductos.length === 0 || empleados.length === 0) {
      setMostrarAlerta(true);
      return;
    }

    console.log('Nombre:', nombre);
    console.log('Descripción:', descripcion);
    console.log('Sets de Productos:', setsProductos);
    console.log('Empleados:', empleados);
    console.log('IDs Sets Productos:', productosSeleccionados);
    console.log('IDs Empleados:', empleadosSeleccionados);
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
          <TablaSetsEmpleados
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
            selectionModel={productosSeleccionados}
            onRowSelectionModelChange={handleSeleccionProductos}
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
                  label={
                    empleado.nombre && empleado.correo && empleado.area
                      ? `${empleado.nombre} | ${empleado.correo} | ${empleado.area}`
                      : empleado.toString()
                  }
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
          <TablaSetsEmpleados
            elevacion={1}
            sx={{}}
            columnas={[
              { field: 'nombreCompleto', headerName: 'Nombre del Empleado', flex: 0.9 },
              { field: 'correo', headerName: 'Correo Electrónico', flex: 1 },
              { field: 'areaTrabajo', headerName: 'Área de Trabajo', flex: 0.85 },
            ]}
            filas={filas}
            paginacion={4}
            checkBox={true}
            selectionModel={empleadosSeleccionados}
            onRowSelectionModelChange={handleSeleccionEmpleados}
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
