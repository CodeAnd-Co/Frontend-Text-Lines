import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import BarraLateral from '../Componentes/Organismos/BarraLateral';

const SistemaAdministrativo = () => {
  return (
    <Box display='flex' height='100vh'>
      <BarraLateral />
      <Box component='main' flexGrow={1} p={2} overflow='auto'>
        <Outlet />
      </Box>
    </Box>
  );
};

export default SistemaAdministrativo;
