// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormularioCrearEvento from '@Organismos/Formularios/FormularioCrearEvento';
import ModalFlotante from '@Organismos/ModalFlotante';
import { RUTAS } from '@Constantes/rutas';

/**
 * Modal para crear un nuevo set de cuotas.
 *
 * @param {boolean} abierto - Controla si el modal está abierto o cerrado
 * @param {function} onCerrar - Función callback que se ejecuta al cerrar el modal
 * @param {function} onCreado - Función callback que se ejecuta cuando se crea exitosamente el evento
 */
const ModalCrearEvento = ({ abierto = false, onCerrar, onCreado }) => {
  const navegar = useNavigate();
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [puntosEvento, setPuntosEvento] = useState(0);
  const [multiplicadorEvento, setMultiplicadorEvento] = useState(0);
  const [periodoEvento, setPeriodoEvento] = useState('');
  const [renovacionEvento, setRenovacionEvento] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  // Limpiar los campos cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      setNombreEvento('');
      setDescripcionEvento('');
      setPuntosEvento(0);
      setMultiplicadorEvento(0);
      setPeriodoEvento('');
      setRenovacionEvento(false);
      setMostrarAlerta(false);
    }
  }, [abierto]);

  const handleConfirmar = () => {
    // Validar que el nombre y descripción no estén vacíos después de eliminar espacios
    // y que haya al menos un producto seleccionado
    if (!nombreEvento.trim() || puntosEvento <= 0 || multiplicadorEvento <= 0) {
      setMostrarAlerta(true);
      return;
    }

    // Navegar a la siguiente página con datos limpios (sin espacios innecesarios)
    navegar(
      `${RUTAS.SISTEMA_ADMINISTRATIVO.BASE_TABLERO}${RUTAS.SISTEMA_ADMINISTRATIVO.CUOTAS.EDITAR_CUOTAS}`,
      {
        state: {
          nombreEvento: nombreEvento.trim(),
          descripcion: descripcionEvento.trim(),
        },
      }
    );

    // Notificar que se ha creado exitosamente
    if (onCreado) {
      onCreado();
    }
  };

  // Manejar el cierre del modal
  const handleCerrar = () => {
    if (onCerrar) {
      onCerrar();
    }
  };

  // Si el componente se usa como modal controlado externamente
  return (
    <ModalFlotante
      open={abierto}
      onClose={handleCerrar}
      onConfirm={handleConfirmar}
      titulo='Agregar Evento'
      cancelLabel='Cancelar'
      confirmLabel='Crear'
    >
      <FormularioCrearEvento
        nombreEvento={nombreEvento}
        setNombreEvento={setNombreEvento}
        descripcionEvento={descripcionEvento}
        setDescripcionEvento={setDescripcionEvento}
        puntosEvento={puntosEvento}
        setPuntosEvento={setPuntosEvento}
        multiplicadorEvento={multiplicadorEvento}
        setMultiplicadorEvento={setMultiplicadorEvento}
        periodoEvento={periodoEvento}
        setPeriodoEvento={setPeriodoEvento}
        renovacionEvento={renovacionEvento}
        setRenovacionEvento={setRenovacionEvento}
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
    </ModalFlotante>
  );
};

export default ModalCrearEvento;
