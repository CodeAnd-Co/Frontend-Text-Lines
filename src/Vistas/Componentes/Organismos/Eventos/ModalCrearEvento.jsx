// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import { useState, useEffect } from 'react';
import FormularioCrearEvento from '@Organismos/Formularios/FormularioCrearEvento';
import ModalFlotante from '@Organismos/ModalFlotante';

/**
 * Modal para crear un nuevo set de cuotas.
 *
 * @param {boolean} abierto - Controla si el modal está abierto o cerrado
 * @param {function} onCerrar - Función callback que se ejecuta al cerrar el modal
 * @param {function} onCreado - Función callback que se ejecuta cuando se crea exitosamente el evento
 */
const ModalCrearEvento = ({ abierto = false, onCerrar, onCreado }) => {
  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [puntosEvento, setPuntosEvento] = useState('');
  const [multiplicadorEvento, setMultiplicadorEvento] = useState('');
  const [periodoEvento, setPeriodoEvento] = useState('');
  const [renovacionEvento, setRenovacionEvento] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(null);

  // Limpiar los campos cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      setNombreEvento('');
      setDescripcionEvento('');
      setPuntosEvento('');
      setMultiplicadorEvento('');
      setPeriodoEvento('');
      setRenovacionEvento('');
      setMostrarAlerta(false);
    }
  }, [abierto]);

  const handleConfirmar = () => {
    // Validar que el nombre y los puntos sean válidos
    // y que los puntos y multiplicador sean mayores a 0
    if (!nombreEvento.trim() || !puntosEvento.trim() || !multiplicadorEvento.trim() || !renovacionEvento) {
      setMostrarAlerta(true);
      return;
    }

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
