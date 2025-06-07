import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const CajaDesplazable = ({ maxHeight = 200, children }) => (
  <Box
    sx={{
      maxHeight,        // altura máxima
      overflowY: 'auto',// scroll sólo vertical
      pr: 1,            // padding right para el scroll bar
    }}
  >
    {children}
  </Box>
);

CajaDesplazable.propTypes = {
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  children: PropTypes.node.isRequired,
};

export default CajaDesplazable;
