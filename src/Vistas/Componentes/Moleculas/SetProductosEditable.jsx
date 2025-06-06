// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

// RF44 - Actualiza Set de Productos
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import CampoTexto from '@Atomos/CampoTexto';
import Texto from '@Atomos/Texto';
import obtenerProductos from '@Servicios/obtenerProductos';
import { useAuth } from '@Hooks/AuthProvider';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Button,
} from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

const LIMITE_NOMBRE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const SetProductosEditable = ({
  nombre: nombreInicial,
  descripcion: descripcionInicial,
  productos: productosInicial,
  onFormDataChange,
}) => {
  const { usuario } = useAuth();
  const referenciaFormData = useRef(null);
  const clienteSeleccionado = usuario?.clienteSeleccionado;

  const [nombre, setNombre] = useState(nombreInicial || '');
  const [descripcion, setDescripcion] = useState(descripcionInicial || '');
  const [todosProductos, setTodosProductos] = useState([]);
  const [productosDerecha, setProductosDerecha] = useState(productosInicial || []);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productosSeleccionadosIzquierda, setSeleccionadosIzquierda] = useState([]);
  const [productosSeleccionadosDerecha, setSeleccionadosDerecha] = useState([]);
  const [errores, setErrores] = useState({ nombre: false, descripcion: false });

  const cargarProductos = useCallback(async () => {
    try {
      const prods = await obtenerProductos(clienteSeleccionado);
      setTodosProductos(prods);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  }, [clienteSeleccionado]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const productosIzquierda = useMemo(() => {
    return todosProductos
      .filter((p) => !productosDerecha.some((pd) => pd.id === p.id))
      .sort((a, b) => (a.nombreProducto || a.nombre).localeCompare(b.nombreProducto || b.nombre));
  }, [todosProductos, productosDerecha]);

  const manejarSeleccion = (id, lado) => {
    const producto = todosProductos.find((p) => p.id === id);
    if (!producto) return; // Previene errores si no se encuentra el producto

    const esIzquierda = lado === 'izquierda';
    const seleccionados = esIzquierda
      ? productosSeleccionadosIzquierda
      : productosSeleccionadosDerecha;
    const setSeleccionados = esIzquierda ? setSeleccionadosIzquierda : setSeleccionadosDerecha;

    const yaEsta = seleccionados.some((p) => p.id === id);
    const nuevoEstado = yaEsta
      ? seleccionados.filter((p) => p.id !== id)
      : [...seleccionados, producto];

    setSeleccionados(nuevoEstado);
  };

  const transferir = () => {
    const nuevos = [...productosDerecha, ...productosSeleccionadosIzquierda];
    nuevos.sort((a, b) =>
      (a.nombreProducto || a.nombre).localeCompare(b.nombreProducto || b.nombre)
    );
    setProductosDerecha(nuevos);
    setSeleccionadosIzquierda([]);
  };

  const quitar = () => {
    setProductosDerecha((prev) =>
      prev.filter((p) => !productosSeleccionadosDerecha.find((s) => s.id === p.id))
    );
    setSeleccionadosDerecha([]);
  };

  // Mover todos los productos disponibles a la derecha
  const transferirTodos = () => {
    const nuevos = [...productosDerecha, ...productosIzquierda];
    nuevos.sort((a, b) =>
      (a.nombreProducto || a.nombre).localeCompare(b.nombreProducto || b.nombre)
    );
    setProductosDerecha(nuevos);
    setSeleccionadosIzquierda([]);
  };

  // Mover todos los productos seleccionados a la izquierda (quitar todos)
  const quitarTodos = () => {
    setProductosDerecha([]); // elimina todos los productos de la derecha
    setSeleccionadosDerecha([]);
  };

  useEffect(() => {
    const nombreVacio = nombre.trim() === '';
    const descripcionVacia = descripcion.trim() === '';
    const esValido = !nombreVacio && !descripcionVacia;
    setErrores({ nombre: nombreVacio, descripcion: descripcionVacia });

    const formData = {
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      productos: productosDerecha.map((p) => p.id),
      esValido,
    };

    const current = JSON.stringify(formData);
    if (current !== JSON.stringify(referenciaFormData.current)) {
      referenciaFormData.current = formData;
      onFormDataChange?.(formData);
    }
  }, [nombre, descripcion, productosDerecha]);

  const renderLista = (titulo, items, lado) => {
    const seleccionados =
      lado === 'izquierda' ? productosSeleccionadosIzquierda : productosSeleccionadosDerecha;

    const manejarSeleccionTodos = (e) => {
      const esSeleccionarTodo = e.target.checked;
      if (lado === 'izquierda') {
        setSeleccionadosIzquierda(esSeleccionarTodo ? [...items] : []);
      } else {
        setSeleccionadosDerecha(esSeleccionarTodo ? [...items] : []);
      }
    };

    const estaTodoSeleccionado = seleccionados.length === items.length && items.length !== 0;
    const estaIndeterminado = seleccionados.length > 0 && seleccionados.length < items.length;

    const tituloFinal = lado === 'izquierda' ? 'Productos Disponibles' : 'Sets Seleccionados';
    const subheader = `${seleccionados.length}/${items.length} seleccionados`;

    return (
      <Card>
        <CardHeader
          avatar={
            <Checkbox
              onChange={manejarSeleccionTodos}
              checked={estaTodoSeleccionado}
              indeterminate={estaIndeterminado}
              disabled={items.length === 0}
              inputProps={{
                'aria-label': 'seleccionar todos los elementos',
              }}
            />
          }
          title={tituloFinal}
          subheader={subheader}
          sx={{ px: 2, py: 1 }}
          titleTypographyProps={{ variant: 'subtitle1' }}
          subheaderTypographyProps={{ variant: 'caption' }}
        />
        <Divider />
        <List sx={{ width: 350, height: 300, overflow: 'auto' }}>
          {items.map((item) => (
            <ListItemButton key={item.id} onClick={() => manejarSeleccion(item.id, lado)}>
              <ListItemIcon>
                <Checkbox checked={seleccionados.some((s) => s.id === item.id)} />
              </ListItemIcon>
              <ListItemText primary={item.nombreProducto || item.nombre} />
            </ListItemButton>
          ))}
        </List>
      </Card>
    );
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Texto variant='h6'>Nombre:</Texto>
          <CampoTexto
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value.slice(0, LIMITE_NOMBRE))}
            error={errores.nombre}
            helperText={
              errores.nombre
                ? 'Campo obligatorio'
                : `${nombre.length}/${LIMITE_NOMBRE} ${MENSAJE_LIMITE}`
            }
            sx={{ mt: 1, mb: 2, mr: 8, width: '300px', overflow: 'auto' }}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Texto variant='h6'>Descripción:</Texto>
          <CampoTexto
            fullWidth
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value.slice(0, LIMITE_DESCRIPCION))}
            error={errores.descripcion}
            helperText={
              errores.descripcion
                ? 'Campo obligatorio'
                : `${descripcion.length}/${LIMITE_DESCRIPCION} ${MENSAJE_LIMITE}`
            }
            sx={{ mt: 1, mb: 2, width: '400px', overflow: 'auto' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Texto variant='h6'>Productos:</Texto>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item>{renderLista('Disponibles', productosIzquierda, 'izquierda')}</Grid>
            <Grid item>
              <Grid item>
                <Grid container direction='column' spacing={1}>
                  {/* Mover todos a la derecha */}
                  <Button onClick={transferirTodos} disabled={!productosIzquierda.length}>
                    <KeyboardDoubleArrowRightIcon />
                  </Button>

                  {/* Mover seleccionados a la derecha */}
                  <Button onClick={transferir} disabled={!productosSeleccionadosIzquierda.length}>
                    <KeyboardArrowRightIcon />
                  </Button>

                  {/* Mover seleccionados a la izquierda */}
                  <Button onClick={quitar} disabled={!productosSeleccionadosDerecha.length}>
                    <KeyboardArrowLeftIcon />
                  </Button>

                  {/* Mover todos a la izquierda */}
                  <Button onClick={quitarTodos} disabled={!productosDerecha.length}>
                    <KeyboardDoubleArrowLeftIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>{renderLista('Seleccionados', productosDerecha, 'derecha')}</Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

SetProductosEditable.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  productos: PropTypes.array,
  onFormDataChange: PropTypes.func,
};

export default SetProductosEditable;
