import { useState } from "react";
import { Button, Modal, Box, Paper } from "@mui/material";
import FormularioCrearUsuario from "../componentes/organismos/formularioCrearUsuario";
import Stack from "@mui/material/Stack";

export default function Usuarios() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          <FormularioCrearUsuario />

          <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            marginTop={2}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="contained">Guardar</Button>
          </Stack>
        </Paper>
      </Modal>
    </div>
  );
}
