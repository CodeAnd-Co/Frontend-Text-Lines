import { useState } from "react";
import LogoImagen from "../componentes/moleculas/logoImagen";
import ContenedorFondo from "../plantillas/global/contenedorFondo";
import PlantillaTarjeta from "../plantillas/global/plantillaTarjeta";
import FormaLogin from "../componentes/organismos/formaLogin";
import useInicioSesion from "../../hooks/useInicioSesion";

export default function PaginaInicioSesion() {
  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const { iniciarSesion, mensaje } = useInicioSesion();

  const handleInicioSesion = async (event) => {
    event.preventDefault();
    await iniciarSesion({ correo, contrasenia });
  };

  return (
    <ContenedorFondo>
      <PlantillaTarjeta title={"Iniciar Sesión"}>
        <LogoImagen logoSrc='/logoAltertexLogin.svg' altText='Logo de la app' />
        <FormaLogin
          correo={correo}
          setCorreo={setCorreo}
          contrasenia={contrasenia}
          setContrasenia={setContrasenia}
          mensaje={mensaje}
          handleInicioSesion={handleInicioSesion}
        />
      </PlantillaTarjeta>
    </ContenedorFondo>
  );
}
