// RF36 - Crear Evento - [https://codeandco-wiki.netlify.app/docs/next/proyectos/textiles/documentacion/requisitos/RF36]

import { useState, useEffect } from 'react';
import FormularioCrearEvento from '@Organismos/Formularios/FormularioCrearEvento';
import ModalFlotante from '@Organismos/ModalFlotante';
import { Evento } from '@SRC/Dominio/Modelos/Eventos/Eventos';
import { useAuth } from '@SRC/hooks/AuthProvider';

/**
 * Modal para crear un nuevo set de cuotas.
 *
 * @param {boolean} abierto - Controla si el modal está abierto o cerrado
 * @param {function} onCerrar - Función callback que se ejecuta al cerrar el modal
 * @param {function} onCreado - Función callback que se ejecuta cuando se crea exitosamente el evento
 */
const ModalCrearEvento = ({ abierto = false, onCerrar, onCreado }) => {
  const { usuario } = useAuth();
  const clienteSeleccionado = usuario.clienteSeleccionado;

  const [nombreEvento, setNombreEvento] = useState('');
  const [descripcionEvento, setDescripcionEvento] = useState('');
  const [puntosEvento, setPuntosEvento] = useState('');
  const [multiplicadorEvento, setMultiplicadorEvento] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const [nombreError, setNombreError] = useState(false);
  const [descripcionError, setDescripcionError] = useState(false);
  const [puntosError, setPuntosError] = useState(false);
  const [multiplicadorError, setMultiplicadorError] = useState(false);

  const resetearCampos = () => {
    setNombreEvento('');
    setDescripcionEvento('');
    setPuntosEvento('');
    setMultiplicadorEvento('');
    setMostrarAlerta(false);
  };

  const limpiarErrores = () => {
    setNombreError(false);
    setDescripcionError(false);
    setPuntosError(false);
    setMultiplicadorError(false);
  };

  const validarCampos = () => {
    let errores = false;

    if (!nombreEvento.trim()) {
      setNombreError(true);
      setMostrarAlerta(true);
      errores = true;
    }

    if (puntosEvento === '' || puntosEvento < 0) {
      setPuntosError(true);
      setMostrarAlerta(true);
      errores = true;
    }

    if (multiplicadorEvento === '' || multiplicadorEvento < 0) {
      setMultiplicadorError(true);
      setMostrarAlerta(true);
      errores = true;
    }

    return errores;
  }

  // Limpiar los campos cuando se cierra el modal
  useEffect(() => {
    if (!abierto) {
      resetearCampos();
      limpiarErrores();
    }
  }, [abierto]);

  const handleConfirmar = () => {
    // Limpiar errores
    limpiarErrores();
    setMostrarAlerta(false);

    // Validar campos
    if (validarCampos()) {
      return;
    }

    // Crear el evento con los datos limpios (sin espacios innecesarios)
    const nuevoEvento = new Evento({
      idCliente: clienteSeleccionado,
      nombre: nombreEvento.trim(),
      descripcion: descripcionEvento.trim(),
      puntos: parseFloat(puntosEvento),
      multiplicador: parseFloat(multiplicadorEvento),
      periodoRenovacion: "Mensual",
      renovacion: false
    });

    // Notificar que se ha creado exitosamente
    if (onCreado) {
      onCreado(nuevoEvento);
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
        nombreError={nombreError}
        descripcionEvento={descripcionEvento}
        setDescripcionEvento={setDescripcionEvento}
        descripcionError={descripcionError}
        puntosEvento={puntosEvento}
        setPuntosEvento={setPuntosEvento}
        puntosError={puntosError}
        multiplicadorEvento={multiplicadorEvento}
        setMultiplicadorEvento={setMultiplicadorEvento}
        multiplicadorError={multiplicadorError}
        mostrarAlerta={mostrarAlerta}
        setMostrarAlerta={setMostrarAlerta}
      />
    </ModalFlotante>
  );
};

export default ModalCrearEvento;
