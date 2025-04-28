import { Grid } from '@mui/material';
import CampoTexto from '../../Atomos/CampoTexto';

const FormularioProveedor = ({ proveedor, setProveedor }) => {
  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setProveedor((prevProveedor) => ({
      ...prevProveedor,
      [name]: value,
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item size={6}>
        <CampoTexto
          label='Nombre'
          name='nombre'
          value={proveedor.nombre}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el nombre del proveedor'
        />
      </Grid>
      <Grid item size={6}>
        <CampoTexto
          label='Nombre de la Compañía'
          name='nombreCompania'
          value={proveedor.nombreCompania}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el nombre de la compañía'
        />
      </Grid>
      <Grid item size={6}>
        <CampoTexto
          label='Teléfono de Contacto'
          name='telefonoContacto'
          value={proveedor.telefonoContacto}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el teléfono de contacto'
        />
      </Grid>
      <Grid item size={6}>
        <CampoTexto
          label='Dirección'
          name='direccion'
          value={proveedor.direccion}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa la dirección del proveedor'
        />
      </Grid>
      <Grid item size={6}>
        <CampoTexto
          label='Código Postal'
          name='codigoPostal'
          value={proveedor.codigoPostal}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el código postal'
        />
      </Grid>
      <Grid item size={6}>
        <CampoTexto
          label='País'
          name='pais'
          value={proveedor.pais}
          onChange={handleChange}
          size='medium'
          required
          placeholder='Ingresa el país'
        />
      </Grid>
    </Grid>
  );
};

export default FormularioProveedor;
