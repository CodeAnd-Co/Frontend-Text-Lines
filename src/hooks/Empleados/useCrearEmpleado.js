// RF16 - Crear Empleado - https://codeandco-wiki.netlify.app/docs/proyectos/textiles/documentacion/requisitos/rf16/

import { useState } from 'react';
import crearEmpleado from '@Repositorios/Empleados/RepositorioCrearEmpleado';
import { validarDatosCrearEmpleado } from '@Modelos/Empleados/CrearEmpleado';
import { useConsultarEmpleados } from '@Hooks/Empleados/useConsultarEmpleados';

export const useCrearEmpleado = () => {
  const { empleados } = useConsultarEmpleados();
  const [errores, setErrores] = useState([]);

  const handleGuardarEmpleado = async (datosEmpleado) => {
    const erroresValidacion = validarDatosCrearEmpleado(datosEmpleado, empleados);
    setErrores(erroresValidacion);
    if (Object.keys(erroresValidacion).length > 0) return { exito: false };

    const datosParaEnviar = {
      nombreCompleto: `${datosUsuario.nombreCompleto} ${datosUsuario.apellido}`,
      correoElectronico: datosUsuario.correoElectronico,
      contrasenia: datosUsuario.contrasenia,
      numeroTelefono: datosUsuario.numeroTelefono,
      direccion: datosUsuario.direccion,
      fechaNacimiento: datosUsuario.fechaNacimiento
        ? datosUsuario.fechaNacimiento.format('YYYY-MM-DD')
        : null,
      genero: datosUsuario.genero,
      estatus: true,
      idRol: datosUsuario.rol,
      idCliente: datosUsuario.cliente,

      numeroEmergencia: datosEmpleado.numeroEmergencia,
      areaTrabajo: datosEmpleado.areaTrabajo,
      posicion: datosEmpleado.posicion,
      cantidadPuntos: datosEmpleado.cantidadPuntos,
      antiguedad: datosEmpleado.antiguedad,
    };

    try {
      await crearEmpleado(datosParaEnviar);
      return { exito: true, mensaje: 'Empleado creado correctamente' };
    } catch (error) {
      const mensaje =
        error.response?.data?.mensaje ||
        'Hubo un error al crear el empleado. Verifica que no exista.';
      return { exito: false, mensaje };
    }
  };

  return {
    errores,
    handleGuardarEmpleado,
  };
};
