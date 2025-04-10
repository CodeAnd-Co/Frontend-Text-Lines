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
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import constantes from "../../../utilidades/constantes/constantesUsuarios";

export default function FormPropsTextFields() {
  const [genero, setGenero] = React.useState("");
  const [cliente, setCliente] = React.useState("");
  const [rol, setRol] = React.useState("");
  const [nacimiento, setNacimiento] = React.useState(dayjs("2022-04-17"));

  const gridStyles = {
    display: "flex",
    justifyContent: "center",
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
          <TextField required id={constantes.NOMBRE} label="Nombre" />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField required id={constantes.APELLIDO} label="Apellido" />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Fecha de nacimiento"
              value={nacimiento}
              onChange={(newNacimiento) => setNacimiento(newNacimiento)}
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
              value={genero}
              label="Género"
              onChange={(elemento) => setGenero(elemento.target.value)}
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
            label="Correo Electrónico"
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.TELEFONO}
            label="Número de Teléfono"
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField id={constantes.DIRECCION} label="Dirección" />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField id={constantes.CODIGO_POSTAL} label="Código Postal" />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <FormControl required sx={gridStyles}>
            <InputLabel id={constantes.CLIENTE}>Cliente</InputLabel>
            <Select
              labelId="seleccion-cliente"
              id={constantes.CLIENTE}
              value={cliente}
              label="Cliente"
              onChange={(elemento) => setCliente(elemento.target.value)}
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
              value={rol}
              label="Rol"
              onChange={(elemento) => setRol(elemento.target.value)}
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
            label="Contraseña"
            type="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid size={6} sx={gridStyles}>
          <TextField
            required
            id={constantes.CONFIRMAR_CONTRASENA}
            label="Confirmar contraseña"
            type="password"
            autoComplete="new-password"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
