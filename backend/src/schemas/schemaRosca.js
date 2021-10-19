import { Schema, model } from "mongoose";
import { schemaTipoDeRosca } from "./schemaTipoDeRosca";

export const schemaRosca = new Schema({
  descripcionTecnica: String,
  medida: String,
  tipoDeRosca: schemaTipoDeRosca,
});

export const modelRosca = model("rosca", schemaRosca, "rosca");
