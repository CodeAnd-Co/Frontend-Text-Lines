//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useCrearProveedor } from '@Hooks/Proveedores/useCrearProveedor';

const CampoTextoForm = memo(({ label, name, value, onChange, placeholder, error, helperText }) => (
  <Grid item size={6}>
    <CampoTexto
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      size='medium'
      required={true}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
    />
  </Grid>
));

const FormularioProveedor = memo(({ formularioAbierto, alCerrarFormularioProveedor }) => {
  const [alerta, setAlerta] = useState(null);
  const [proveedor, setProveedor] = useState({
    nombre: '',
    nombreCompania: '',
    telefonoContacto: '',
    correoContacto: '',
    direccion: '',
    codigoPostal: '',
    pais: '',
    estado: 1,
  });

  const { errores, manejarGuardarProveeodor } = useCrearProveedor();

  const handleChange = useCallback((evento) => {
    const { name, value } = evento.target;
    setProveedor((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const manejarGuardarProveedor = async () => {
    const resultado = await manejarGuardarProveeodor(proveedor);

    if (resultado?.mensaje) {
      if (resultado.exito) {
        const resumenProveedor = `
          Usuario ${proveedor.nombre} ${proveedor.nombreCompania} creado exitosamente.
        `;

        setAlerta({
          tipo: 'success',
          mensaje: resumenProveedor,
        });

        setProveedor({
          nombre: '',
          nombreCompania: '',
          telefonoContacto: '',
          correoContacto: '',
          direccion: '',
          codigoPostal: '',
          pais: '',
        });
      } else {
        setAlerta({
          tipo: 'error',
          mensaje: resultado.mensaje,
        });
      }
    }
  };

  return (
    <ModalFlotante
      open={formularioAbierto}
      onClose={alCerrarFormularioProveedor}
      titulo='Datos del Proveedor'
      onConfirm={manejarGuardarProveedor}
      confirmLabel='Guardar'
      cancelLabel='Atras'
    >
      <Box
        component='form'
        sx={{
          flexGrow: 1,
          '& .MuiTextField-root': { margin: 1, width: '30ch' },
          '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
          mt: 2,
          mb: 2,
        }}
        noValidate
        autoComplete='off'
      >
        <Grid container spacing={2}>
          <CampoTextoForm
            label='Nombre del proveeodr'
            name='nombre'
            value={proveedor.nombre}
            onChange={handleChange}
            placeholder='Ingresa el nombre del proveedor'
            error={errores?.nombre}
            helperText={errores?.nombre}
          />
          <CampoTextoForm
            label='Nombre de la Compañía'
            name='nombreCompania'
            value={proveedor.nombreCompania}
            onChange={handleChange}
            placeholder='Ingresa el nombre de la compañía'
            error={errores?.nombreCompania}
            helperText={errores?.nombreCompania}
          />
          <CampoTextoForm
            label='Teléfono de Contacto'
            name='telefonoContacto'
            value={proveedor.telefonoContacto}
            onChange={handleChange}
            placeholder='Ingresa el teléfono de contacto'
            error={errores?.telefonoContacto}
            helperText={errores?.telefonoContacto}
          />
          <CampoTextoForm
            label='Correo de Contacto'
            name='correoContacto'
            value={proveedor.correoContacto}
            onChange={handleChange}
            placeholder='Ingresa el correo de contacto'
            error={errores?.correoContacto}
            helperText={errores?.correoContacto}
          />
          <CampoTextoForm
            label='Dirección'
            name='direccion'
            value={proveedor.direccion}
            onChange={handleChange}
            placeholder='Ingresa la dirección del proveedor'
            error={errores?.direccion}
            helperText={errores?.direccion}
          />
          <CampoTextoForm
            label='Código Postal'
            name='codigoPostal'
            value={proveedor.codigoPostal}
            onChange={handleChange}
            placeholder='Ingresa el código postal'
            error={errores?.codigoPostal}
            helperText={errores?.codigoPostal}
          />
          <CampoTextoForm
            label='País'
            name='pais'
            value={proveedor.pais}
            onChange={handleChange}
            placeholder='Ingresa el país'
            error={errores?.pais}
            helperText={errores?.pais}
          />
        </Grid>
      </Box>
      {alerta && (
        <Alerta
          sx={{ marginBottom: 2 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='4000'
          onClose={() => setAlerta(null)}
        />
      )}
    </ModalFlotante>
  );
});

export default FormularioProveedor;
