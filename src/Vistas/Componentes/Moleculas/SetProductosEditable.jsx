// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
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
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  KeyboardDoubleArrowRight,
  KeyboardDoubleArrowLeft,
} from '@mui/icons-material';

// Constantes
const LIMITE_NOMBRE = 50;
const LIMITE_DESCRIPCION = 150;
const MENSAJE_LIMITE = 'Máximo caracteres';

const SetProductosEditable = ({
  nombre: nombreInicial = '',
  descripcion: descripcionInicial = '',
  activo: activoInicial = true,
  productos: productosInicial = [],
  idsProductos = [],
  onFormDataChange,
}) => {
  const { usuario } = useAuth();
  const formDataRef = useRef(null);

  // Estados
  const [nombre, setNombre] = useState(nombreInicial);
  const [activo, setActivo] = useState(activoInicial);
  const [descripcion, setDescripcion] = useState(descripcionInicial);
  const [todosProductos, setTodosProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  //const [productosAsignados, setProductosAsignados] = useState(productosInicial);
  const [productosAsignados, setProductosAsignados] = useState(() => {
    return productosInicial.filter((pro) => pro && pro.id); // Filtra productos válidos
  });

  const [loading, setLoading] = useState(true);
  const [errores, setErrores] = useState({
    nombre: false,
    descripcion: false,
  });

  // Obtener productos del servidor
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productos = await obtenerProductos(usuario.clienteSeleccionado);
        setTodosProductos(productos);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar productos:', error);
        setLoading(false);
      }
    };

    cargarProductos();
  }, [usuario.clienteSeleccionado]);

  // Sincronizar productos asignados con los IDs recibidos
  useEffect(() => {
    if (!loading && idsProductos && idsProductos.length > 0 && todosProductos.length > 0) {
      const productosAsignadosIniciales = todosProductos.filter((pro) =>
        idsProductos.includes(pro.id));

      setProductosAsignados(productosAsignadosIniciales);
    }
  }, [loading, idsProductos, todosProductos]);

  // Productos disponibles (no asignados)
  const productosDisponibles = useMemo(() => {
    return todosProductos
      .filter((pro) => !productosAsignados.some((pa) => pa.id === pro.id))
      .sort((prodA, prodB) =>
        (prodA.nombreProducto || prodA.nombre).localeCompare(prodB.nombreProducto || prodB.nombre));
  }, [todosProductos, productosAsignados]);

  // Validación de campos
  const validarCampos = useCallback(() => {
    const nuevosErrores = {
      nombre: nombre.trim() === '',
      descripcion: descripcion.trim() === '',
    };
    setErrores(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.descripcion;
  }, [nombre, descripcion]);

  // Actualizar datos del formulario
  useEffect(() => {
    if (loading) return;

    const formData = {
      nombre: nombre.trim(),
      activo,
      descripcion: descripcion.trim(),
      productos: productosAsignados.map((pro) => pro.id),
      esValido: validarCampos(),
    };

    const formDataStr = JSON.stringify(formData);
    if (formDataStr !== JSON.stringify(formDataRef.current)) {
      formDataRef.current = formData;
      onFormDataChange?.(formData);
    }
  }, [nombre, activo, descripcion, productosAsignados, loading, validarCampos, onFormDataChange]);

  // Manejar selección de productos
  const toggleSeleccionProducto = useCallback((producto) => {
    setProductosSeleccionados((prev) =>
      prev.some((pro) => pro.id === producto.id)
        ? prev.filter((pro) => pro.id !== producto.id)
        : [...prev, producto]);
  }, []);

  // Transferir productos
  const transferirSeleccionados = useCallback(() => {
    const paraTransferir = productosSeleccionados.filter((pro) =>
      productosDisponibles.some((pd) => pd.id === pro.id));

    setProductosAsignados((prev) =>
      [...prev, ...paraTransferir].sort((prodA, prodB) =>
        (prodA.nombreProducto || prodA.nombre).localeCompare(prodB.nombreProducto || prodB.nombre)));
    setProductosSeleccionados((prev) =>
      prev.filter((pro) => !paraTransferir.some((pt) => pt.id === pro.id)));
  }, [productosSeleccionados, productosDisponibles]);

  const quitarSeleccionados = useCallback(() => {
    const paraQuitar = productosSeleccionados.filter((pro) =>
      productosAsignados.some((pa) => pa.id === pro.id));

    setProductosAsignados((prev) =>
      prev.filter((pro) => !paraQuitar.some((pq) => pq.id === pro.id)));
    setProductosSeleccionados((prev) =>
      prev.filter((pro) => !paraQuitar.some((pq) => pq.id === pro.id)));
  }, [productosSeleccionados, productosAsignados]);

  const transferirTodos = useCallback(() => {
    setProductosAsignados((prev) =>
      [...prev, ...productosDisponibles].sort((prodA, prodB) =>
        (prodA.nombreProducto || prodA.nombre).localeCompare(prodB.nombreProducto || prodB.nombre)));
    setProductosSeleccionados((prev) =>
      prev.filter((pro) => !productosDisponibles.some((pd) => pd.id === pro.id)));
  }, [productosDisponibles]);

  const quitarTodos = useCallback(() => {
    setProductosAsignados([]);
    setProductosSeleccionados((prev) =>
      prev.filter((pro) => !productosAsignados.some((pa) => pa.id === pro.id)));
  }, [productosAsignados]);

  // Seleccionar/deseleccionar todos
  const toggleSeleccionTodos = useCallback(
    (productos, esDisponibles) => {
      const todosSeleccionados = productos.every((pro) =>
        productosSeleccionados.some((ps) => ps.id === pro.id));

      if (todosSeleccionados) {
        setProductosSeleccionados((prev) =>
          prev.filter((pro) => !productos.some((prod) => prod.id === pro.id)));
      } else {
        setProductosSeleccionados((prev) => [
          ...prev,
          ...productos.filter(
            (pro) =>
              !prev.some((ps) => ps.id === pro.id)
              && (esDisponibles
                ? !productosAsignados.some((pa) => pa.id === pro.id)
                : productosAsignados.some((pa) => pa.id === pro.id))
          ),
        ]);
      }
    },
    [productosSeleccionados, productosAsignados]
  );

  // Componente de lista de productos
  const ListaProductos = useCallback(
    ({ titulo, productos, esDisponibles }) => {
      const seleccionadosEnLista = productos.filter((pro) =>
        productosSeleccionados.some((ps) => ps.id === pro.id)).length;

      const todosSeleccionados = productos.length > 0 && seleccionadosEnLista === productos.length;
      const algunosSeleccionados
        = seleccionadosEnLista > 0 && seleccionadosEnLista < productos.length;

      return (
        <Card>
          <CardHeader
            avatar={
              <Checkbox
                checked={todosSeleccionados}
                indeterminate={algunosSeleccionados}
                onChange={() => toggleSeleccionTodos(productos, esDisponibles)}
                disabled={productos.length === 0}
                inputProps={{ 'aria-label': `Seleccionar todos ${titulo}` }}
              />
            }
            title={titulo}
            subheader={`${seleccionadosEnLista}/${productos.length} seleccionados`}
            sx={{ px: 2, py: 1 }}
          />
          <Divider />
          <List sx={{ width: 350, height: 300, overflow: 'auto' }}>
            {productos.map((producto) => {
              // Asegurarse de que el ID existe y es único
              const itemKey = producto.id
                ? `producto-${producto.id}`
                : `producto-${Math.random().toString(36).substr(2, 9)}`;

              return (
                <ListItemButton
                  key={itemKey}
                  onClick={() => toggleSeleccionProducto(producto)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={productosSeleccionados.some((pro) => pro.id === producto.id)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={producto.nombreProducto || producto.nombre || 'Sin nombre'}
                    secondary={`ID: ${producto.id || 'N/A'}`}
                  />
                </ListItemButton>
              );
            })}
          </List>
        </Card>
      );
    },
    [productosSeleccionados, toggleSeleccionProducto, toggleSeleccionTodos]
  );

  if (loading) {
    return <Box sx={{ pro: 3, textAlign: 'center' }}>Cargando productos...</Box>;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', pro: 2 }}>
      {/* Campos de texto */}
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={activo}
              onChange={(evento) => setActivo(evento.target.checked)}
              color='primary'
            />
          }
          label={activo ? 'Activo' : 'Inactivo'}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Texto variant='h6'>Nombre:</Texto>
          <CampoTexto
            fullWidth
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value.slice(0, LIMITE_NOMBRE))}
            error={errores.nombre}
            helperText={
              errores.nombre
                ? 'Campo obligatorio'
                : `${nombre.length}/${LIMITE_NOMBRE} ${MENSAJE_LIMITE}`
            }
            inputProps={{ maxLength: LIMITE_NOMBRE }}
            sx={{ mt: 1, width: '385px' }}
          />
        </Grid>

        <Grid item xs={12}>
          <Texto variant='h6'>Descripción:</Texto>
          <CampoTexto
            fullWidth
            multiline
            rows={3}
            value={descripcion}
            onChange={(evento) => setDescripcion(evento.target.value.slice(0, LIMITE_DESCRIPCION))}
            error={errores.descripcion}
            helperText={
              errores.descripcion
                ? 'Campo obligatorio'
                : `${descripcion.length}/${LIMITE_DESCRIPCION} ${MENSAJE_LIMITE}`
            }
            inputProps={{ maxLength: LIMITE_DESCRIPCION }}
            sx={{ mt: 1, width: '385px' }}
          />
        </Grid>

        {/* Selector de productos */}
        <Grid item xs={12}>
          <Texto variant='h6'>Productos:</Texto>
          <Grid container spacing={2} justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
            <Grid item>
              <ListaProductos
                titulo='Disponibles'
                productos={productosDisponibles}
                esDisponibles={true}
              />
            </Grid>

            <Grid>
              <Grid container direction='column' sx={{alignItems: 'center'}} spacing={1}>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={transferirTodos}
                  disabled={productosDisponibles.length === 0}
                  aria-label='Mover todos a seleccionados'
                ><KeyboardDoubleArrowRight /></Button>

                <Button
                  variant='outlined'
                  size='small'
                  onClick={transferirSeleccionados}
                  disabled={
                    productosSeleccionados.filter((pro) =>
                      productosDisponibles.some((pd) => pd.id === pro.id)).length === 0
                  }
                  aria-label='Mover seleccionados a seleccionados'
                ><KeyboardArrowRight /></Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={quitarSeleccionados}
                  disabled={
                    productosSeleccionados.filter((pro) =>
                      productosAsignados.some((pa) => pa.id === pro.id)).length === 0
                  }
                  aria-label='Quitar seleccionados'
                ><KeyboardArrowLeft /></Button>
                <Button
                  variant='outlined'
                  size='small'
                  onClick={quitarTodos}
                  disabled={productosAsignados.length === 0}
                  aria-label='Quitar todos'
                ><KeyboardDoubleArrowLeft /></Button>
              </Grid>
            </Grid>

            <Grid item sx={{ my: 2 }}>
              <ListaProductos
                titulo='Seleccionados'
                productos={productosAsignados}
                esDisponibles={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

SetProductosEditable.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string,
      nombreProducto: PropTypes.string,
    })
  ),
  onFormDataChange: PropTypes.func,
};

SetProductosEditable.defaultProps = {
  nombre: '',
  descripcion: '',
  productos: [],
};

export default SetProductosEditable;
