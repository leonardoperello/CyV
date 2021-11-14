import { Schema, model } from "mongoose";

export const schemaTipoDeEstado = new Schema({
  nombre: String,
  descripcion: String,
});

export const modelTipoDeEstado = model(
  "tipoDeEstado",
  schemaTipoDeEstado,
  "tipoDeEstado"
);
