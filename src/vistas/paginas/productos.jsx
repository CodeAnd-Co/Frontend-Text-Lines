import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const Productos = () => {
  const tema = useTheme();
  const colores = tokens(tema.palette.mode);

  const [cargando, setCargando] = useState(true);
  const [productos, setProductos] = useState([]);
  const datosEnvio = {
    idCliente: 102,
  };
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const obtenerProductos = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/productos/consultar-lista`,
        datosEnvio,
        {
          withCredentials: true,
          headers: { "x-api-key": `${API_KEY}` },
        }
      );

      setProductos(response.data.productos);
      setCargando(false);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      alert("Error al obtener los productos");
    }
  };

  useEffect(() => {
    obtenerProductos();
  });

  const columnas = [
    {
      field: "imagen",
      headerName: "Imagen",
      flex: 0.7,
      renderCell: (params) => (
        <img
          src={params.row.urlImagen}
          alt="Producto"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: "nombreComun",
      headerName: "Nombre",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "precioVenta",
      headerName: "Precio Venta",
      type: "number",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "estado",
      headerName: "Disponibilidad en stock",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "estado-row--cell",
      renderCell: ({ row: { estado } }) => {
        return (
          <Box
            width="30%"
            height="50%"
            m="20px auto"
            p="15px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            textcolor={colores.primario[4]}
            backgroundColor={
              estado === 1 ? colores.altertex[1] : colores.acciones[1]
            }
            borderRadius="4px"
          >
            {estado === 1 ? "Disponible" : "No disponible"}
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <Box
        sx={{
          flex: 1,
          textAlign: "left",
          marginTop: "70px",
          marginLeft: "50px",
        }}
      >
        <Typography variant="h4">Productos</Typography>
      </Box>

      <Box sx={{ marginTop: "40px", marginLeft: "40px" }}>
        <Box
          sx={{
            "& .MuiDataGrid-root": {
              width: "100%",
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colores.texto[1],
            },
            "& .estado-row--cell": {
              color: colores.primario[4],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colores.menu[2],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colores.menu[2],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colores.menu[2],
            },
            "& .MuiDataGrid-row.Mui-selected": {
              backgroundColor: colores.acciones[2],
            },
          }}
        >
          <DataGrid
            checkboxSelection
            rows={productos}
            getRowId={(row) => row.idProducto}
            columns={columnas}
            loading={cargando}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5]}
            pagination
            rowHeight={80}
            slots={{ toolbar: GridToolbar }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Productos;
