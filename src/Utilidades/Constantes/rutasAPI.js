const BASE_URL = import.meta.env.VITE_API_URL;

export const RUTAS_API = {
  USUARIOS: {
    BASE: `${BASE_URL}/usuarios`,
    CONSULTAR_USUARIO: (id) => `${BASE_URL}/usuarios/${id}`,
  },
  ROLES: {
    BASE: `${BASE_URL}/api/roles`,
    CONSULTAR_LISTA: `${BASE_URL}/api/roles/consultar-lista`,
  },
};
