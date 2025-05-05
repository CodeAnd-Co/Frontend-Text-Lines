import { Height } from '@mui/icons-material';
import Alerta from '@SRC/Vistas/Componentes/Moleculas/Alerta';

export default {
  title: 'Componentes/Moléculas/Alerta',
  component: Alerta,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    tipo: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error'],
    },
    mensaje: { control: 'text' },
    icono: { control: 'boolean' },
    iconoNombre: {
      control: 'text',
      description: 'Nombre personalizado del ícono (opcional)',
    },
    textoVariant: {
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'caption',
        'overline',
        'button',
        'inherit',
      ],
    },
    textoColor: { control: 'color' },
    cerrable: {
      control: 'boolean',
      description: 'Permite cerrar manualmente la alerta',
    },
    duracion: {
      control: 'number',
      description: 'Duración en milisegundos antes de que se oculte automáticamente',
    },
    posicionAbsoluta: {
      control: 'boolean',
      description: 'Renderiza la alerta con posición absoluta',
    },
    onClose: {
      action: 'cerrado',
      description: 'Callback cuando la alerta se cierra',
    },
    centradoInferior: {
      control: 'boolean',
      description: 'Muestra la alerta flotante, centrada horizontalmente al fondo de la pantalla',
    },
  },
  args: {
    tipo: 'info',
    mensaje: 'Este es un mensaje de alerta informativa.',
    icono: true,
    textoVariant: 'body1',
    cerrable: false,
    posicionAbsoluta: false,
  },
};

export const Informacion = {
  args: {
    tipo: 'info',
    mensaje: 'Esta es una alerta de tipo información.',
  },
};

export const Exito = {
  args: {
    tipo: 'success',
    mensaje: '¡Operación exitosa!',
  },
};

export const Advertencia = {
  args: {
    tipo: 'warning',
    mensaje: 'Cuidado, algo puede estar mal.',
  },
};

export const Error = {
  args: {
    tipo: 'error',
    mensaje: 'Ocurrió un error al procesar tu solicitud.',
  },
};

export const SinIcono = {
  args: {
    tipo: 'warning',
    mensaje: 'Esta alerta no tiene ícono.',
    icono: false,
  },
};

export const IconoPersonalizado = {
  args: {
    tipo: 'info',
    mensaje: 'Este usa un ícono personalizado.',
    iconoNombre: 'Lightbulb',
  },
};

export const Cerrable = {
  args: {
    tipo: 'error',
    mensaje: 'Haz clic en la X para cerrar esta alerta.',
    cerrable: true,
  },
};

export const CierreAutomatico = {
  args: {
    tipo: 'success',
    mensaje: 'Esta alerta se cerrará automáticamente.',
    duracion: 3000,
  },
};

export const PosicionAbsoluta = {
  args: {
    tipo: 'warning',
    mensaje: 'Esta alerta está posicionada de forma absoluta.',
    posicionAbsoluta: true,
    sx: {
      top: 20,
      right: 20,
      width: '200px',
    },
  },
};
export const CentradoInferior = {
  args: {
    tipo: 'success',
    mensaje: 'Alerta centrada al inferior de la pantalla',
    centradoInferior: true,
  },
};
