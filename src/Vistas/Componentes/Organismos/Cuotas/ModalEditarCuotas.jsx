import { useState, useEffect } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
import CampoTexto from '@Atomos/CampoTexto';
import { NumeroInput } from '@Atomos/NumeroInput';
import Switch from '@Atomos/Switch';
import Alerta from '@Moleculas/Alerta';
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
  TextField
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
  const { actualizarCuota, cargando, exito, error, mensaje, setError } = useActualizarCuota();
  const { opciones, cargando: cargandoOpciones } = useObtenerOpcionesCuotas();
  
  const [cuota, setCuota] = useState({
    idCuotaSet: null,
    nombre: '',
    descripcion: '',
    periodoRenovacion: 6,
    renovacionHabilitada: false,
    productos: []
  });

  const [alertaLocal, setAlertaLocal] = useState(null);

  // 🔥 FUNCIÓN PARA CONVERTIR PRODUCTOS DEL BACKEND AL FORMATO DEL MODAL
  const convertirProductosParaEdicion = (productosBackend, opcionesProductos) => {
    console.log('🔍 convertirProductosParaEdicion - productos recibidos:', productosBackend);
    console.log('🔍 convertirProductosParaEdicion - opciones disponibles:', opcionesProductos);
    
    if (!productosBackend || !Array.isArray(productosBackend)) {
      return [];
    }

    return productosBackend.map((producto, index) => {
      // Los productos vienen como objetos con 'valor', necesitamos buscar por nombre si está disponible
      // Como no tenemos las opciones disponibles, creamos productos básicos
      
      console.log(`🔍 Procesando producto ${index}:`, producto);

      return {
        idProducto: '', // Lo dejaremos vacío hasta que las opciones se carguen
        limite: producto.valor || producto.cuota_valor || 0,
        limiteActual: producto.valor || producto.cuota_valor || 0,
        nombreProducto: producto.nombre || producto.nombreComun || `Producto ${index + 1}`
      };
    });
  };

  // Efecto para cargar datos cuando se abre el modal (PRIMERA CARGA)
  useEffect(() => {
    if (cuotaOriginal && open) {
      console.log('🔍 PRIMERA CARGA - Datos originales de la cuota:', cuotaOriginal);
      console.log('🔍 PRIMERA CARGA - Opciones disponibles:', opciones);

      // ✅ CORREGIDO: Usar idSetCuota (sin "s") como viene del backend
      const idCuotaSet = cuotaOriginal.idCuotaSet || cuotaOriginal.idSetCuota;

      // Cargar datos básicos inmediatamente
      setCuota(prev => ({
        ...prev,
        idCuotaSet: idCuotaSet,
        nombre: cuotaOriginal.nombre || '',
        descripcion: cuotaOriginal.descripcion || '',
        periodoRenovacion: cuotaOriginal.periodoRenovacion || 6,
        renovacionHabilitada: cuotaOriginal.renovacionHabilitada || false,
      }));

      // Cargar productos inmediatamente, sin esperar opciones
      if (cuotaOriginal.productos && Array.isArray(cuotaOriginal.productos)) {
        const productosConvertidos = convertirProductosParaEdicion(cuotaOriginal.productos, opciones);
        setCuota(prev => ({
          ...prev,
          productos: productosConvertidos
        }));
      }
      
      setError(false);
      setAlertaLocal(null);
    }
  }, [cuotaOriginal, open, setError]);

  // Efecto separado para actualizar productos cuando las opciones estén disponibles
  useEffect(() => {
    if (cuotaOriginal && open && opciones && opciones.length > 0 && cuota.productos.length > 0) {
      console.log('🔍 ACTUALIZANDO PRODUCTOS CON OPCIONES - Iniciando actualización');
      
      // Actualizar productos existentes con los IDs correctos
      const productosActualizados = cuota.productos.map(producto => {
        const opcionEncontrada = opciones.find(opcion => 
          opcion.nombreProducto === producto.nombreProducto
        );

        console.log(`🔍 Buscando "${producto.nombreProducto}" en opciones:`, opcionEncontrada);

        return {
          ...producto,
          idProducto: opcionEncontrada?.id || ''
        };
      });

      console.log('🔍 PRODUCTOS ACTUALIZADOS con IDs:', productosActualizados);

      setCuota(prev => ({
        ...prev,
        productos: productosActualizados
      }));
    }
  }, [opciones, open]);

  // Limpiar estados al cerrar
  useEffect(() => {
    if (!open) {
      setAlertaLocal(null);
      setError(false);
    }
  }, [open, setError]);

  const handleAgregarProducto = () => {
    setCuota(prev => ({
      ...prev,
      productos: [
        ...prev.productos,
        { idProducto: '', limite: 0, limiteActual: 0, nombreProducto: '' }
      ]
    }));
  };

  const handleEliminarProducto = (index) => {
    setCuota(prev => ({
      ...prev,
      productos: prev.productos.filter((_, i) => i !== index)
    }));
  };

  const handleCambiarProducto = (index, campo, valor) => {
    setCuota(prev => ({
      ...prev,
      productos: prev.productos.map((producto, i) => {
        if (i === index) {
          const nuevoProducto = { ...producto, [campo]: valor };
          
          // Si cambia el producto, actualizar el nombre
          if (campo === 'idProducto') {
            const opcionSeleccionada = opciones?.find(opcion => opcion.id === valor);
            nuevoProducto.nombreProducto = opcionSeleccionada?.nombreProducto || '';
          }
          
          return nuevoProducto;
        }
        return producto;
      })
    }));
  };

  const validarFormulario = () => {
    if (!cuota.nombre.trim()) {
      setAlertaLocal({
        tipo: 'error',
        mensaje: 'El nombre es obligatorio.'
      });
      return false;
    }

    if (cuota.periodoRenovacion < 1 || cuota.periodoRenovacion > 12) {
      setAlertaLocal({
        tipo: 'error',
        mensaje: 'El período de renovación debe estar entre 1 y 12 meses.'
      });
      return false;
    }

    // Validar productos - solo si hay opciones disponibles
    if (opciones && opciones.length > 0) {
      for (let i = 0; i < cuota.productos.length; i++) {
        const producto = cuota.productos[i];
        
        if (!producto.idProducto) {
          setAlertaLocal({
            tipo: 'error',
            mensaje: `Debes seleccionar un producto en la posición ${i + 1}.`
          });
          return false;
        }
        
        if (producto.limite < 0) {
          setAlertaLocal({
            tipo: 'error',
            mensaje: `El límite del producto "${producto.nombreProducto}" debe ser mayor o igual a 0.`
          });
          return false;
        }
        
        if (producto.limiteActual < 0) {
          setAlertaLocal({
            tipo: 'error',
            mensaje: `El límite actual del producto "${producto.nombreProducto}" debe ser mayor o igual a 0.`
          });
          return false;
        }
      }
    }

    return true;
  };

  const handleGuardar = async () => {
    setAlertaLocal(null);
    
    if (!validarFormulario()) {
      return;
    }

    const datosActualizacion = {
      idCuotaSet: cuota.idCuotaSet,
      cambios: {
        nombre: cuota.nombre.trim(),
        descripcion: cuota.descripcion.trim(),
        periodoRenovacion: cuota.periodoRenovacion,
        renovacionHabilitada: cuota.renovacionHabilitada,
        productos: cuota.productos.map(producto => ({
          idProducto: producto.idProducto || 1, // Fallback si no hay ID
          limite: producto.limite,
          limiteActual: producto.limiteActual
        }))
      }
    };

    console.log('📤 Enviando datos de actualización:', datosActualizacion);

    try {
      const resultado = await actualizarCuota(datosActualizacion);
      if (resultado) {
        onActualizado();
        onClose();
      }
    } catch (err) {
      console.error('Error al actualizar cuota:', err);
    }
  };

  // Si está cargando los detalles, mostrar loading
  if (cargandoDetalle) {
    return (
      <ModalFlotante
        open={open}
        onClose={onClose}
        titulo="Cargando..."
      >
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography>Cargando información del set de cuotas...</Typography>
        </Box>
      </ModalFlotante>
    );
  }

  // Si hay error al cargar detalles
  if (errorDetalle) {
    return (
      <ModalFlotante
        open={open}
        onClose={onClose}
        titulo="Error"
        cancelLabel="Cerrar"
      >
        <Box sx={{ p: 2 }}>
          <Alerta 
            tipo="error" 
            mensaje={`Error al cargar la información: ${errorDetalle}`} 
          />
        </Box>
      </ModalFlotante>
    );
  }

  return (
    <ModalFlotante
      open={open}
      onClose={onClose}
      onConfirm={handleGuardar}
      titulo={`Editar: ${cuota.nombre || 'Set de Cuotas'}`}
      confirmLabel={cargando ? 'Guardando...' : 'Guardar'}
      cancelLabel="Cancelar"
      disabledConfirm={cargando || cargandoOpciones}
      customWidth={800}
    >
      <Box sx={{ maxHeight: '70vh', overflow: 'auto', p: 1 }}>
        {/* Alertas */}
        {alertaLocal && (
          <Alerta 
            tipo={alertaLocal.tipo} 
            mensaje={alertaLocal.mensaje} 
            sx={{ mb: 2 }}
            onClose={() => setAlertaLocal(null)}
            cerrable
          />
        )}
        
        {error && (
          <Alerta 
            tipo="error" 
            mensaje={mensaje} 
            sx={{ mb: 2 }} 
          />
        )}

        {/* 🔍 DEBUG INFO - Botón temporal */}
        <button 
          onClick={() => {
            console.log('🔍 DATOS ACTUALES:', {
              cuotaOriginal,
              opciones,
              cuotaState: cuota,
              opcionesLength: opciones?.length,
              productosLength: cuota.productos?.length
            });
          }}
          style={{ margin: '10px', padding: '5px', background: 'orange', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          DEBUG: Ver datos en consola
        </button>

        {/* 🔍 DEBUG INFO - Info visual */}
        <Box sx={{ mb: 2, p: 1, backgroundColor: '#f0f0f0', fontSize: '12px' }}>
          <Typography variant="caption">
            <strong>Debug:</strong> Productos cargados: {cuota.productos.length} | 
            Opciones disponibles: {opciones?.length || 0} | 
            Nombre: {cuota.nombre || 'Sin nombre'}
          </Typography>
        </Box>

        {/* Información básica */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Información Básica
        </Typography>

        <CampoTexto
          label="Nombre *"
          value={cuota.nombre || ''}
          onChange={(e) => setCuota(prev => ({ ...prev, nombre: e.target.value }))}
          fullWidth
          sx={{ mb: 2 }}
          error={!cuota.nombre.trim()}
          helperText={!cuota.nombre.trim() ? 'El nombre es obligatorio' : ''}
        />

        <CampoTexto
          label="Descripción"
          value={cuota.descripcion || ''}
          onChange={(e) => setCuota(prev => ({ ...prev, descripcion: e.target.value }))}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
          <NumeroInput
            label="Período de Renovación (meses) *"
            value={cuota.periodoRenovacion || 6}
            onChange={(e) => setCuota(prev => ({ 
              ...prev, 
              periodoRenovacion: parseInt(e.target.value) || 6 
            }))}
            min={1}
            max={12}
            sx={{ flex: 1 }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Switch
              label="Renovación Habilitada"
              checked={cuota.renovacionHabilitada || false}
              onChange={(e) => setCuota(prev => ({ 
                ...prev, 
                renovacionHabilitada: e.target.checked 
              }))}
            />
          </Box>
        </Box>

        {/* Productos */}
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Productos Asociados ({cuota.productos.length})
            </Typography>
            <IconButton 
              color="primary" 
              onClick={handleAgregarProducto}
              disabled={cargandoOpciones}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {cargandoOpciones && (
            <Typography color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
              Cargando opciones de productos...
            </Typography>
          )}

          {/* Mensaje si no hay opciones disponibles */}
          {!cargandoOpciones && (!opciones || opciones.length === 0) && (
            <Box sx={{ p: 2, backgroundColor: '#fff3cd', borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="warning.main">
                ⚠️ No se pudieron cargar las opciones de productos. Los productos existentes se mostrarán pero no podrás editarlos completamente hasta que se solucione el problema de conexión con el backend.
              </Typography>
            </Box>
          )}

          {cuota.productos.length === 0 ? (
            <Typography color="textSecondary" sx={{ textAlign: 'center', py: 2 }}>
              No hay productos asociados. Haz clic en + para agregar uno.
            </Typography>
          ) : (
            cuota.productos.map((producto, index) => (
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
                    Producto {index + 1} {producto.nombreProducto && `(${producto.nombreProducto})`}
                  </Typography>
                  <IconButton 
                    color="error" 
                    size="small"
                    onClick={() => handleEliminarProducto(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* Select de Producto - solo si hay opciones */}
                  {opciones && opciones.length > 0 ? (
                    <FormControl sx={{ minWidth: 250, flex: 1 }}>
                      <InputLabel>Producto *</InputLabel>
                      <Select
                        value={producto.idProducto || ''}
                        onChange={(e) => handleCambiarProducto(index, 'idProducto', e.target.value)}
                        disabled={cargandoOpciones}
                        label="Producto *"
                      >
                        <MenuItem value="">
                          <em>Seleccione un producto</em>
                        </MenuItem>
                        {opciones.map((opcion) => (
                          <MenuItem key={opcion.id} value={opcion.id}>
                            {opcion.nombreProducto} ({opcion.tipo})
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    <TextField
                      label="Nombre del Producto"
                      value={producto.nombreProducto || ''}
                      onChange={(e) => handleCambiarProducto(index, 'nombreProducto', e.target.value)}
                      sx={{ minWidth: 250, flex: 1 }}
                      disabled
                      helperText="Opciones no disponibles"
                    />
                  )}

                  {/* Campo de Límite */}
                  <TextField
                    label="Límite *"
                    type="number"
                    value={producto.limite || 0}
                    onChange={(e) => handleCambiarProducto(index, 'limite', parseInt(e.target.value) || 0)}
                    inputProps={{ min: 0 }}
                    sx={{ minWidth: 120 }}
                  />

                  {/* Campo de Límite Actual */}
                  <TextField
                    label="Límite Actual *"
                    type="number"
                    value={producto.limiteActual || 0}
                    onChange={(e) => handleCambiarProducto(index, 'limiteActual', parseInt(e.target.value) || 0)}
                    inputProps={{ min: 0 }}
                    sx={{ minWidth: 120 }}
                  />
                </Box>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </ModalFlotante>
  );
};

export default ModalEditarCuotas;