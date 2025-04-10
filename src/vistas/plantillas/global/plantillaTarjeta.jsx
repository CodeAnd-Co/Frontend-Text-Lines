import { Card, CardHeader } from "@mui/material";

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
