import {useState} from 'react';
import {crearGrupoEmpleados} from '@Repositorios/Empleados/RepositorioCrearGrupoEmpleado';
import {validarDatosCrearGrupoEmpleado} from '@Modelos/Empleados/modeloCrearGrupoEmpleado';
import {useConsultarGrupos} from '@Hooks/Empleados/useConsultarGrupos';


export const useCrearGrupoEmpleados = () => {
    const {grupos} = useConsultarGrupos();
    const [errores, setErrores] = useState({});

    const handleGuardarGrupoEmpleados = async (datosGrupo) => {
        const erroresValidacion = validarDatosCrearGrupoEmpleado(datosGrupo, grupos);
        setErrores(erroresValidacion);
        if (Object.keys(erroresValidacion).length > 0) return { exito: false };
        
        const datosParaEnviar = {
            nombreGrupo: datosGrupo.nombreGrupo,
            descripcion: datosGrupo.descripcion,
            listaEmpleados: datosGrupo.listaEmpleados.map(emp => emp.idEmpleado ?? emp.id),      
          };

        try {
            await crearGrupoEmpleados(datosParaEnviar);
            return {exito: true, mensaje: 'Grupo creado correctamente'};
        } catch (error) {
            const mensaje 
             = error.response?.data?.mensaje 
             || 'Error al crear el grupo';
            return { exito: false, mensaje};
        }
    };

    return {errores, handleGuardarGrupoEmpleados,
    };
}
