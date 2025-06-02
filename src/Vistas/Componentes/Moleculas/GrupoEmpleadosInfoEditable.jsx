import CampoTexto from '@Atomos/CampoTexto';
import { useState, useEffect, useMemo } from 'react';
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
function not(a, b) {
  return a.filter((value) => !b.find((item) => item.id === value.id));
}

function intersection(a, b) {
  return a.filter((value) => b.find((item) => item.id === value.id));
}

function union(a, b) {
  return [...a, ...not(b, a)];
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

  // Estados locales
  const [nombre, setNombre] = useState(nombreInicial || '');
  const [descripcion, setDescripcion] = useState(descripcionInicial || '');
  const [errores, setErrores] = useState({});
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Estados para la lista de transferencia de empleados
  const [checkedEmpleados, setCheckedEmpleados] = useState([]);
  const [leftEmpleados, setLeftEmpleados] = useState([]);
  const [rightEmpleados, setRightEmpleados] = useState(empleadosInicial || []);

  // Estados para la lista de transferencia de sets productos
  const [checkedSets, setCheckedSets] = useState([]);
  const [leftSets, setLeftSets] = useState([]);
  const [rightSets, setRightSets] = useState(setsProductosInicial || []);

  const rightSetsIds = useMemo(
    () =>
      rightSets
        .map((item) => item.id)
        .sort()
        .join(','),
    [rightSets]
  );

  const rightEmpleadosIds = useMemo(
    () =>
      rightEmpleados
        .map((item) => item.id)
        .sort()
        .join(','),
    [rightEmpleados]
  );

  useEffect(() => {
    const obtenerDatos = async () => {
      const productos = await obtenerSetsProductos(clienteSeleccionado);
      setLeftSets(productos.filter((prod) => !rightSets.find((r) => r.id === prod.id)));

      const empleadosData = await obtenerEmpleados(clienteSeleccionado);
      setLeftEmpleados(empleadosData.filter((emp) => !rightEmpleados.find((r) => r.id === emp.id)));
    };

    obtenerDatos();
  }, [clienteSeleccionado]);

  // Validación de campos
  const validarCampos = () => {
    const nuevosErrores = {};

    if (!nombre.trim()) {
      nuevosErrores.nombre = 'Este campo es obligatorio';
    } else if (nombre.length > LIMITE_NOMBRE) {
      nuevosErrores.nombre = `El nombre no puede exceder ${LIMITE_NOMBRE} caracteres`;
    }

    if (!descripcion.trim()) {
      nuevosErrores.descripcion = 'Este campo es obligatorio';
    } else if (descripcion.length > LIMITE_DESCRIPCION) {
      nuevosErrores.descripcion = `La descripción no puede exceder ${LIMITE_DESCRIPCION} caracteres`;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Efecto para validar y notificar cambios
  useEffect(() => {
    const isValid = validarCampos();

    if (onFormDataChange) {
      onFormDataChange({
        isValid,
        nombre,
        descripcion,
        setsDeProductos: rightSets.map((set) => set.id),
        empleados: rightEmpleados.map((emp) => emp.id),
      });
    }
  }, [nombre, descripcion, rightSets, rightEmpleados]);

  // Handlers para empleados
  const handleToggleEmpleados = (value) => () => {
    const currentIndex = checkedEmpleados.findIndex((item) => item.id === value.id);
    const newChecked = [...checkedEmpleados];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedEmpleados(newChecked);
  };

  const handleAllLeftEmpleados = () => {
    setLeftEmpleados(leftEmpleados.concat(rightEmpleados));
    setRightEmpleados([]);
  };

  const handleAllRightEmpleados = () => {
    setRightEmpleados(rightEmpleados.concat(leftEmpleados));
    setLeftEmpleados([]);
  };

  const handleCheckedRightEmpleados = () => {
    const leftChecked = intersection(checkedEmpleados, leftEmpleados);
    setRightEmpleados(rightEmpleados.concat(leftChecked));
    setLeftEmpleados(not(leftEmpleados, leftChecked));
    setCheckedEmpleados(not(checkedEmpleados, leftChecked));
  };

  const handleCheckedLeftEmpleados = () => {
    const rightChecked = intersection(checkedEmpleados, rightEmpleados);
    setLeftEmpleados(leftEmpleados.concat(rightChecked));
    setRightEmpleados(not(rightEmpleados, rightChecked));
    setCheckedEmpleados(not(checkedEmpleados, rightChecked));
  };

  // Handlers para sets productos
  const handleToggleSets = (value) => () => {
    const currentIndex = checkedSets.findIndex((item) => item.id === value.id);
    const newChecked = [...checkedSets];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedSets(newChecked);
  };

  const handleAllLeftSets = () => {
    setLeftSets(leftSets.concat(rightSets));
    setRightSets([]);
  };

  const handleAllRightSets = () => {
    setRightSets(rightSets.concat(leftSets));
    setLeftSets([]);
  };

  const handleCheckedRightSets = () => {
    const leftChecked = intersection(checkedSets, leftSets);
    setRightSets(rightSets.concat(leftChecked));
    setLeftSets(not(leftSets, leftChecked));
    setCheckedSets(not(checkedSets, leftChecked));
  };

  const handleCheckedLeftSets = () => {
    const rightChecked = intersection(checkedSets, rightSets);
    setLeftSets(leftSets.concat(rightChecked));
    setRightSets(not(rightSets, rightChecked));
    setCheckedSets(not(checkedSets, rightChecked));
  };

  const numberOfCheckedEmpleados = (items) => intersection(checkedEmpleados, items).length;
  const numberOfCheckedSets = (items) => intersection(checkedSets, items).length;

  const handleToggleAllEmpleados = (items) => () => {
    if (numberOfCheckedEmpleados(items) === items.length) {
      setCheckedEmpleados(not(checkedEmpleados, items));
    } else {
      setCheckedEmpleados(union(checkedEmpleados, items));
    }
  };

  const handleToggleAllSets = (items) => () => {
    if (numberOfCheckedSets(items) === items.length) {
      setCheckedSets(not(checkedSets, items));
    } else {
      setCheckedSets(union(checkedSets, items));
    }
  };

  const customListEmpleados = (title, items) => (
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
  );
  const customListSets = (title, items) => (
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
  );

  return (
    <Box sx={{ width: '800px', margin: '0 auto', borderRadius: '10px' }}>
      <Grid container spacing={3}>
        {/* Nombre */}
        <Grid item xs={20} direction={'column'}>
          <Texto variant='h6'>Nombre:</Texto>
          <CampoTexto
            fullWidth
            variant='outlined'
            value={nombre}
            placeholder='Nombre del grupo'
            onChange={(e) => setNombre(e.target.value)}
            error={!!errores.nombre}
            helperText={errores.nombre || `${nombre.length}/${LIMITE_NOMBRE} ${MENSAJE_LIMITE}`}
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
            onChange={(e) => setDescripcion(e.target.value)}
            error={!!errores.descripcion}
            helperText={
              errores.descripcion || `${descripcion.length}/${LIMITE_DESCRIPCION} ${MENSAJE_LIMITE}`
            }
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
                    allign='center'
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
