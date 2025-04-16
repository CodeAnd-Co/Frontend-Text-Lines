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
