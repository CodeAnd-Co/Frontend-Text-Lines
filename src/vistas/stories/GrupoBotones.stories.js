import { fn } from "@storybook/test";
import GrupoBotones from "../componentes/moleculas/GrupoBotones";

export default {
  title: "Componentes/Moléculas/GrupoBotones",
  component: GrupoBotones,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: { type: "radio" },
      options: ["row", "column"],
    },
    align: {
      control: { type: "select" },
      options: ["start", "center", "end"],
    },
    spacing: {
      control: { type: "number", min: 0, max: 10 },
    },
  },
};

export const ParBotones = {
  args: {
    spacing: 2,
    direction: "row",
    align: "center",
    buttons: [
      { label: "Cancelar", variant: "outlined", color: "primary", size: "medium", outlineColor: "rgba(24, 50, 165, 1)",  onClick: fn() },
      { label: "Guardar", variant: "contained", color: "primary", size: "medium", backgroundColor: "rgba(24, 50, 165, 1)", onClick: fn() },
    ],
  },
};

export const GrupoBotonesFila = {
  args: {
    spacing: 1,
    direction: "row",
    align: "center",
    buttons: [
      { label: "Añadir", variant: "contained", color: "primary", size: "medium", backgroundColor: "rgba(24, 50, 165, 1)", onClick: fn() },
      { label: "Importar", variant: "outlined", color: "primary", size: "medium", outlineColor: "rgba(24, 50, 165, 1)",  onClick: fn() },
      { label: "Exportar", variant: "outlined", color: "primary", size: "medium", outlineColor: "rgba(24, 50, 165, 1)",  onClick: fn() },
      { label: "Editar", variant: "outlined", color: "primary", size: "medium", outlineColor: "rgba(24, 50, 165, 1)",  onClick: fn() },
      { label: "Eliminar", variant: "contained", color: "primary", size: "medium", backgroundColor: "rgba(24, 50, 165, 1)", onClick: fn() },
    ],
  },
};

export const GrupoBotonesColumna = {
  args: {
    spacing: 1,
    direction: "column",
    align: "start",
    buttons: [
      { label: "Label", variant: "outlined", color: "primary", onClick: fn() },
      { label: "Label", variant: "contained", color: "error", onClick: fn() },
    ],
  },
};