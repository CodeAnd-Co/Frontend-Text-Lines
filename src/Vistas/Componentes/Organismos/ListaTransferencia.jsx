import React, { useState, useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';


// Funciones utilitarias
function no(no1, no2, funcionClave = (elemento) => elemento.id || elemento) {
  return no1.filter((valorA) => !no2.some((valorB) => funcionClave(valorA) === funcionClave(valorB)));
}

function interseccion(inter1, inter2, funcionClave = (elemento) => elemento.id || elemento) {
  return inter1.filter((valorA) => inter2.some((valorB) => funcionClave(valorA) === funcionClave(valorB)));
}

function union(union1, union2, funcionClave = (elemento) => elemento.id || elemento) {
  return [...union1, ...no(union2, union1, funcionClave)];
}

// Componente Lista de Transferencia Personalizada
const ListaTransferenciaPersonalizada = ({
                                           elementosDisponibles = [],
                                           elementosSeleccionados = [],
                                           alCambiarSeleccion,
                                           tituloIzquierda = "Disponibles",
                                           tituloDerecha = "Seleccionados",
                                           obtenerEtiquetaElemento = (elemento) => elemento.etiqueta || elemento.nombre || String(elemento),
                                           obtenerClaveElemento = (elemento) => elemento.id || elemento.clave || elemento,
                                           deshabilitado = false,
                                           alturaMaxima = 357,
                                           ancho = 350
                                         }) => {
  const [marcados, setMarcados] = useState([]);
  const [izquierda, setIzquierda] = useState(elementosDisponibles);
  const [derecha, setDerecha] = useState(elementosSeleccionados);

  const updatingFromPropsRef = useRef(false);

  // Actualizar estado interno cuando cambien las props
  useEffect(() => {
    updatingFromPropsRef.current = true;
    setIzquierda(elementosDisponibles);
    updatingFromPropsRef.current = false;
  }, [elementosDisponibles]);

  useEffect(() => {
    updatingFromPropsRef.current = true;
    setDerecha(elementosSeleccionados);
    updatingFromPropsRef.current = false;
  }, [elementosSeleccionados]);

  useEffect(() => {
    if (alCambiarSeleccion && !updatingFromPropsRef.current) {
      alCambiarSeleccion({
        disponibles: izquierda,
        seleccionados: derecha
      });
    }
  }, [izquierda, derecha, alCambiarSeleccion]);

  const marcadosIzquierda = interseccion(marcados, izquierda, obtenerClaveElemento);
  const marcadosDerecha = interseccion(marcados, derecha, obtenerClaveElemento);

  const manejarAlternar = (valor) => () => {
    const indiceActual = marcados.findIndex(elemento => obtenerClaveElemento(elemento) === obtenerClaveElemento(valor));
    const nuevosMarcados = [...marcados];

    if (indiceActual === -1) {
      nuevosMarcados.push(valor);
    } else {
      nuevosMarcados.splice(indiceActual, 1);
    }

    setMarcados(nuevosMarcados);
  };

  const numeroDeMarcados = (elementos) => interseccion(marcados, elementos, obtenerClaveElemento).length;

  const manejarAlternarTodos = (elementos) => () => {
    if (numeroDeMarcados(elementos) === elementos.length) {
      setMarcados(no(marcados, elementos, obtenerClaveElemento));
    } else {
      setMarcados(union(marcados, elementos, obtenerClaveElemento));
    }
  };

  const manejarMarcadosADerecha = () => {
    setDerecha(union(derecha, marcadosIzquierda, obtenerClaveElemento));
    setIzquierda(no(izquierda, marcadosIzquierda, obtenerClaveElemento));
    setMarcados(no(marcados, marcadosIzquierda, obtenerClaveElemento));
  };

  const manejarMarcadosAIzquierda = () => {
    setIzquierda(union(izquierda, marcadosDerecha, obtenerClaveElemento));
    setDerecha(no(derecha, marcadosDerecha, obtenerClaveElemento));
    setMarcados(no(marcados, marcadosDerecha, obtenerClaveElemento));
  };

  const manejarTodoADerecha = () => {
    setDerecha(union(derecha, izquierda, obtenerClaveElemento));
    setIzquierda([]);
    setMarcados([]);
  };

  const manejarTodoAIzquierda = () => {
    setIzquierda(union(izquierda, derecha, obtenerClaveElemento));
    setDerecha([]);
    setMarcados([]);
  };

  const listaPersonalizada = (titulo, elementos) => (
    <Card sx={{ width: ancho }}>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={manejarAlternarTodos(elementos)}
            checked={numeroDeMarcados(elementos) === elementos.length && elementos.length !== 0}
            indeterminate={
              numeroDeMarcados(elementos) !== elementos.length && numeroDeMarcados(elementos) !== 0
            }
            disabled={elementos.length === 0 || deshabilitado}
            inputProps={{
              'aria-label': 'todos los elementos seleccionados',
            }}
          />
        }
        title={titulo}
        subheader={`${numeroDeMarcados(elementos)}/${elementos.length} seleccionados`}
      />
      <Divider />
      <List
        sx={{
          height: alturaMaxima,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {elementos.map((elemento) => {
          const claveElemento = obtenerClaveElemento(elemento);
          const etiquetaElemento = obtenerEtiquetaElemento(elemento);
          const estaMarcado = marcados.some(elementoMarcado => obtenerClaveElemento(elementoMarcado) === claveElemento);

          return (
            <ListItemButton
              key={claveElemento}
              role="listitem"
              onClick={manejarAlternar(elemento)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={estaMarcado}
                  tabIndex={-1}
                  disableRipple
                  disabled={deshabilitado}
                  inputProps={{
                    'aria-labelledby': `lista-transferencia-elemento-${claveElemento}-etiqueta`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={`lista-transferencia-elemento-${claveElemento}-etiqueta`}
                primary={etiquetaElemento}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
    >
      <Grid>{listaPersonalizada(tituloIzquierda, izquierda)}</Grid>
      <Grid>
        <Grid container direction="column" sx={{ alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={manejarTodoADerecha}
            disabled={izquierda.length === 0 || deshabilitado}
            aria-label="mover todo a la derecha"
          >
            <KeyboardDoubleArrowRightIcon/>
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={manejarMarcadosADerecha}
            disabled={marcadosIzquierda.length === 0 || deshabilitado}
            aria-label="mover seleccionados a la derecha"
          >
            <KeyboardArrowRightIcon/>
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={manejarMarcadosAIzquierda}
            disabled={marcadosDerecha.length === 0 || deshabilitado}
            aria-label="mover seleccionados a la izquierda"
          >
            <KeyboardArrowLeftIcon/>
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={manejarTodoAIzquierda}
            disabled={derecha.length === 0 || deshabilitado}
            aria-label="mover todo a la izquierda"
          >
            <KeyboardDoubleArrowLeftIcon/>
          </Button>
        </Grid>
      </Grid>
      <Grid>{listaPersonalizada(tituloDerecha, derecha)}</Grid>
    </Grid>
  );
};

export default ListaTransferenciaPersonalizada;