import React, { useState } from "react";
import { useUsuarioPorId } from "../../../hooks/Usuarios/reqLeerUsuario";
import ModalFlotante from "../../componentes/organismos/ModalFlotante";
import InfoUsuario from "../../componentes/moleculas/UsuarioInfo";
import { Button } from "@mui/material";

/**
 * Página para consultar y mostrar la información de un usuario por su ID,
 * con un botón para abrir el modal.
 */
const PaginaDetalleUsuario = () => {
  const idUsuario = 2;
  const [modalAbierto, setModalAbierto] = useState(false);

  const { usuario, mensaje, cargando, error } = useUsuarioPorId(
    modalAbierto ? idUsuario : null // solo carga si el modal se abre
  );

  const botones = [
    {
      label: "EDITAR",
      variant: "contained",
      color: "primary",
      backgroundColor: "rgba(24, 50, 165, 1)",
      onClick: () => {
        console.log("Editar usuario");
      },
    },
    {
      label: "SALIR",
      variant: "outlined",
      color: "primary",
      outlineColor: "rgba(24, 50, 165, 1)",
      onClick: () => setModalAbierto(false),
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalAbierto(true)}
        sx={{ mt: 2 }}
      >
        Ver Detalle del Usuario
      </Button>

      {modalAbierto && (
        <ModalFlotante
          open={modalAbierto}
          onClose={() => setModalAbierto(false)}
          onConfirm={() => setModalAbierto(false)}
          titulo={usuario?.nombreCompleto || "Cargando..."}
          tituloVariant="h4"
          botones={botones}
        >
          {cargando ? (
            <p>Cargando usuario...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : usuario ? (
            <InfoUsuario
              modoEdicion={false}
              cliente="Toyota"
              rol={usuario.rol}
              datosContacto={{
                email: usuario.correoElectronico,
                telefono: usuario.numeroTelefono,
                direccion: usuario.direccion,
              }}
              datosAdicionales={{
                nacimiento: new Date(
                  usuario.fechaNacimiento
                ).toLocaleDateString("es-MX"),
                genero: usuario.genero,
              }}
              estadoUsuario={{
                label: usuario.estatus === 1 ? "Activo" : "Inactivo",
                color: "primary",
                shape: "circular",
                backgroundColor: "rgba(24, 50, 165, 1)",
              }}
              opcionesRol={[
                { value: "Administrador", label: "Administrador" },
                { value: "Supervisor", label: "Supervisor" },
                { value: "Usuario", label: "Usuario" },
              ]}
            />
          ) : (
            <p>No se encontró información del usuario.</p>
          )}
        </ModalFlotante>
      )}
    </>
  );
};

export default PaginaDetalleUsuario;