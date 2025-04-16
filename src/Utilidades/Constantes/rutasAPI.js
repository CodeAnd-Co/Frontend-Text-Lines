const BASE_URL = import.meta.env.VITE_API_URL;

export const RUTAS_API = {
  USUARIOS: {
    BASE: `${BASE_URL}/usuarios`,
    CONSULTAR_USUARIO: (id) => `${BASE_URL}/usuarios/${id}`,
  },
};
