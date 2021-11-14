import { Schema, model } from "mongoose";
import { schemaCategoria } from "./schemaCategoria";

export const schemaTipoDeRosca = new Schema({
  descripcion: String,
  nombre: String,
  categoria: schemaCategoria,
});

export const modelTipoDeRosca = model(
  "tipoDeRosca",
  schemaTipoDeRosca,
  "tipoDeRosca"
);
