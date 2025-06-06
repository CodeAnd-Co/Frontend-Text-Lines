// src/Organismos/ModalEditarCuotas.jsx
import { useState, useEffect } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
import CampoTexto from '@Atomos/CampoTexto';
import { NumeroInput } from '@Atomos/NumeroInput';
import Switch from '@Atomos/Switch';
import { useActualizarCuota } from '@Hooks/Cuotas/useActualizarCuota';
import { useObtenerOpcionesCuotas } from '@Hooks/Cuotas/useObtenerOpcionesCuotas';
import {
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Alert,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const ModalEditarCuotas = ({
  open,
  cuotaOriginal,
  onClose,
  onActualizado,
  cargandoDetalle,
  errorDetalle
}) => {
  const { actualizarCuota, cargando, error } = useActualizarCuota();
  const { opciones, cargando: cargandoOpciones } = useObtenerOpcionesCuotas();

  const [datos, setDatos] = useState({
    idCuotaSet: null,
    nombre: '',
    descripcion: '',
    periodoRenovacion: 6,
    renovacionHabilitada: false,
    productos: []
  });

  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    if (cuotaOriginal && open) {
      const productosFormateados = (cuotaOriginal.productos || []).map(p => ({
        idProducto: p.idProducto ? String(p.idProducto) : '',
        nombreProducto: p.nombreProducto || p.nombreComun || p.nombre || '',
        limite: p.limite || p.cuota_valor || 0,
        limiteActual: p.limiteActual || p.limite_actual || 0
      }));

      setDatos({
        idCuotaSet: cuotaOriginal.idCuotaSet || cuotaOriginal.idSetCuota,
        nombre: cuotaOriginal.nombre || '',
        descripcion: cuotaOriginal.descripcion || '',
        periodoRenovacion: cuotaOriginal.periodoRenovacion || 6,
        renovacionHabilitada: cuotaOriginal.renovacionHabilitada === 1 || cuotaOriginal.renovacionHabilitada === true,
        productos: productosFormateados
      });
      setAlerta('');
    }
  }, [cuotaOriginal, open]);

  useEffect(() => {
    if (!open) {
      setAlerta('');
    }
  }, [open]);

  useEffect(() => {
    if (alerta) {
      const timer = setTimeout(() => {
        setAlerta('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  const agregarProducto = () => {
    setDatos(prev => ({
      ...prev,
      productos: [...prev.productos, { idProducto: '', nombreProducto: '', limite: 0, limiteActual: 0 }]
    }));
  };

  const eliminarProducto = (index) => {
    setDatos(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index)
    }));
  };

  const cambiarProducto = (index, campo, valor) => {
    setDatos(prev => ({
      ...prev,
      productos: prev.productos.map((producto, i) => {
        if (i === index) {
          const nuevoProducto = { ...producto, [campo]: valor };

          if (campo === 'idProducto') {
            const opcionSeleccionada = opciones?.find(op => op.id == valor);
            nuevoProducto.nombreProducto = opcionSeleccionada?.nombreProducto || '';

            const yaExiste = prev.productos.some((p, idx) =>
              idx !== index && p.idProducto === valor && valor !== '');

            if (yaExiste && valor !== '') {
              const nombreProducto = opcionSeleccionada?.nombreProducto || 'este producto';
              setAlerta(`${nombreProducto} ya está asignado a esta cuota`);
              return producto;
            }
          }

          return nuevoProducto;
        }
        return producto;
      })
    }));
  };

  const guardar = async () => {
    setAlerta('');

    if (!datos.nombre.trim()) {
      setAlerta('El nombre de la cuota es obligatorio');
      return;
    }

    if (datos.periodoRenovacion < 1 || datos.periodoRenovacion > 12) {
      setAlerta('El período de renovación debe estar entre 1 y 12 meses');
      return;
    }

    const productosValidos = datos.productos.filter(p => p.idProducto && p.idProducto !== '');

    try {
      await actualizarCuota({
        idCuotaSet: datos.idCuotaSet,
        cambios: {
          nombre: datos.nombre.trim(),
          descripcion: datos.descripcion.trim(),
          periodoRenovacion: datos.periodoRenovacion,
          renovacionHabilitada: datos.renovacionHabilitada,
          productos: productosValidos.map(p => ({
            idProducto: Number(p.idProducto),
            limite: Number(p.limite) || 0,
            limiteActual: Number(p.limiteActual) || 0
          }))
        }
      });

      onActualizado();
      onClose();
    } catch (err) {
      let mensajeAmigable = 'Ocurrió un error al actualizar la cuota';

      if (err.message.includes('Duplicate')) {
        mensajeAmigable = 'No se puede guardar: hay productos duplicados';
      } else if (err.message.includes('foreign key')) {
        mensajeAmigable = 'Error: producto no válido seleccionado';
      } else if (err.message.includes('Network')) {
        mensajeAmigable = 'Sin conexión a internet';
      }

      setAlerta(mensajeAmigable);
    }
  };

  if (cargandoDetalle) {
    return (
      <ModalFlotante open={open} onClose={onClose} titulo="Cargando...">
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Cargando información del set de cuotas...</Typography>
        </Box>
      </ModalFlotante>
    );
  }

  if (errorDetalle) {
    return (
      <ModalFlotante open={open} onClose={onClose} titulo="Error" cancelLabel="Cerrar">
        <Box sx={{ p: 2 }}>
          <Alert severity="error">Error al cargar la información: {errorDetalle}</Alert>
        </Box>
      </ModalFlotante>
    );
  }

  return (
    <ModalFlotante
      open={open}
      onClose={onClose}
      onConfirm={guardar}
      titulo={` ${datos.nombre || 'Set de Cuotas'}`}
      confirmLabel={cargando ? 'Guardando...' : 'Guardar'}
      cancelLabel="Cancelar"
      disabledConfirm={cargando}
      customWidth={800}
    >
      {/* SCROLLABLE CONTENT */}
      <Box sx={{ maxHeight: '70vh', overflow: 'auto', p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Información Básica</Typography>

        <CampoTexto
          label="Nombre *"
          value={datos.nombre}
          onChange={(e) => setDatos(prev => ({ ...prev, nombre: e.target.value }))}
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 50 }}
          helperText={`${datos.nombre.length}/50`}
        />

        <CampoTexto
          label="Descripción"
          value={datos.descripcion}
          onChange={(e) => setDatos(prev => ({ ...prev, descripcion: e.target.value }))}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
          inputProps={{ maxLength: 150 }}
          helperText={`${datos.descripcion.length}/150`}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <NumeroInput
            label="Período de Renovación (meses) *"
            value={datos.periodoRenovacion}
            onChange={(e) => setDatos(prev => ({
              ...prev,
              periodoRenovacion: parseInt(e.target.value) || 6
            }))}
            min={1}
            max={12}
            sx={{ flex: 1 }}
          />

          <Switch
            label="Renovación Habilitada"
            checked={datos.renovacionHabilitada}
            onChange={(e) => setDatos(prev => ({
              ...prev,
              renovacionHabilitada: e.target.checked
            }))}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Productos Asociados ({datos.productos.length})</Typography>
          <IconButton color="primary" onClick={agregarProducto}><AddIcon /></IconButton>
        </Box>

        {!cargandoOpciones && (!opciones || opciones.length === 0) && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            No se pudieron cargar las opciones de productos. Verifica la conexión con el servidor.
          </Alert>
        )}

        {datos.productos.length === 0 ? (
          <Typography color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
            No hay productos asociados. Haz clic en + para agregar uno.
          </Typography>
        ) : (
          datos.productos.map((producto, index) => (
            <Box
              key={index}
              sx={{
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2,
                mb: 2,
                backgroundColor: '#fafafa'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle2">
                  Producto {index + 1}
                  {producto.nombreProducto && (
                    <span style={{ color: '#666', fontWeight: 'normal' }}>
                      {' '} - {producto.nombreProducto}
                    </span>
                  )}
                </Typography>
                <IconButton color="error" size="small" onClick={() => eliminarProducto(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 250, flex: 1 }}>
                  <InputLabel>Producto *</InputLabel>
                  <Select
                    value={producto.idProducto || ''}
                    onChange={(e) => cambiarProducto(index, 'idProducto', e.target.value)}
                    label="Producto *"
                    disabled={cargandoOpciones}
                  >
                    <MenuItem value="">Seleccione un producto</MenuItem>
                    {opciones?.length > 0 ? (
                      opciones
                        .filter(op => !datos.productos.some((p, idx) =>
                          idx !== index && p.idProducto == op.id))
                        .map((opcion) => (
                          <MenuItem key={opcion.id} value={opcion.id}>
                            {opcion.nombreProducto} ({opcion.tipo})
                          </MenuItem>
                        ))
                    ) : (
                      <MenuItem disabled>No hay opciones disponibles</MenuItem>
                    )}
                  </Select>
                </FormControl>

                <TextField
                  label="Límite *"
                  type="number"
                  value={producto.limite}
                  onChange={(e) => cambiarProducto(index, 'limite', parseInt(e.target.value) || 0)}
                  inputProps={{ min: 0 }}
                  sx={{ minWidth: 120 }}
                />

                <TextField
                  label="Límite Actual *"
                  type="number"
                  value={producto.limiteActual}
                  onChange={(e) => cambiarProducto(index, 'limiteActual', parseInt(e.target.value) || 0)}
                  inputProps={{ min: 0 }}
                  sx={{ minWidth: 120 }}
                />
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* ✅ Alerta abajo del modal, como en ModalCrearRol */}
      {(alerta || error) && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Alert severity="error" onClose={() => setAlerta('')}>
            {alerta || 'Error del sistema: Por favor intenta de nuevo'}
          </Alert>
        </Box>
      )}
    </ModalFlotante>
  );
};

export default ModalEditarCuotas;
