import {useState} from 'react'
import {tokens} from '@SRC/theme'
import { Box, Grid, useTheme } from '@mui/material';
import Texto from '@Atomos/Texto.jsx';
import Chip from '@Atomos/Chip';
import Tabla from '@Organismos/Tabla';

const InfoProducto = ({detalleProducto, imagenProducto}) => {

  const tema = useTheme()
  const colores = tokens(tema.palette.mode)
  const [varianteSeleccionada, setVarianteSeleccionada] = useState(null);

  const chipClick = (variante) => {
    if (varianteSeleccionada?.idVariante === variante.idVariante) {
      setVarianteSeleccionada(null);
      return;
    }
    setVarianteSeleccionada(variante);
  };

  return <>
    <Grid container spacing={9} wrap='nowrap'>
      {/*Información General*/}
      <Grid >
        <Box sx={{maxWidth: '100%'}}>
          <Texto variant='subtitle1' sx={{fontWeight: 'bold', mb: 3}}>
            INFORMACIÓN GENERAL
          </Texto>
          {/*ID producto*/}
          <Texto gutterBottom sx={{mb: 1.5}} >
            ID Producto:{' '}
            <span style={{color: colores.altertex[3]}}>
              {detalleProducto?.idProducto || 'No disponible'}
            </span>
          </Texto>

          {/*Tipo de producto*/}
          <Texto gutterBottom sx={{mb:1.5}}>
            Tipo:{' '}
            <span style={{color: colores.altertex[3]}}>
              {detalleProducto?.tipoProducto || 'No disponible'}
            </span>
          </Texto>

          {/*Proveedor*/}
          <Texto gutterBottom sx={{mb: 1.5}}>
            Proveedor:{' '}
            <span style={{color:colores.altertex[3]}}>
              {detalleProducto?.nombreProveedor || 'No disponible'}
            </span>
          </Texto>

        </Box>
      </Grid>

      {/*Precios y costos*/}
      <Grid >
        <Box sx={{maxWidth: '100%'}}>
          <Texto variant='subtitle1' sx={{ fontWeight: 'bold', mb: 3 }}>
            PRECIOS Y COSTOS
          </Texto>
          {/*Costo*/}
          <Texto gutterBottom sx={{mb: 1.5}}>
            Costo:{' '}
            <span style={{color: colores.altertex[3]}}>
              ${detalleProducto?.costo || 'No disponible'}
            </span>
          </Texto>

          {/*Precio de venta*/}
          <Texto gutterBottom sx={{mb: 1.5}}>
            Precio de Venta:{' '}
            <span style={{color:colores.altertex[3]}}>
              ${detalleProducto?.precioVenta || 'No disponible'}
            </span>
          </Texto>

          {/*Precio cliente*/}
          <Texto gutterBottom sx={{mb: 1.5}}>
            Precio Cliente:{' '}
            <span style={{color:colores.altertex[3]}}>
              ${detalleProducto?.precioCliente || 'No disponible'}
            </span>
          </Texto>

          {/*Precio en puntos*/}
          <Texto gutterBottom sx={{mb: 1.5}}>
            Precio en puntos:{' '}
            <span style={{color:colores.altertex[3]}}>
              {detalleProducto?.precioPuntos || 'No disponible'}
            </span>
          </Texto>

        </Box>

      </Grid>

      <Grid>
        <Box sx={{maxWidth: '100%'}} >
          <Texto variant={'subtitle1'} sx={{fontWeight: 'bold', mb: 3}} >
            IMAGEN DEL PRODUCTO
          </Texto>
          <img src={imagenProducto} width={200} height={200}/>
        </Box>
      </Grid>

    </Grid>

    <Texto variant='subtitle1' sx={{fontWeight: 'bold', mb: 3}}>
      VARIANTES
    </Texto>

    <Box display='flex' gap={1} flexWrap='wrap' mb={4}>
      {detalleProducto?.variantes && detalleProducto.variantes.length > 0 ? (
        detalleProducto.variantes.map((variante) => {
          const esSeleccionada = varianteSeleccionada?.idVariante === variante.idVariante;

          return (
            <Chip
              key={variante.idVariante}
              label={variante.nombreVariante}
              sx={{
                borderRadius: '16px',
                backgroundColor: esSeleccionada
                  ? colores.altertex[1]
                  : colores.altertex[1],
                color: colores.primario[4],
                cursor: 'pointer',
                boxShadow: esSeleccionada ? '0 0 5px rgba(0,0,0,0.2)' : 'none',
                fontWeight: esSeleccionada ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: colores.primario[3],
                },
              }}
              onClick={() => chipClick(variante)}
            />
          );
        })
      ) : (
        <Texto variant='body1' sx={{ color: colores.texto[4] }}>
          Sin variantes disponibles
        </Texto>
      )}
    </Box>

    {/* Información detallada de la variante seleccionada */}
    {varianteSeleccionada && (
      <Box mt={2} mb={2} p={3} sx={{
        borderRadius: '8px',
      }}>

        {varianteSeleccionada.opciones && varianteSeleccionada.opciones.length > 0 ? (
          <Box>
            <Texto variant='subtitle1' sx={{ mb: 2, fontWeight: 'bold' }}>
              Opciones Disponibles:
            </Texto>
            <Tabla
              columns={[
                { field: 'opcion', headerName: 'Opción', flex: 0.8 },
                { field: 'skuComercial', headerName: 'SKU Comercial', flex: 1 },
                { field: 'skuAutomatico', headerName: 'SKU Auto', flex: 1 },
                { field: 'costo', headerName: 'Costo', flex: 0.6 },
                { field: 'cantidad', headerName: 'Cantidad', flex: 0.7 },
                { field: 'estado', headerName: 'Estado', flex: 0.7 }
              ]}
              rows={varianteSeleccionada.opciones.map((opcion, index) => ({
                id: index + 1,
                opcion: opcion.valorOpcion || 'No disponible',
                skuComercial: opcion.SKUcomercial || 'No disponible',
                skuAutomatico: opcion.SKUautomatico || 'No disponible',
                costo: opcion.costoAdicional ? `${opcion.costoAdicional}` : '$0',
                cantidad: opcion.cantidad || 0,
                estado: opcion.estado === 1 ? 'Activo' : 'Inactivo'
              }))}
              pageSize={5}
              disableRowSelectionOnClick
              sx={{
                '& .MuiDataGrid-columnHeaders': {
                  fontSize: '0.55rem', // Smaller font size for headers
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontSize: '0.55rem', // Smaller font size for header titles
                  fontWeight: 500,
                }
              }}
            />
          </Box>
        ) : (
          <Texto variant='body1' sx={{color: colores.texto[1]}}>
            Sin opciones disponibles
          </Texto>
        )}

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Texto
            variant="body2"
            sx={{
              cursor: 'pointer',
              color: colores.primario[3],
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => setVarianteSeleccionada(null)}
          >
            CERRAR
          </Texto>
        </Box>
      </Box>
    )}

  </>
}

export default InfoProducto