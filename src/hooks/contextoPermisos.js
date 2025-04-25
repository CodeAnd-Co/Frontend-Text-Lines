export const usePermisos = () => {
    const { permisos } = useContext(AuthContext); 
  
    const tienePermiso = (permiso) => permisos?.includes(permiso);
  
    return { tienePermiso };
  };
  