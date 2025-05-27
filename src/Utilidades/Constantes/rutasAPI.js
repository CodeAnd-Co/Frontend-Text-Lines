const BASE_URL = import.meta.env.VITE_API_URL;
const BASE_USUARIOS = `${BASE_URL}/api/usuarios`;
const BASE_CATEGORIAS = `${BASE_URL}/api/categorias`;
const BASE_PRODUCTOS = `${BASE_URL}/api/productos`;
const BASE_PROVEEDORES = `${BASE_URL}/api/proveedores`;
const BASE_SETS_PRODUCTOS = `${BASE_URL}/api/sets-productos`;
const BASE_CLIENTES = `${BASE_URL}/api/clientes`;
const BASE_EMPLEADOS = `${BASE_URL}/api/empleados`;
const BASE_CUOTAS = `${BASE_URL}/api/cuotas`;
const BASE_ROLES = `${BASE_URL}/api/roles`;
const BASE_PEDIDOS = `${BASE_URL}/api/pedidos`;
const BASE_EVENTOS = `${BASE_URL}/api/eventos`;
const BASE_PAGOS = `${BASE_URL}/api/pagos`;
const BASE_AUTENTICACION = `${BASE_URL}/api/autenticacion`;


export const RUTAS_API = {
  USUARIOS: {
    BASE: BASE_USUARIOS,
    CONSULTAR_LISTA: `${BASE_USUARIOS}/consultar-lista-usuarios`,
    CONSULTAR_USUARIO: `${BASE_USUARIOS}/consultar-usuario`,
    ELIMINAR_USUARIOS: `${BASE_USUARIOS}/eliminar-usuarios`,
  },

  AUTENTICACION: {
    BASE: BASE_AUTENTICACION,
    ACTIVAR_2FA: `${BASE_AUTENTICACION}/activar-2fa`,
    VERIFICAR_2FA: `${BASE_AUTENTICACION}/verificar-2fa`,
  },
  
  CATEGORIAS: {
    BASE: BASE_CATEGORIAS,
    CONSULTAR_LISTA: `${BASE_CATEGORIAS}/consultar-lista-categorias`,
    CREAR: `${BASE_CATEGORIAS}/crear-categoria`,
    ELIMINAR_CATEGORIA: `${BASE_CATEGORIAS}/eliminar`,
    LEER: `${BASE_CATEGORIAS}/leer`,
  },
  PRODUCTOS: {
    BASE: BASE_PRODUCTOS,
    CONSULTAR_LISTA: `${BASE_PRODUCTOS}/consultar-lista`,
    CREAR: `${BASE_PRODUCTOS}/crear`,
    ELIMINAR_PRODUCTO: `${BASE_PRODUCTOS}/eliminar`,
  },
  PROVEEDORES: {
    BASE: BASE_PROVEEDORES,
    CONSULTAR_LISTA: `${BASE_PROVEEDORES}/consultar-lista`,
    CREAR: `${BASE_PROVEEDORES}/crear`,
  },
  SETS_PRODUCTOS: {
    BASE: BASE_SETS_PRODUCTOS,
    CONSULTAR_LISTA: `${BASE_SETS_PRODUCTOS}/consultar-lista`,
    ELIMINAR_SET_PRODUCTOS: `${BASE_SETS_PRODUCTOS}/eliminar`,
  },
  CLIENTES: {
    BASE: BASE_CLIENTES,
    CONSULTAR_LISTA: `${BASE_CLIENTES}/consultar-lista`,
    CONSULTAR_SISTEMA: `${BASE_CLIENTES}/consultar-sistema`,
    ELIMINAR_CLIENTE: `${BASE_CLIENTES}/eliminar`,
    CONSULTAR_CLIENTE: `${BASE_CLIENTES}/consultar-cliente`,
    ACTUALIZAR_CLIENTE: `${BASE_CLIENTES}/actualizar-cliente`,
    CREAR_CLIENTE: `${BASE_CLIENTES}/crear-cliente`,
  },
  EMPLEADOS: {
    BASE: BASE_EMPLEADOS,
    CONSULTAR_LISTA: `${BASE_EMPLEADOS}/consultar-lista`,
    CONSULTAR_GRUPOS: `${BASE_EMPLEADOS}/consultar-grupo`,
    ELIMINAR_EMPLEADO: `${BASE_EMPLEADOS}/eliminar`,
    ELIMINAR_GRUPO: `${BASE_EMPLEADOS}/eliminar-grupo`,
    IMPORTAR_EMPLEADOS: `${BASE_EMPLEADOS}/importar-empleados`,
    LEER_GRUPO: `${BASE_EMPLEADOS}/leer-grupo`,
    CREAR_GRUPO: `${BASE_EMPLEADOS}/crear-grupo`,
    ACTUALIZAR_EMPLEADO: `${BASE_EMPLEADOS}/actualizar`,
  },
  CUOTAS: {
    BASE: BASE_CUOTAS,
    CREAR_CUOTA: `${BASE_CUOTAS}/crear-cuota`,
    CONSULTAR_LISTA: `${BASE_CUOTAS}/consultar-lista`,
    ELIMINAR_SET_CUOTAS: `${BASE_CUOTAS}/eliminar-set-cuotas`,
  },
  ROLES: {
    BASE: BASE_ROLES,
    CONSULTAR_LISTA: `${BASE_ROLES}/consultar-lista`,
    CREAR_ROL: `${BASE_ROLES}/crear-rol`,
    ELIMINAR_ROL: `${BASE_ROLES}/eliminar`,
    LEER_ROL: `${BASE_ROLES}/leer`
  },
  PEDIDOS: {
    BASE: BASE_PEDIDOS,
    CONSULTAR_LISTA: `${BASE_PEDIDOS}/consultar-lista`,
    ELIMINAR_PEDIDO: `${BASE_PEDIDOS}/eliminar`,
  },
  EVENTOS: {
    BASE: BASE_EVENTOS,
    CONSULTAR_LISTA: `${BASE_EVENTOS}/consultar-lista-eventos`,
    ELIMINAR_EVENTO: `${BASE_EVENTOS}/eliminar`,
    CONSULTAR_EVENTO: `${BASE_EVENTOS}/consultar-evento`,
  },
  PAGOS: {
    BASE: BASE_PAGOS,
    CONSULTAR_LISTA: `${BASE_PAGOS}/consultar-lista`,
    ACTUALIZAR_LISTA: `${BASE_PAGOS}/actualizar`,
  },
};
