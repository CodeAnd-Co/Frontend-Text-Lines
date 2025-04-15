import { useLocation } from "react-router-dom";

// Layout component that conditionally renders the sidebar
const RutasSistemaAdministrativo = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {!isLoginPage && <BarraLateral />}
      <main className={`content ${isLoginPage ? "full-width" : ""}`}>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route
            path="/inicio"
            element={
              <RutaProtegida>
                <Inicio />
              </RutaProtegida>
            }
          />
          <Route path="/login" element={<PaginaInicioSesion />} />
          <Route
            path="/empleados"
            element={
              <RutaProtegida>
                <Empleados />
              </RutaProtegida>
            }
          />
          <Route
            path="/grupoEmpleados"
            element={
              <RutaProtegida>
                <GrupoEmpleados />
              </RutaProtegida>
            }
          />
          <Route
            path="/productos"
            element={
              <RutaProtegida>
                <Productos />
              </RutaProtegida>
            }
          />
          <Route
            path="/categorias"
            element={
              <RutaProtegida
                permisosPermitidos={["Leer Categoría de Productos"]}
              >
                <Categorias />
              </RutaProtegida>
            }
          />
          <Route
            path="/setsProductos"
            element={
              <RutaProtegida>
                <SetsDeProductos />
              </RutaProtegida>
            }
          />
          <Route
            path="/pedidos"
            element={
              <RutaProtegida>
                <Pedidos />
              </RutaProtegida>
            }
          />
          <Route
            path="/cuotas"
            element={
              <RutaProtegida>
                <Cuotas />
              </RutaProtegida>
            }
          />
          <Route
            path="/eventos"
            element={
              <RutaProtegida>
                <Eventos />
              </RutaProtegida>
            }
          />
          <Route
            path="/configuracion"
            element={
              <RutaProtegida>
                <Configuracion />
              </RutaProtegida>
            }
          />
          <Route path="/tienda" element={<Tienda></Tienda>} />
        </Routes>
      </main>
    </div>
  );
};
