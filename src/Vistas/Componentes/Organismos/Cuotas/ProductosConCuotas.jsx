import TarjetaBasica from '@Moleculas/TarjetaBasica';
import { NumeroInput } from '@Atomos/NumeroInput';
import { Box } from '@mui/material';

const ProductosConCuotas = ({ productos, manejarCambioCuota }) => {
  return (
    <div>
      {productos.map((producto) => (
        <TarjetaBasica key={producto.id} tituloPrincipal={'Producto'} sx={{ margin: 3 }}>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <div>
              <h3>{producto.nombreProducto}</h3>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              <h4>Cuota:</h4>
              <NumeroInput
                value={producto.cuota} // Aquí puedes pasar el valor de la cuota si lo manejas
                onChange={(evento) => manejarCambioCuota(producto.id, evento.target.value)}
                min={0}
                width={120}
                style={{ marginLeft: '10px' }} // Añade un margen para separación
              />
            </div>
          </Box>
        </TarjetaBasica>
      ))}
    </div>
  );
};

export default ProductosConCuotas;
