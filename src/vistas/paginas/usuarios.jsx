<<<<<<< HEAD
// src/vistas/paginas/usuarios.jsx
import { useEffect, useState } from "react";
import { ejecutarObtenerUsuario } from "../../hooks/Usuarios/leer-usuario";

const Usuarios = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const data = await ejecutarObtenerUsuario(1); // Prueba con ID 1
        setUsuario(data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        setError("No se pudo cargar la información del usuario.");
      }
    };

    obtenerUsuario();
  }, []);

  return (
    <div>
      <h2>Información del Usuario</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {usuario ? (
        <ul>
          <li><strong>Nombre:</strong> {usuario.nombre}</li>
          <li><strong>Correo:</strong> {usuario.correo}</li>
          <li><strong>Teléfono:</strong> {usuario.telefono}</li>
          <li><strong>Dirección:</strong> {usuario.direccion}</li>
          <li><strong>Fecha de Nacimiento:</strong> {usuario.fechaNacimiento}</li>
          <li><strong>Género:</strong> {usuario.genero}</li>
          <li><strong>Estatus:</strong> {usuario.estatus ? "Activo" : "Inactivo"}</li>
        </ul>
      ) : (
        !error && <p>Cargando usuario...</p>
      )}
    </div>
  );
};

export default Usuarios;
=======
import { useState } from "react";
import { Button, Modal, Box, Paper } from "@mui/material";
import FormularioCrearUsuario from "../componentes/organismos/formularioCrearUsuario";
import Stack from "@mui/material/Stack";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function Usuarios() {
  const [open, setOpen] = useState(false);

  const [datosUsuario, setDatosUsuario] = useState({
    nombreCompleto: "",
    apellido: "",
    correoElectronico: "",
    contrasenia: "",
    confirmarContrasenia: "",
    numeroTelefono: "",
    direccion: "",
    codigoPostal: "",
    fechaNacimiento: null,
    genero: "",
    cliente: "",
    rol: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setDatosUsuario({
      nombreCompleto: "",
      apellido: "",
      correoElectronico: "",
      contrasenia: "",
      confirmarContrasenia: "",
      numeroTelefono: "",
      direccion: "",
      codigoPostal: "",
      fechaNacimiento: null,
      genero: "",
      cliente: "",
      rol: "",
    });
  };

  const handleGuardarUsuario = async () => {
    if (datosUsuario.contrasenia !== datosUsuario.confirmarContrasenia) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const rolMap = {
      "Super Administrador": 1,
      Administrador: 2,
      Supervisor: 3,
      Nada: 4,
    };

    const clienteMap = {
      Toyota: 101,
      Otro: 102,
    };

    const datosParaEnviar = {
      nombreCompleto: `${datosUsuario.nombreCompleto} ${datosUsuario.apellido}`,
      correoElectronico: datosUsuario.correoElectronico,
      contrasenia: datosUsuario.contrasenia,
      numeroTelefono: datosUsuario.numeroTelefono,
      direccion: datosUsuario.direccion,
      fechaNacimiento: datosUsuario.fechaNacimiento
        ? datosUsuario.fechaNacimiento.format("YYYY-MM-DD")
        : null,
      genero: datosUsuario.genero,
      estatus: true,
      idRol: rolMap[datosUsuario.rol],
      idCliente: clienteMap[datosUsuario.cliente],
    };

    console.log("Datos que se enviarán:", datosParaEnviar);

    try {
      const response = await axios.post(
        `${API_URL}/api/usuarios/crear`,
        datosParaEnviar,
        {
          withCredentials: true,
          headers: { "x-api-key": `${API_KEY}` },
        }
      );

      alert(response.data?.mensaje || "Usuario creado correctamente");
      handleClose();
    } catch (error) {
      console.error("Error al crear usuario:", error);
      const mensaje
        = error.response?.data?.mensaje || "Hubo un error al crear el usuario";
      alert("Error: ", mensaje);
    }
  };

  return (
    <div>
      <h1>Vista de usuarios</h1>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleOpen}
      >
        Añadir
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(4px)",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        }}
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "80vh",
            overflowY: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: 2,
            padding: 3,
            outline: "none",
            width: 620,
          }}
        >
          <h2>Añadir Usuario</h2>

          <FormularioCrearUsuario
            datosUsuario={datosUsuario}
            setDatosUsuario={setDatosUsuario}
          />

          <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            marginTop={2}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="contained" onClick={handleGuardarUsuario}>
              Guardar
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}
>>>>>>> c7aac59f10f7d768c89052205e177f5f7feba15f
