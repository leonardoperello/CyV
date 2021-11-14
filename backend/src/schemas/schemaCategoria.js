import { Schema, model } from "mongoose";

export const schemaCategoria = new Schema({
  nombre: String,
  descripcion: String,
});

export const modelCategoria = model("categoria", schemaCategoria, "categoria");
