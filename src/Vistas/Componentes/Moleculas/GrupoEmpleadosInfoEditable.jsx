import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import obtenerSetsProductos from '@Servicios/obtenerSetsProductos';
import obtenerEmpleados from '@Servicios/obtenerEmpleados';
import { useAuth } from '@Hooks/AuthProvider';
import {
  Box,
  Button,
  Grid,
  Card,
  CardHeader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
} from '@mui/material';
import Texto from '@Atomos/Texto';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

// Constantes para los límites de caracteres
const LIMITE_NOMBRE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

// Funciones auxiliares para la lista de transferencia
function notInList(sourceList, compareList) {
  return sourceList.filter(
    (item) => !compareList.find((compareItem) => compareItem.id === item.id)
  );
}

function intersection(listOne, listTwo) {
  return listOne.filter((item) => listTwo.find((item2) => item2.id === item.id));
}

function union(listOne, listTwo) {
  const combined = [...listOne];
  listTwo.forEach((item) => {
    if (!combined.find((existingItem) => existingItem.id === item.id)) {
      combined.push(item);
    }
  });
  return combined;
}

const InfoGrupoEmpleadosEditable = ({
  nombre: nombreInicial,
  descripcion: descripcionInicial,
  setsProductos: setsProductosInicial,
  empleados: empleadosInicial,
  onFormDataChange,
}) => {
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  // Ref para evitar llamadas múltiples del callback
  const isInitializedRef = useRef(false);
  const lastFormDataRef = useRef(null);

  // Estados locales
  const [nombre, setNombre] = useState(nombreInicial || '');
  const [descripcion, setDescripcion] = useState(descripcionInicial || '');

  // Estados para datos completos (sin filtrar)
  const [todosLosSets, setTodosLosSets] = useState([]);
  const [todosLosEmpleados, setTodosLosEmpleados] = useState([]);
  const [datosListos, setDatosListos] = useState(false);

  // Estados para la lista de transferencia de empleados
  const [checkedEmpleados, setCheckedEmpleados] = useState([]);
  const [rightEmpleados, setRightEmpleados] = useState(empleadosInicial || []);

  // Estados para la lista de transferencia de sets productos
  const [checkedSets, setCheckedSets] = useState([]);
  const [rightSets, setRightSets] = useState(setsProductosInicial || []);

  // Carga inicial de datos
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [productos, empleadosData] = await Promise.all([
          obtenerSetsProductos(clienteSeleccionado),
          obtenerEmpleados(clienteSeleccionado),
        ]);

        setTodosLosSets(productos);
        setTodosLosEmpleados(empleadosData);
        setDatosListos(true);
        isInitializedRef.current = true;
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    if (clienteSeleccionado && !isInitializedRef.current) {
      obtenerDatos();
    }
  }, [clienteSeleccionado]);

  // Calcular listas filtradas como valores derivados
  const leftSets = useMemo(
    () =>
      todosLosSets.filter(
        (producto) => !rightSets.find((selectedSet) => selectedSet.id === producto.id)
      ),
    [todosLosSets, rightSets]
  );

  const leftEmpleados = useMemo(
    () =>
      todosLosEmpleados.filter(
        (empleado) => !rightEmpleados.find((selectedEmp) => selectedEmp.id === empleado.id)
      ),
    [todosLosEmpleados, rightEmpleados]
  );

  // Función estable para generar los datos del formulario
  const generateFormData = useCallback(() => {
    if (!datosListos) return null;

    return {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      setsDeProductos: rightSets.map((set) => set.id),
      empleados: rightEmpleados.map((emp) => emp.id),
    };
  }, [nombre, descripcion, rightSets, rightEmpleados, datosListos]);

  // Efecto para notificar cambios en el formulario con debounce y comparación
  useEffect(() => {
    if (!datosListos || !onFormDataChange) return;

    const formData = generateFormData();

    // Comparar con los datos anteriores para evitar llamadas innecesarias
    const formDataString = JSON.stringify(formData);
    const lastFormDataString = JSON.stringify(lastFormDataRef.current);

    if (formDataString !== lastFormDataString) {
      lastFormDataRef.current = formData;

      // Usar setTimeout para debounce y evitar llamadas síncronas que causen loops
      const timeoutId = setTimeout(() => {
        onFormDataChange(formData);
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [generateFormData, onFormDataChange, datosListos]);

  // Handlers para empleados - estabilizados
  const handleToggleEmpleados = useCallback(
    (value) => () => {
      setCheckedEmpleados((prev) => {
        const currentIndex = prev.findIndex((item) => item.id === value.id);
        const newChecked = [...prev];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        return newChecked;
      });
    },
    []
  );

  const handleAllLeftEmpleados = useCallback(() => {
    setRightEmpleados([]);
    setCheckedEmpleados([]);
  }, []);

  const handleAllRightEmpleados = useCallback(() => {
    setRightEmpleados((prev) => [...prev, ...leftEmpleados]);
    setCheckedEmpleados([]);
  }, [leftEmpleados]);

  const handleCheckedRightEmpleados = useCallback(() => {
    const leftChecked = intersection(checkedEmpleados, leftEmpleados);
    setRightEmpleados((prev) => [...prev, ...leftChecked]);
    setCheckedEmpleados((prev) => notInList(prev, leftChecked));
  }, [checkedEmpleados, leftEmpleados]);

  const handleCheckedLeftEmpleados = useCallback(() => {
    const rightChecked = intersection(checkedEmpleados, rightEmpleados);
    setRightEmpleados((prev) => notInList(prev, rightChecked));
    setCheckedEmpleados((prev) => notInList(prev, rightChecked));
  }, [checkedEmpleados, rightEmpleados]);

  // Handlers para sets productos - estabilizados
  const handleToggleSets = useCallback(
    (value) => () => {
      setCheckedSets((prev) => {
        const currentIndex = prev.findIndex((item) => item.id === value.id);
        const newChecked = [...prev];

        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }

        return newChecked;
      });
    },
    []
  );

  const handleAllLeftSets = useCallback(() => {
    setRightSets([]);
    setCheckedSets([]);
  }, []);

  const handleAllRightSets = useCallback(() => {
    setRightSets((prev) => [...prev, ...leftSets]);
    setCheckedSets([]);
  }, [leftSets]);

  const handleCheckedRightSets = useCallback(() => {
    const leftChecked = intersection(checkedSets, leftSets);
    setRightSets((prev) => [...prev, ...leftChecked]);
    setCheckedSets((prev) => notInList(prev, leftChecked));
  }, [checkedSets, leftSets]);

  const handleCheckedLeftSets = useCallback(() => {
    const rightChecked = intersection(checkedSets, rightSets);
    setRightSets((prev) => notInList(prev, rightChecked));
    setCheckedSets((prev) => notInList(prev, rightChecked));
  }, [checkedSets, rightSets]);

  // Funciones auxiliares memoizadas
  const numberOfCheckedEmpleados = useMemo(
    () => (items) => intersection(checkedEmpleados, items).length,
    [checkedEmpleados]
  );

  const numberOfCheckedSets = useMemo(
    () => (items) => intersection(checkedSets, items).length,
    [checkedSets]
  );

  const handleToggleAllEmpleados = useCallback(
    (items) => () => {
      if (numberOfCheckedEmpleados(items) === items.length) {
        setCheckedEmpleados((prev) => notInList(prev, items));
      } else {
        setCheckedEmpleados((prev) => union(prev, items));
      }
    },
    [numberOfCheckedEmpleados]
  );

  const handleToggleAllSets = useCallback(
    (items) => () => {
      if (numberOfCheckedSets(items) === items.length) {
        setCheckedSets((prev) => notInList(prev, items));
      } else {
        setCheckedSets((prev) => union(prev, items));
      }
    },
    [numberOfCheckedSets]
  );

  // Componentes de lista memoizados
  const customListEmpleados = useCallback(
    (title, items) => (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAllEmpleados(items)}
              checked={numberOfCheckedEmpleados(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfCheckedEmpleados(items) !== items.length &&
                numberOfCheckedEmpleados(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          title={title}
          subheader={`${numberOfCheckedEmpleados(items)}/${items.length} seleccionados`}
        />
        <Divider />
        <List
          sx={{
            width: 350,
            height: 300,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component='div'
          role='list'
        >
          {items.map((value) => {
            const labelId = `transfer-list-empleados-${value.id}-label`;

            return (
              <ListItemButton key={value.id} role='listitem' onClick={handleToggleEmpleados(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checkedEmpleados.some((item) => item.id === value.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value.nombreCompleto || value.nombre}
                  secondary={value.correoElectronico || value.correo}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Card>
    ),
    [checkedEmpleados, handleToggleEmpleados, handleToggleAllEmpleados, numberOfCheckedEmpleados]
  );

  const customListSets = useCallback(
    (title, items) => (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={handleToggleAllSets(items)}
              checked={numberOfCheckedSets(items) === items.length && items.length !== 0}
              indeterminate={
                numberOfCheckedSets(items) !== items.length && numberOfCheckedSets(items) !== 0
              }
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'all items selected',
              }}
            />
          }
          title={title}
          subheader={`${numberOfCheckedSets(items)}/${items.length} seleccionados`}
        />
        <Divider />
        <List
          sx={{
            width: 350,
            height: 300,
            bgcolor: 'background.paper',
            overflow: 'auto',
          }}
          dense
          component='div'
          role='list'
        >
          {items.map((value) => {
            const labelId = `transfer-list-sets-${value.id}-label`;

            return (
              <ListItemButton key={value.id} role='listitem' onClick={handleToggleSets(value)}>
                <ListItemIcon>
                  <Checkbox
                    checked={checkedSets.some((item) => item.id === value.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value.nombreProducto}
                  secondary={`ID: ${value.id}`}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Card>
    ),
    [checkedSets, handleToggleSets, handleToggleAllSets, numberOfCheckedSets]
  );

  // Mostrar loading mientras se cargan los datos
  if (!datosListos) {
    return <div>Cargando datos...</div>;
  }

  return (
    <Box sx={{ width: '800px', margin: '0 auto', borderRadius: '10px' }}>
      <Grid container spacing={3}>
        {/* Nombre */}
        <Grid item xs={20} direction={'column'}>
          <Texto variant='h6'>Nombre:</Texto>
          <CampoTexto
            fullWidth
            type='text'
            variant='outlined'
            value={nombre}
            placeholder='Nombre del grupo'
            onChange={(evento) => setNombre(evento.target.value.slice(0, LIMITE_NOMBRE))}
            required
            helperText={`${nombre.length}/${LIMITE_NOMBRE} ${MENSAJE_LIMITE}`}
            inputProps={{ maxLength: LIMITE_NOMBRE }}
            sx={{ mt: 1, mb: 2, mr: 8, width: '300px', overflow: 'auto' }}
          />
        </Grid>

        {/* Descripción */}
        <Grid item xs={20} direction={'column'}>
          <Texto variant='h6'>Descripción:</Texto>
          <CampoTexto
            fullWidth
            variant='outlined'
            value={descripcion}
            placeholder='Escribe una descripción'
            onChange={(evento) => setDescripcion(evento.target.value.slice(0, LIMITE_DESCRIPCION))}
            helperText={`${descripcion.length}/${LIMITE_DESCRIPCION} ${MENSAJE_LIMITE}`}
            inputProps={{ maxLength: LIMITE_DESCRIPCION }}
            sx={{ mt: 1, mb: 2, width: '400px', overflow: 'auto' }}
          />
        </Grid>

        {/* Sets de Productos */}
        <Grid item xs={12}>
          <Texto variant='h6'>Sets de Productos:</Texto>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
            <Grid
              container
              spacing={2}
              justifyContent='center'
              alignItems='center'
              sx={{ maxWidth: '800px' }}
            >
              <Grid item>{customListSets('Sets Disponibles', leftSets)}</Grid>
              <Grid item>
                <Grid container direction='column' alignItems='center'>
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleAllRightSets}
                    disabled={leftSets.length === 0}
                    aria-label='move all right'
                    startIcon={<KeyboardDoubleArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleCheckedRightSets}
                    disabled={numberOfCheckedSets(leftSets) === 0}
                    aria-label='move selected right'
                    startIcon={<KeyboardArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleCheckedLeftSets}
                    disabled={numberOfCheckedSets(rightSets) === 0}
                    aria-label='move selected left'
                    startIcon={<KeyboardArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleAllLeftSets}
                    disabled={rightSets.length === 0}
                    aria-label='move all left'
                    startIcon={<KeyboardDoubleArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                </Grid>
              </Grid>
              <Grid item>{customListSets('Sets Seleccionados', rightSets)}</Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Lista de transferencia de empleados */}
        <Grid item xs={12}>
          <Texto variant='h6'>Empleados:</Texto>
          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 2 }}>
            <Grid
              container
              spacing={2}
              justifyContent='center'
              alignItems='center'
              sx={{ maxWidth: '800px' }}
            >
              <Grid item>{customListEmpleados('Empleados Disponibles', leftEmpleados)}</Grid>
              <Grid item>
                <Grid container direction='column' alignItems='center'>
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleAllRightEmpleados}
                    disabled={leftEmpleados.length === 0}
                    aria-label='move all right'
                    startIcon={<KeyboardDoubleArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleCheckedRightEmpleados}
                    disabled={numberOfCheckedEmpleados(leftEmpleados) === 0}
                    aria-label='move selected right'
                    startIcon={<KeyboardArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleCheckedLeftEmpleados}
                    disabled={numberOfCheckedEmpleados(rightEmpleados) === 0}
                    aria-label='move selected left'
                    startIcon={<KeyboardArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={handleAllLeftEmpleados}
                    disabled={rightEmpleados.length === 0}
                    aria-label='move all left'
                    startIcon={<KeyboardDoubleArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                </Grid>
              </Grid>
              <Grid item>{customListEmpleados('Empleados Seleccionados', rightEmpleados)}</Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box display='flex' justifyContent='flex-end' mt={3}></Box>
    </Box>
  );
};

export default InfoGrupoEmpleadosEditable;
