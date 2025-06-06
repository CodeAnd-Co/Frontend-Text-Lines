// RF44 - Actualiza Set de Productos - https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF44

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import CampoTexto from '@Atomos/CampoTexto';
import Texto from '@Atomos/Texto';
import obtenerProductos from '@Servicios/obtenerProductos';
import { useAuth } from '@Hooks/AuthProvider';
import ListaTransferenciaPersonalizada from '@Organismos/ListaTransferencia';
import {
  Box,
  Grid,
  Switch,
  FormControlLabel,
} from '@mui/material';

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

  // Manejar cambios en la lista de transferencia
  const manejarCambioTransferencia = useCallback(({ disponibles, seleccionados }) => {
    setProductosAsignados(seleccionados);
  }, []);

  // Función para obtener la etiqueta del producto
  const obtenerEtiquetaProducto = useCallback((producto) => {
    return producto.nombreProducto || producto.nombre || 'Sin nombre';
  }, []);

  // Función para obtener la clave del producto
  const obtenerClaveProducto = useCallback((producto) => {
    return producto.id;
  }, []);

  if (loading) {
    return <Box sx={{ p: 3, textAlign: 'center' }}>Cargando productos...</Box>;
  }

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 2 }}>
      {/* Switch de activo/inactivo */}
      <Grid item xs={12} mb={2}>
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

      {/* Campos de texto */}
      <Grid container spacing={3} mb={2}>
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

        {/* Lista de transferencia de productos */}
        <Grid item xs={12}>
          <Texto variant='h6' sx={{ mb: 2 }}>Productos:</Texto>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <ListaTransferenciaPersonalizada
              elementosDisponibles={productosDisponibles}
              elementosSeleccionados={productosAsignados}
              alCambiarSeleccion={manejarCambioTransferencia}
              tituloIzquierda="Productos Disponibles"
              tituloDerecha="Productos Seleccionados"
              obtenerEtiquetaElemento={obtenerEtiquetaProducto}
              obtenerClaveElemento={obtenerClaveProducto}
              deshabilitado={false}
              alturaMaxima={300}
              ancho={350}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

SetProductosEditable.propTypes = {
  nombre: PropTypes.string,
  descripcion: PropTypes.string,
  activo: PropTypes.bool,
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string,
      nombreProducto: PropTypes.string,
    })
  ),
  idsProductos: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  onFormDataChange: PropTypes.func,
};

SetProductosEditable.defaultProps = {
  nombre: '',
  descripcion: '',
  activo: true,
  productos: [],
  idsProductos: [],
  onFormDataChange: null,
};

export default SetProductosEditable;