//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { memo, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import CampoTexto from '@Atomos/CampoTexto';
import Alerta from '@Moleculas/Alerta';
import ModalFlotante from '@Organismos/ModalFlotante';
import { useCrearProveedor } from '@Hooks/Proveedores/useCrearProveedor';

const CampoTextoForm = memo(
  ({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    textoAyuda,
    maxLongitud = 100,
    maxLongitudCP = 5, // Límite para código postal
    maxLongitudCelular = 10, // Límite para celular
    maxLongitudPais = 60, // Límite para país
    ...rest
  }) => {
    // Determina el límite de caracteres según el campo
    const limiteCaracteres
      = name === 'codigoPostal'
        ? maxLongitudCP
        : name === 'telefonoContacto'
        ? maxLongitudCelular
        : name === 'pais'
        ? maxLongitudPais
        : maxLongitud;

    return (
      <Grid item size={6}>
        <CampoTexto
          label={label}
          name={name}
          value={value}
          onChange={(evento) => {
            const nuevoValor = evento.target.value.slice(0, limiteCaracteres);
            onChange({ target: { name, value: nuevoValor } });
          }}
          helperText={
            limiteCaracteres
              ? `${value.length}/${limiteCaracteres} - Máximo de caracteres. ${textoAyuda || ''}`
              : textoAyuda
          }
          size='medium'
          required
          placeholder={placeholder}
          error={error}
          inputProps={{ maxLength: limiteCaracteres }}
          {...rest}
        />
      </Grid>
    );
  }
);

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
      cancelLabel='Atrás'
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
            label='Nombre del proveedor'
            name='nombre'
            value={proveedor.nombre}
            onChange={handleChange}
            placeholder='Ingresa el nombre del proveedor'
            error={errores?.nombre}
            textoAyuda={errores?.nombre}
            maxLongitud={100} // Límite de caracteres
          />
          <CampoTextoForm
            label='Nombre de la Compañía'
            name='nombreCompania'
            value={proveedor.nombreCompania}
            onChange={handleChange}
            placeholder='Ingresa el nombre de la compañía'
            error={errores?.nombreCompania}
            textoAyuda={errores?.nombreCompania}
            maxLongitud={100} // Límite de caracteres
          />
          <CampoTextoForm
            label='Teléfono de Contacto'
            name='telefonoContacto'
            value={proveedor.telefonoContacto}
            onChange={handleChange}
            placeholder='Ingresa el teléfono de contacto'
            error={errores?.telefonoContacto}
            textoAyuda={errores?.telefonoContacto}
            maxLongitudCelular={10} // Límite específico para celular
          />
          <CampoTextoForm
            label='Correo de Contacto'
            name='correoContacto'
            value={proveedor.correoContacto}
            onChange={handleChange}
            placeholder='Ingresa el correo de contacto'
            error={errores?.correoContacto}
            textoAyuda={errores?.correoContacto}
            maxLongitud={100} // Límite de caracteres
          />
          <CampoTextoForm
            label='Dirección'
            name='direccion'
            value={proveedor.direccion}
            onChange={handleChange}
            placeholder='Ingresa la dirección del proveedor'
            error={errores?.direccion}
            textoAyuda={errores?.direccion}
            maxLongitud={100} // Límite de caracteres
          />
          <CampoTextoForm
            label='Código Postal'
            name='codigoPostal'
            value={proveedor.codigoPostal}
            onChange={handleChange}
            placeholder='Ingresa el código postal'
            error={errores?.codigoPostal}
            textoAyuda={errores?.codigoPostal}
            maxLongitudCP={5} // Límite específico para código postal
          />
          <CampoTextoForm
            label='País'
            name='pais'
            value={proveedor.pais}
            onChange={handleChange}
            placeholder='Ingresa el país'
            error={errores?.pais}
            textoAyuda={errores?.pais}
            maxLongitudPais={60} // Límite específico para país
          />
        </Grid>
      </Box>
      {alerta && (
        <Alerta
          sx={{ marginBottom: 2 }}
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          duracion='3000'
          onClose={() => setAlerta(null)}
        />
      )}
    </ModalFlotante>
  );
});

export default FormularioProveedor;
