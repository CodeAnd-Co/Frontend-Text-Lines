import { useState } from 'react';
import { Box } from '@mui/material';
import ModalFlotante from '../../organismos/ModalFlotante';
import FormularioProveedor from './FormularioProveedor';
import FormularioProducto from './FormularioProducto';
import FormularioVarianteOpcion from './FormularioVarianteOpcion';

const FormularioCrearProducto = ({ open, onClose }) => {
  const [step, setStep] = useState(0);
  const [proveedor, setProveedor] = useState({
    nombre: '',
    nombreCompania: '',
    telefonoContacto: '',
    direccion: '',
    codigoPostal: '',
    pais: '',
    estado: 1,
  });
  const [producto, setProducto] = useState({
    nombreComun: '',
    nombreComercial: '',
    descripcion: '',
    marca: '',
    modelo: '',
    tipoProducto: '',
    precioPuntos: 0.0,
    precioCliente: 0.0,
    precioVenta: 0.0,
    costo: 0.0,
    impuesto: 0.0,
    descuento: 0.0,
    estado: 1,
    envio: 1,
  });
  const [variantes, setVariantes] = useState([
    {
      nombreVariante: '',
      descripcion: '',
      opciones: [],
    },
  ]);
  const [imagenes, setImagenes] = useState({
    imagenProducto: null,
    imagenesVariante: [],
  });

  const estados = [
    { value: 1, label: 'Activo' },
    { value: 0, label: 'Inactivo' },
  ];

  const envios = [
    { value: 1, label: 'Sí' },
    { value: 0, label: 'No' },
  ];

  const manejarSiguiente = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const manejarAtras = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const manejarConfirmacion = async () => {
    // Lógica para enviar los datos del formulario al backend
  };

  return (
    <ModalFlotante
      open={open}
      onClose={step > 0 ? manejarAtras : onClose}
      titulo={
        step === 0
          ? 'Datos del Proveedor'
          : step === 1
          ? 'Datos del Producto'
          : 'Variantes y Opciones'
      }
      onConfirm={step === 2 ? manejarConfirmacion : manejarSiguiente}
      confirmLabel={step === 2 ? 'Confirmar' : 'Siguiente'}
      cancelLabel={step > 0 ? 'Atrás' : 'Cerrar'}
    >
      <Box
        component='form'
        sx={{
          flexGrow: 1,
          '& .MuiTextField-root': { margin: 1, width: '30ch' },
          '& .MuiFormControl-root': { margin: 1, minWidth: '30ch' },
          mt: 2,
          mb: 2,
        }}
        noValidate
        autoComplete='off'
      >
        {step === 0 && <FormularioProveedor proveedor={proveedor} setProveedor={setProveedor} />}

        {step === 1 && (
          <FormularioProducto
            producto={producto}
            setProducto={setProducto}
            estados={estados}
            envios={envios}
            imagenes={imagenes}
            setImagenes={setImagenes}
          />
        )}

        {step === 2 && (
          <FormularioVarianteOpcion
            variantes={variantes}
            setVariantes={setVariantes}
            estados={estados}
            imagenes={imagenes}
            setImagenes={setImagenes}
          />
        )}
      </Box>
    </ModalFlotante>
  );
};

export default FormularioCrearProducto;
