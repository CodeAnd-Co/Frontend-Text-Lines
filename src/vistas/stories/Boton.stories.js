import React from "react";
import { fn } from "@storybook/test";
import Boton from "../componentes/atomos/Boton"; 

export default {
  title: "Componentes/Átomos/Boton",
  component: Boton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    variant: {
      control: { type: "select" },
      options: ["contained", "outlined", "text"],
    },
    size: {
      control: { type: "select" },
      options: ["small", "medium", "large"],
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "error", "success", "warning", "info"],
    },
    fullWidth: { control: "boolean" },
    selected: { control: "boolean" },
  },
  args: {
    onClick: fn(),
  },
};

export const Contained = {
  args: {
    label: "Confirmar",
    variant: "contained",
    color: "primary",
  },
};

export const Outlined = {
  args: {
    label: "Cancelar",
    variant: "outlined",
    color: "secondary",
  },
};

export const Text = {
  args: {
    label: "Omitir",
    variant: "text",
    color: "primary",
  },
};

export const ContainedSeleccionado = {
  args: {
    label: "Activo",
    variant: "contained",
    selected: true,
    color: "primary",
  },
};

export const OutlinedSeleccionado = {
  args: {
    label: "Opción activa",
    variant: "outlined",
    selected: true,
    color: "primary",
  },
};

export const FullWidth = {
  args: {
    label: "Cubre todo",
    fullWidth: true,
    color: "primary",
    variant: "contained",
  },
};

export const CustomBackground = {
  args: {
    label: "Personalizado",
    backgroundColor: "#8e44ad",
    color: "inherit",
    variant: "contained",
  },
};