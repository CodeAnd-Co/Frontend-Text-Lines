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
function noEstaEnLista(listaOrigen, listaComparar) {
  return listaOrigen
    .filter((item) => !listaComparar.find((itemComparar) => itemComparar.id === item.id))
    .sort((empleado1, empleado2) => {
      const nombreA = (empleado1.nombreCompleto || empleado1.nombre || '').toLowerCase();
      const nombreB = (empleado2.nombreCompleto || empleado2.nombre || '').toLowerCase();
      return nombreA.localeCompare(nombreB);
    });
}

function interseccion(listaUno, listaDos) {
  return listaUno
    .filter((item) => listaDos.find((item2) => item2.id === item.id))
    .sort((empleado1, empleado2) => {
      const nombreA = (empleado1.nombreCompleto || empleado1.nombre || '').toLowerCase();
      const nombreB = (empleado2.nombreCompleto || empleado2.nombre || '').toLowerCase();
      return nombreA.localeCompare(nombreB);
    });
}

function union(listaUno, listaDos) {
  const combinados = [...listaUno];
  listaDos.forEach((item) => {
    if (!combinados.find((itemExistente) => itemExistente.id === item.id)) {
      combinados.push(item);
    }
  });
  return combinados.sort((empleado1, empleado2) => {
    const nombreA = (empleado1.nombreCompleto || empleado1.nombre || '').toLowerCase();
    const nombreB = (empleado2.nombreCompleto || empleado2.nombre || '').toLowerCase();
    return nombreA.localeCompare(nombreB);
  });
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
  const referenciaUltimosFormData = useRef(null);

  // Estados locales
  const [nombre, setNombre] = useState(nombreInicial || '');
  const [descripcion, setDescripcion] = useState(descripcionInicial || '');

  // Estados para datos completos (sin filtrar)
  const [todosLosSets, setTodosLosSets] = useState([]);
  const [todosLosEmpleados, setTodosLosEmpleados] = useState([]);
  const [datosListos, setDatosListos] = useState(false);

  // Estados para la lista de transferencia de empleados
  const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
  const [empleadosDerecha, setEmpleadosDerecha] = useState(empleadosInicial || []);

  // Estados para la lista de transferencia de sets productos
  const [setsSeleccionados, setSetsSeleccionados] = useState([]);
  const [setsDerecha, setSetsDerecha] = useState(setsProductosInicial || []);

  // Efecto para cargar los datos iniciales
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [productos, datosEmpleados] = await Promise.all([
          obtenerSetsProductos(clienteSeleccionado),
          obtenerEmpleados(clienteSeleccionado),
        ]);

        // Ordenar productos por nombre
        const productosOrdenados = productos.sort((productos1, productos2) =>
          (productos1.nombreProducto || '')
            .toLowerCase()
            .localeCompare((productos2.nombreProducto || '').toLowerCase())
        );

        // Ordenar empleados por nombre
        const empleadosOrdenados = datosEmpleados.sort((empleado1, empleado2) => {
          const nombreA = (empleado1.nombreCompleto || empleado1.nombre || '').toLowerCase();
          const nombreB = (empleado2.nombreCompleto || empleado2.nombre || '').toLowerCase();
          return nombreA.localeCompare(nombreB);
        });

        setTodosLosSets(productosOrdenados);
        setTodosLosEmpleados(empleadosOrdenados);
        setDatosListos(true);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    obtenerDatos();
  }, [clienteSeleccionado]);

  const setsIzquierda = useMemo(
    () => noEstaEnLista(todosLosSets, setsDerecha),
    [todosLosSets, setsDerecha]
  );

  const empleadosIzquierda = useMemo(
    () => noEstaEnLista(todosLosEmpleados, empleadosDerecha),
    [todosLosEmpleados, empleadosDerecha]
  );

  // Estado para controlar errores
  const [errores, setErrores] = useState({
    nombre: false,
    descripcion: false,
  });

  // Remueve el useEffect que validaba en tiempo real

  // Función para validar campos al guardar
  const validarCampos = () => {
    const nombreVacio = nombre.trim() === '';
    const descripcionVacia = descripcion.trim() === '';

    setErrores({
      nombre: nombreVacio,
      descripcion: descripcionVacia,
    });

    return !nombreVacio && !descripcionVacia;
  };

  // Modificamos el useEffect para generar datos del formulario incluyendo la validación
  useEffect(() => {
    if (!datosListos || !onFormDataChange) return;

    const formData = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      setsDeProductos: setsDerecha.map((set) => set.id),
      empleados: empleadosDerecha.map((emp) => emp.id),
      esValido: validarCampos,
    };

    const formDataString = JSON.stringify(formData);
    const lastFormDataString = JSON.stringify(referenciaUltimosFormData.current);

    if (formDataString !== lastFormDataString) {
      referenciaUltimosFormData.current = formData;
      const timeoutId = setTimeout(() => {
        onFormDataChange(formData);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [nombre, descripcion, setsDerecha, empleadosDerecha, datosListos, onFormDataChange]);

  // Handlers para empleados
  const manejarSeleccionEmpleado = useCallback(
    (valor) => () => {
      setEmpleadosSeleccionados((prev) => {
        const indiceActual = prev.findIndex((item) => item.id === valor.id);
        const nuevaSeleccion = [...prev];

        if (indiceActual === -1) {
          nuevaSeleccion.push(valor);
        } else {
          nuevaSeleccion.splice(indiceActual, 1);
        }

        return nuevaSeleccion;
      });
    },
    []
  );

  const manejarTodosIzquierdaEmpleados = useCallback(() => {
    setEmpleadosDerecha([]);
    setEmpleadosSeleccionados([]);
  }, []);

  const manejarTodosDerechaEmpleados = useCallback(() => {
    setEmpleadosDerecha((prev) => {
      const nuevaLista = [...prev, ...empleadosIzquierda];
      return nuevaLista.sort((empleado1, empleado2) => {
        const nombreA = (empleado1.nombreCompleto || empleado1.nombre || '').toLowerCase();
        const nombreB = (empleado2.nombreCompleto || empleado2.nombre || '').toLowerCase();
        return nombreA.localeCompare(nombreB);
      });
    });
    setEmpleadosSeleccionados([]);
  }, [empleadosIzquierda]);

  const manejarSeleccionDerechaEmpleados = useCallback(() => {
    const izquierdaSeleccionados = interseccion(empleadosSeleccionados, empleadosIzquierda);
    setEmpleadosDerecha((prev) => {
      const nuevaLista = [...prev, ...izquierdaSeleccionados];
      return nuevaLista.sort((empleado1, empleado2) => {
        const nombreA = (empleado1.nombreCompleto || empleado1.nombre || '').toLowerCase();
        const nombreB = (empleado2.nombreCompleto || empleado2.nombre || '').toLowerCase();
        return nombreA.localeCompare(nombreB);
      });
    });
    setEmpleadosSeleccionados((prev) => noEstaEnLista(prev, izquierdaSeleccionados));
  }, [empleadosSeleccionados, empleadosIzquierda]);

  const manejarSeleccionIzquierdaEmpleados = useCallback(() => {
    const derechaSeleccionados = interseccion(empleadosSeleccionados, empleadosDerecha);
    setEmpleadosDerecha((prev) => noEstaEnLista(prev, derechaSeleccionados));
    setEmpleadosSeleccionados((prev) => noEstaEnLista(prev, derechaSeleccionados));
  }, [empleadosSeleccionados, empleadosDerecha]);

  // Handlers para sets productos
  const manejarSeleccionSet = useCallback(
    (valor) => () => {
      setSetsSeleccionados((prev) => {
        const indiceActual = prev.findIndex((item) => item.id === valor.id);
        const nuevaSeleccion = [...prev];

        if (indiceActual === -1) {
          nuevaSeleccion.push(valor);
        } else {
          nuevaSeleccion.splice(indiceActual, 1);
        }

        return nuevaSeleccion;
      });
    },
    []
  );

  const manejarTodosIzquierdaSets = useCallback(() => {
    setSetsDerecha([]);
    setSetsSeleccionados([]);
  }, []);

  const manejarTodosDerechaSets = useCallback(() => {
    setSetsDerecha((prev) => {
      const nuevaLista = [...prev, ...setsIzquierda];
      return nuevaLista.sort((set1, set2) =>
        (set1.nombreProducto || '')
          .toLowerCase()
          .localeCompare((set2.nombreProducto || '').toLowerCase())
      );
    });
    setSetsSeleccionados([]);
  }, [setsIzquierda]);

  const manejarSeleccionDerechaSets = useCallback(() => {
    const izquierdaSeleccionados = interseccion(setsSeleccionados, setsIzquierda);
    setSetsDerecha((prev) => {
      const nuevaLista = [...prev, ...izquierdaSeleccionados];
      return nuevaLista.sort((set1, set2) =>
        (set1.nombreProducto || '')
          .toLowerCase()
          .localeCompare((set2.nombreProducto || '').toLowerCase())
      );
    });
    setSetsSeleccionados((prev) => noEstaEnLista(prev, izquierdaSeleccionados));
  }, [setsSeleccionados, setsIzquierda]);

  const manejarSeleccionIzquierdaSets = useCallback(() => {
    const derechaSeleccionados = interseccion(setsSeleccionados, setsDerecha);
    setSetsDerecha((prev) => noEstaEnLista(prev, derechaSeleccionados));
    setSetsSeleccionados((prev) => noEstaEnLista(prev, derechaSeleccionados));
  }, [setsSeleccionados, setsDerecha]);

  // Funciones auxiliares memoizadas
  const contarEmpleadosSeleccionados = useMemo(
    () => (items) => interseccion(empleadosSeleccionados, items).length,
    [empleadosSeleccionados]
  );

  const contarSetsSeleccionados = useMemo(
    () => (items) => interseccion(setsSeleccionados, items).length,
    [setsSeleccionados]
  );

  const manejarSeleccionTodosEmpleados = useCallback(
    (items) => () => {
      if (contarEmpleadosSeleccionados(items) === items.length) {
        setEmpleadosSeleccionados((prev) => noEstaEnLista(prev, items));
      } else {
        setEmpleadosSeleccionados((prev) => union(prev, items));
      }
    },
    [contarEmpleadosSeleccionados]
  );

  const manejarSeleccionTodosSets = useCallback(
    (items) => () => {
      if (contarSetsSeleccionados(items) === items.length) {
        setSetsSeleccionados((prev) => noEstaEnLista(prev, items));
      } else {
        setSetsSeleccionados((prev) => union(prev, items));
      }
    },
    [contarSetsSeleccionados]
  );

  // Componentes de lista memoizados
  const listaPersonalizadaEmpleados = useCallback(
    (titulo, elementos) => (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={manejarSeleccionTodosEmpleados(elementos)}
              checked={
                contarEmpleadosSeleccionados(elementos) === elementos.length &&
                elementos.length !== 0
              }
              indeterminate={
                contarEmpleadosSeleccionados(elementos) !== elementos.length &&
                contarEmpleadosSeleccionados(elementos) !== 0
              }
              disabled={elementos.length === 0}
              inputProps={{
                'aria-label': 'todos los elementos seleccionados',
              }}
            />
          }
          title={titulo}
          subheader={`${contarEmpleadosSeleccionados(elementos)}/${elementos.length} seleccionados`}
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
          {elementos.map((valor) => {
            const idEtiqueta = `lista-transferencia-empleados-${valor.id}-etiqueta`;

            return (
              <ListItemButton
                key={valor.id}
                role='listitem'
                onClick={manejarSeleccionEmpleado(valor)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={empleadosSeleccionados.some((item) => item.id === valor.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': idEtiqueta,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={idEtiqueta}
                  primary={valor.nombreCompleto || valor.nombre}
                  secondary={valor.correoElectronico || valor.correo}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Card>
    ),
    [
      empleadosSeleccionados,
      manejarSeleccionEmpleado,
      manejarSeleccionTodosEmpleados,
      contarEmpleadosSeleccionados,
    ]
  );

  const listaPersonalizadaSets = useCallback(
    (titulo, elementos) => (
      <Card>
        <CardHeader
          sx={{ px: 2, py: 1 }}
          avatar={
            <Checkbox
              onClick={manejarSeleccionTodosSets(elementos)}
              checked={
                contarSetsSeleccionados(elementos) === elementos.length && elementos.length !== 0
              }
              indeterminate={
                contarSetsSeleccionados(elementos) !== elementos.length &&
                contarSetsSeleccionados(elementos) !== 0
              }
              disabled={elementos.length === 0}
              inputProps={{
                'aria-label': 'todos los elementos seleccionados',
              }}
            />
          }
          title={titulo}
          subheader={`${contarSetsSeleccionados(elementos)}/${elementos.length} seleccionados`}
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
          {elementos.map((valor) => {
            const idEtiqueta = `lista-transferencia-sets-${valor.id}-etiqueta`;

            return (
              <ListItemButton key={valor.id} role='listitem' onClick={manejarSeleccionSet(valor)}>
                <ListItemIcon>
                  <Checkbox
                    checked={setsSeleccionados.some((item) => item.id === valor.id)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': idEtiqueta,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={idEtiqueta}
                  primary={valor.nombreProducto}
                  secondary={`ID: ${valor.id}`}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Card>
    ),
    [setsSeleccionados, manejarSeleccionSet, manejarSeleccionTodosSets, contarSetsSeleccionados]
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
            error={errores.nombre}
            helperText={
              errores.nombre
                ? 'Este campo es obligatorio'
                : `${nombre.length}/${LIMITE_NOMBRE} ${MENSAJE_LIMITE}`
            }
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
            error={errores.descripcion}
            helperText={
              errores.descripcion
                ? 'Este campo es obligatorio'
                : `${descripcion.length}/${LIMITE_DESCRIPCION} ${MENSAJE_LIMITE}`
            }
            inputProps={{ maxLength: LIMITE_DESCRIPCION }}
            sx={{ mt: 1, mb: 2, width: '400px', overflow: 'auto' }}
            required
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
              <Grid item>{listaPersonalizadaSets('Sets Disponibles', setsIzquierda)}</Grid>
              <Grid item>
                <Grid container direction='column' alignItems='center'>
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarTodosDerechaSets}
                    disabled={setsIzquierda.length === 0}
                    aria-label='mover todos a la derecha'
                    startIcon={<KeyboardDoubleArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarSeleccionDerechaSets}
                    disabled={contarSetsSeleccionados(setsIzquierda) === 0}
                    aria-label='mover seleccionados a la derecha'
                    startIcon={<KeyboardArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarSeleccionIzquierdaSets}
                    disabled={contarSetsSeleccionados(setsDerecha) === 0}
                    aria-label='mover seleccionados a la izquierda'
                    startIcon={<KeyboardArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarTodosIzquierdaSets}
                    disabled={setsDerecha.length === 0}
                    aria-label='mover todos a la izquierda'
                    startIcon={<KeyboardDoubleArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                </Grid>
              </Grid>
              <Grid item>{listaPersonalizadaSets('Sets Seleccionados', setsDerecha)}</Grid>
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
              <Grid item>
                {listaPersonalizadaEmpleados('Empleados Disponibles', empleadosIzquierda)}
              </Grid>
              <Grid item>
                <Grid container direction='column' alignItems='center'>
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarTodosDerechaEmpleados}
                    disabled={empleadosIzquierda.length === 0}
                    aria-label='mover todos a la derecha'
                    startIcon={<KeyboardDoubleArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarSeleccionDerechaEmpleados}
                    disabled={contarEmpleadosSeleccionados(empleadosIzquierda) === 0}
                    aria-label='mover seleccionados a la derecha'
                    startIcon={<KeyboardArrowRightIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarSeleccionIzquierdaEmpleados}
                    disabled={contarEmpleadosSeleccionados(empleadosDerecha) === 0}
                    aria-label='mover seleccionados a la izquierda'
                    startIcon={<KeyboardArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                  <Button
                    sx={{ my: 0.5 }}
                    variant='outlined'
                    size='small'
                    onClick={manejarTodosIzquierdaEmpleados}
                    disabled={empleadosDerecha.length === 0}
                    aria-label='mover todos a la izquierda'
                    startIcon={<KeyboardDoubleArrowLeftIcon sx={{ ml: 1 }} />}
                  />
                </Grid>
              </Grid>
              <Grid item>
                {listaPersonalizadaEmpleados('Empleados Seleccionados', empleadosDerecha)}
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box display='flex' justifyContent='flex-end' mt={3}></Box>
    </Box>
  );
};

export default InfoGrupoEmpleadosEditable;
