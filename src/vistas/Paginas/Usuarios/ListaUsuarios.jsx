//RF02 Super Administrador Consulta Lista de Usuarios - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF2

import { Button } from '@mui/material';
import ModalFlotante from '../../componentes/organismos/ModalFlotante';
import FormularioCrearUsuario from '../../componentes/organismos/FormularioCrearUsuario';
import { useCrearUsuario } from '../../../hooks/useCrearUsuario';
import Alerta from '../../componentes/moleculas/Alerta';
import { useState } from 'react';
import CustomDataGrid from '../../componentes/organismos/dataGrid';
import { useConsultarListaUsuarios } from '../../../hooks/Usuarios/useConsultarListaUsuarios';
import Chip from '../../componentes/atomos/Chip';
import { useUsuarioId } from '../../../hooks/Usuarios/useLeerUsuario';
import InfoUsuario from '../../componentes/moleculas/UsuarioInfo';

const ListaUsuarios = () => {
  const {
    open,
    datosUsuario,
    errores,
    setDatosUsuario,
    handleOpen,
    handleClose,
    handleGuardarUsuario,
  } = useCrearUsuario();

  const [alerta, setAlerta] = useState(null);
  const [idUsuarioSeleccionado, setIdUsuarioSeleccionado] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);

  const { usuarios, cargando, error } = useConsultarListaUsuarios();
  const { usuario, mensaje, cargando: cargandoDetalle, error: errorDetalle } =
    useUsuarioId(modalDetalleAbierto ? idUsuarioSeleccionado : null);

  const handleConfirm = async () => {
    const resultado = await handleGuardarUsuario();

    if (resultado?.mensaje) {
      setAlerta({
        tipo: resultado.exito ? 'success' : 'error',
        mensaje: resultado.mensaje,
      });
    }
  };

  const columns = [
    { field: 'idUsuario', headerName: 'ID Usuario', flex: 1 },
    { field: 'nombre', headerName: 'Nombre', flex: 1 },
    { field: 'rol', headerName: 'Rol', flex: 1 },
    {
      field: 'cliente',
      headerName: 'Cliente',
      flex: 1,
      renderCell: (params) => {
        const isSuspendido = params.row.estatus === 0;

        return (
          <Chip
            label={isSuspendido ? 'Suspendido' : params.value || 'N/A'}
            variant='filled'
            size='medium'
            shape='circular'
            backgroundColor={isSuspendido ? '#ffa726' : '#f0f0f0'} // naranja o gris claro
            textColor={isSuspendido ? '#ffffff' : '#000000'}
          />
        );
      },
    },
    { field: 'correo', headerName: 'Correo electrónico', flex: 1 },
    { field: 'telefono', headerName: 'Telefono', flex: 1 },
  ];

  const rows = [
    ...new Map(
      usuarios.map((usuario) => [
        usuario.idUsuario,
        {
          id: usuario.idUsuario,
          idUsuario: usuario.idUsuario,
          nombre: usuario.nombre,
          rol: usuario.rol?.nombre || 'Sin rol',
          cliente: usuario.cliente,
          estatus: usuario.estatus,
          correo: usuario.correo,
          telefono: usuario.telefono,
        },
      ])
    ).values(),
  ];

  return (
    <div>
      <h1>Usuarios</h1>

      {alerta && (
        <Alerta
          tipo={alerta.tipo}
          mensaje={alerta.mensaje}
          cerrable
          duracion={4000}
          onClose={() => setAlerta(null)}
        />
      )}

      <Button variant='contained' color='primary' onClick={handleOpen}>
        Añadir Usuario
      </Button>

      <ModalFlotante
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirm}
        titulo='Crear nuevo usuario'
      >
        <FormularioCrearUsuario
          datosUsuario={datosUsuario}
          setDatosUsuario={setDatosUsuario}
          errores={errores}
        />
      </ModalFlotante>

      <div style={{ marginTop: 20, height: 650, width: '100%' }}>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <CustomDataGrid
          columns={columns}
          rows={rows}
          loading={cargando}
          pageSize={10}
          onRowClick={(params) => {
            setIdUsuarioSeleccionado(params.row.idUsuario);
            setModalDetalleAbierto(true);
          }}
        />
      </div>

      {modalDetalleAbierto && (
        <ModalFlotante
          open={modalDetalleAbierto}
          onClose={() => setModalDetalleAbierto(false)}
          onConfirm={() => setModalDetalleAbierto(false)}
          titulo={usuario?.nombreCompleto || "Cargando..."}
          tituloVariant="h4"
          botones={[
            {
              label: "EDITAR",
              variant: "contained",
              color: "primary",
              onClick: () => console.log("Editar usuario"),
              disabled: !!errorDetalle,
            },
            {
              label: "SALIR",
              variant: "outlined",
              color: "primary",
              onClick: () => setModalDetalleAbierto(false),
            },
          ]}
        >
          {cargandoDetalle ? (
            <p>Cargando usuario...</p>
          ) : usuario ? (
            <InfoUsuario
              modoEdicion={false}
              cliente={
                usuario.clientes?.some((c) => c?.nombreCliente)
                  ? usuario.clientes
                      .filter((c) => c?.nombreCliente)
                      .map((c) => c.nombreCliente)
                      .join(", ")
                  : "Sin cliente asignado"
              }
              rol={usuario.rol}
              datosContacto={{
                email: usuario.correoElectronico,
                telefono: usuario.numeroTelefono,
                direccion: usuario.direccion,
              }}
              datosAdicionales={{
                nacimiento: new Date(usuario.fechaNacimiento).toLocaleDateString("es-MX"),
                genero: usuario.genero,
              }}
              estadoUsuario={{
                label: usuario.estatus === 1 ? "Activo" : "Inactivo",
                color: "primary",
                shape: "circular",
                backgroundColor: "rgba(24, 50, 165, 1)",
              }}
              opcionesRol={[
                { value: "Super Administrador", label: "Administrador" },
                { value: "Supervisor", label: "Supervisor" },
                { value: "Empleado", label: "Usuario" },
              ]}
            />
          ) : (
            <p>No se encontró información del usuario.</p>
          )}
        </ModalFlotante>
      )}

      {/* 🔔 Alerta fuera del modal */}
      {errorDetalle && (
        <div style={{ marginTop: "2rem" }}>
          <Alerta
            tipo="error"
            mensaje={errorDetalle}
            icono
            cerrable
            centradoInferior
          />
        </div>
      )}

    </div>
  );
};

export default ListaUsuarios;