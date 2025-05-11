//RF[26] Crea Producto - [https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/RF26]
import { useState } from 'react';
import { RepositorioCrearProveedor } from '@Repositorios/Proveedores/RepositorioCrearProveedor';
import { validarProveedor } from '@Utilidades/Validaciones/validarProveedor';

export const useCrearProveedor = () => {
  const [errores, setErrores] = useState({});

  const manejarGuardarProveeodor = async (datosProveedor) => {
    console.log(datosProveedor);
    const erroresValidacion = validarProveedor(datosProveedor);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return { exito: false };
    try {
      await RepositorioCrearProveedor.crearProveedor(datosProveedor);
      return { exito: true, mensaje: 'Proveedor creado correctamente' };
    } catch (error) {
      console.log(error);
      const mensaje = error.response?.data?.mensaje || 'Hubo un error al crear el proveedor.';
      return { exito: false, mensaje };
    }
  };

  return {
    errores,
    manejarGuardarProveeodor,
  };
};
