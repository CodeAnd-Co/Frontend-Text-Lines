import { Button, CardActions } from "@mui/material";

const BotonForma = ({
  type = "submit",
  variant = "contained",
  fullWidth = true,
  children,
  sx = {},
  ...props
}) => {
  return (
    <CardActions sx={{ mt: 3, ...sx }}>
      <Button
        type={type}
        variant={variant}
        fullWidth={fullWidth}
        sx={{ mt: 2, ...sx }}
        {...props}
      >
        {children}
      </Button>
    </CardActions>
  );
};

export default BotonForma;
