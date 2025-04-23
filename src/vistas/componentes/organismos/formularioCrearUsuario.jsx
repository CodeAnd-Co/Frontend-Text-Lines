import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Grid from "@mui/material/Grid";
import constantes from "../../../utilidades/constantes/constantesUsuarios";

export default function FormularioCrearUsuario({
  datosUsuario,
  setDatosUsuario,
}) {
  const gridStyles = {
    display: "flex",
    justifyContent: "center",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleFechaNacimiento = (nuevaFecha) => {
    setDatosUsuario((prev) => ({
      ...prev,
      fechaNacimiento: nuevaFecha,
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        flexGrow: 1,
        "& .MuiTextField-root": { margin: 1, width: "30ch" },
        "& .MuiFormControl-root": { margin: 1, minWidth: "30ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Grid container columns={12}>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.NOMBRE}
            name="nombreCompleto"
            label="Nombre"
            value={datosUsuario.nombreCompleto}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.APELLIDO}
            name="apellido"
            label="Apellido"
            value={datosUsuario.apellido}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Fecha de nacimiento"
              value={datosUsuario.fechaNacimiento}
              onChange={handleFechaNacimiento}
              sx={gridStyles}
            />
          </LocalizationProvider>
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <FormControl sx={gridStyles}>
            <InputLabel id={constantes.GENERO}>Género</InputLabel>
            <Select
              labelId="seleccion-genero"
              id={constantes.GENERO}
              name="genero"
              label="Género"
              value={datosUsuario.genero}
              onChange={handleChange}
            >
              <MenuItem value="Hombre">Hombre</MenuItem>
              <MenuItem value="Mujer">Mujer</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.CORREO}
            name="correoElectronico"
            label="Correo Electrónico"
            value={datosUsuario.correoElectronico}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.TELEFONO}
            name="numeroTelefono"
            label="Número de Teléfono"
            value={datosUsuario.numeroTelefono}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            id={constantes.DIRECCION}
            name="direccion"
            label="Dirección"
            value={datosUsuario.direccion}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            id={constantes.CODIGO_POSTAL}
            name="codigoPostal"
            label="Código Postal"
            value={datosUsuario.codigoPostal}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <FormControl required sx={gridStyles}>
            <InputLabel id={constantes.CLIENTE}>Cliente</InputLabel>
            <Select
              labelId="seleccion-cliente"
              id={constantes.CLIENTE}
              name="cliente"
              label="Cliente"
              value={datosUsuario.cliente}
              onChange={handleChange}
            >
              <MenuItem value="Toyota">Toyota</MenuItem>
              <MenuItem value="Otro">Otro</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <FormControl required sx={gridStyles}>
            <InputLabel id={constantes.ROL}>Rol</InputLabel>
            <Select
              labelId="seleccion-rol"
              id={constantes.ROL}
              name="rol"
              label="Rol"
              value={datosUsuario.rol}
              onChange={handleChange}
            >
              <MenuItem value="Super Administrador">
                Super Administrador
              </MenuItem>
              <MenuItem value="Administrador">Administrador</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="Nada">Nada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.CONTRASENA}
            name="contrasenia"
            label="Contraseña"
            type="password"
            autoComplete="new-password"
            value={datosUsuario.contrasenia}
            onChange={handleChange}
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.CONFIRMAR_CONTRASENA}
            name="confirmarContrasenia"
            label="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
            value={datosUsuario.confirmarContrasenia}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
