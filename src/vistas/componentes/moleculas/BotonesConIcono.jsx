import React from "react";
import PropTypes from "prop-types";
import { Stack } from '@mui/material';
import Icono from "../atomos/Icono";
import GrupoBotones from "./GrupoBotones";

const BotonesConIcono = ({ iconoProps, botonesProps }) => {
    return (
        <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={2}
        flexWrap="wrap"
        >
            <Icono {...iconoProps}/>
            <GrupoBotones {...botonesProps}/>
        </Stack>
    );
};

BotonesConIcono.PropTypes = {
    iconoProps: PropTypes.shape({
        nombre: PropTypes.string.isRequired,
        variant: PropTypes.string,
        color: PropTypes.string,
        size: PropTypes.oneOf(['small', 'medium', 'large']),
        clickable: PropTypes.bool,
        tooltip: PropTypes.string,
        onClick: PropTypes.func,
    }),
    botonesProps: PropTypes.shape({
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                variant: PropTypes.oneOf(['text', 'contained', 'outlined']),
                selected: PropTypes.bool,
                fullWidth: PropTypes.bool,
                color: PropTypes.string,
                size: PropTypes.oneOf(['small', 'medium', 'large']),
                backgroundColor: PropTypes.string,
                outlineColor: PropTypes.string,
                onClick: PropTypes.func,
            })
        ).isRequired,
        spacing: PropTypes.number, 
        direction: PropTypes.oneOf(['row', 'column']),
        align: PropTypes.oneOf(['start', 'center', 'end']),
    }).isRequired,
};

export default BotonesConIcono;