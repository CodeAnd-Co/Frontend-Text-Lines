import { Card, CardHeader } from "@mui/material";

/**
 * Componente reutilizable de tarjeta con estilo personalizable.
 *
 * Renderiza un contenedor tipo tarjeta (`Card`) de Material UI que puede incluir
 * un encabezado opcional (`CardHeader`) y contenido hijo.
 *
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido a renderizar dentro de la tarjeta.
 * @param {string} [props.title] - Título opcional que se mostrará en la parte superior de la tarjeta.
 * @param {number} [props.width=631] - Ancho de la tarjeta.
 * @param {number} [props.height=503] - Alto de la tarjeta.
 * @param {number} [props.padding=3] - Espaciado interno (padding) de la tarjeta.
 * @param {number} [props.boxShadow=3] - Nivel de sombra del contenedor.
 * @param {Object} [props.headerProps={}] - Props adicionales para el `CardHeader` (por ejemplo, estilos personalizados).
 * @param {Object} [props.headerProps.titleTypographyProps] - Props para personalizar la tipografía del título.
 * @param {Object} [props.headerProps.sx] - Estilos SX adicionales para el `CardHeader`.
 *
 * @returns {JSX.Element} Tarjeta con estilos personalizados y contenido renderizado.
 */
const PlantillaTarjeta = ({
  children,
  title,
  width = 631,
  height = 503,
  padding = 3,
  boxShadow = 3,
  headerProps = {},
}) => {
  return (
    <Card sx={{ width, height, padding, boxShadow }}>
      {title && (
        <CardHeader
          title={title}
          titleTypographyProps={{
            variant: "h6",
            ...headerProps.titleTypographyProps,
          }}
          sx={{
            textAlign: "center",
            padding: 1,
            ...headerProps.sx,
          }}
        />
      )}
      {children}
    </Card>
  );
};

export default PlantillaTarjeta;
