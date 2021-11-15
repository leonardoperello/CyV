import { Schema, model } from "mongoose";

export const schemaTipoDeTarea = new Schema({
  nombre: String,
  descripcion: String,
});

export const modelTipoDeTarea = model(
  "tipoDeTarea",
  schemaTipoDeTarea,
  "tipoDeTarea"
);
