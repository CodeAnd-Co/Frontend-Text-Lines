import { useState, useEffect, useCallback, useRef } from 'react';
import ModalFlotante from '@Organismos/ModalFlotante';
// import FormaCrearCliente from '@Organismos/Formularios/FormaCrearCliente';
import useCrearCliente from '@Hooks/Clientes/useCrearCliente';
import Alerta from '@Moleculas/Alerta';
import Boton from '@Atomos/Boton'
import { Grid, Box, useTheme, Button, CircularProgress } from '@mui/material';
import CampoTexto from '@Atomos/CampoTexto';
import Texto from '@Atomos/Texto';
import atomo from '@Atomos/Imagen';
import Icono from '@Atomos/Icono';
import ContenedorImportarImagen from '@Organismos/ContenedorImportarImagen'
import TarjetaConImagen from '../../Moleculas/TarjetaConImagen';

import { tokens } from '@SRC/theme';

const ModalCrearCliente = ({ abierto = false, onCerrar, onCreado, onImageChange}) => {
  const [nombreComercial, setNombreComercial] = useState('');
  const [nombreFiscal, setNombreFiscal] = useState('');
  const [imagen, setImagen] = useState([]);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const theme = useTheme();
  const colores = tokens(theme.palette.mode);
  const fileInputRef = useRef(null);
  const imagenSubiendo = false;


  // Track if the form has been reset to prevent multiple resets
  const hasReset = useRef(false);

  const { crearCliente, cargando, exito, error, mensaje, setError, resetEstado }
    = useCrearCliente();

  // Reset the form only once when the modal closes
  useEffect(() => {
    if (!abierto && !hasReset.current) {
      hasReset.current = true;
      resetEstado();
      // Delay state updates to prevent render loop
      setTimeout(() => {
        setNombreComercial('');
        setNombreFiscal('');
        setImagen('');
        setMostrarAlerta(false);
      }, 0);
    } else if (abierto) {
      // Reset the flag when modal opens
      hasReset.current = false;
    }
  }, [abierto, resetEstado]);

  // Handle successful creation
  useEffect(() => {
    let timeoutId;
    if (exito) {
      timeoutId = setTimeout(() => {
        if (onCreado) {
          onCreado();
        } else {
          onCerrar();
        }
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [exito, onCreado, onCerrar]);

  const handleCerrar = useCallback(() => {
    onCerrar();
  }, [onCerrar]);

  const handleConfirmar = async () => {
    // Validate that category name is not empty after removing spaces
    // and that there is at least one selected product
    console.log('confirmar: ', nombreComercial)
    if (!nombreComercial.trim()) {
      console.log('Falta el nombre comercial.')
      setMostrarAlerta(true);
      // return;
    }
    
    console.log('confirmar: ', nombreFiscal)
    if (!nombreFiscal.trim()) {
      console.log('Falta el nombre fiscal.')
      setMostrarAlerta(true);
      // return;
    }


    // Send data with clean names (without unnecessary spaces)
    await crearCliente({
      nombreComercial: nombreComercial.trim(),
      nombreFiscal: nombreFiscal.trim(),
      imagen,
    });
  };





  const handleFileSelect = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (evento) => {
    const file = evento.target.files[0];
    if (!file) return;

    // Verificar que sea un archivo JPG o JPEG
    const validJpgTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validJpgTypes.includes(file.type.toLowerCase())) {
      if (onImageChange) {
        onImageChange({
          error: 'Solo se permiten imágenes en formato JPG o JPEG.',
        });
      }
      evento.target.value = ''; // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      return;
    }

    // Verificar el tamaño del archivo
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      if (onImageChange) {
        onImageChange({
          error: 'La imagen es demasiado grande. El tamaño máximo permitido es 4MB.',
        });
      }
      evento.target.value = ''; // Limpiar el input para permitir seleccionar el mismo archivo nuevamente
      return;
    }

    if (onImageChange) {
      const preview = URL.createObjectURL(file);

      onImageChange({
        file,
        preview,
        name: file.name,
        type: file.type,
        size: file.size,
      });
    }
  };

  
  return (
    <>
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Crear cliente'
      cancelLabel='Cancelar'
      // confirmLabel='Guardar'
      confirmLabel={cargando ? 'Creando...' : 'Crear'}
      // disabledConfirm={cargando}
    >
    <>
    {/* <Texto>Nombre comercial.</Texto> */}
    <CampoTexto
      label={'Nombre comercial'}
      name='nombreComercial'
      onChange={(evento) => setNombreComercial(evento.target.value)}
      fullWidth={true}
      type={'text'}
      required={true}
      />
    {/* <Texto>Nombre fiscal.</Texto> */}
    <CampoTexto
      label={'Nombre fiscal'}
      name='nombreFiscal'
      onChange={(evento) => setNombreFiscal(evento.target.value)}
      fullWidth={true}
      type={'text'}
      required={true}
      />

    {/* <input
      type='file'
      ref={fileInputRef}
      onChange={handleFileChange}
      accept='image/jpeg,image/jpg,image/png'
      style={{ display: 'none' }}
    />
    <Boton
      variant='outlined'
      size='large'
      onClick={handleFileSelect}
      startIcon={<Icono nombre='Upload' />}
      disabled={imagenSubiendo}
      sx={{ mb: 4 }}
    >
      {imagenSubiendo ? 'Subiendo...' : 'Subir imagen JPG'}
    </Boton>*/}

    <ContenedorImportarImagen></ContenedorImportarImagen>

    <Texto
      variant='caption'
      display='block'
      sx={{ mb: 4, color: theme.palette.text.secondary }}
    > 
      Solo se permiten imágenes en formato JPG/JPEG, máximo 5MB.
    </Texto>

    </>
      {(exito || error) && (
        <Alerta
          tipo={exito ? 'success' : 'error'}
          mensaje={mensaje}
          duracion={exito ? 4000 : 6000}
          sx={{ margin: 3 }}
          cerrable
          onClose={error ? () => setError(false) : undefined}
          centrad
        />
      )}
      {mostrarAlerta && (
        <Alerta
          tipo='warning'
          mensaje={'Ingresa el nombre fiscal y comercial.'}
          cerrable
          duracion={10000}
          onClose={() => setMostrarAlerta(false)}
          sx={{ mb: 2, mt: 2 }}
        />
      )}
      </ModalFlotante>
    </>
  );
};

export default ModalCrearCliente;
