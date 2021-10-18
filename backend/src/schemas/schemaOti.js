import { Schema, model } from "mongoose";
import { schemaSector } from "../schemas/schemaSector";
import { schemaTarea } from "../schemas/schemaTarea";
import { schemaRosca } from "../schemas/schemaRosca";
import { schemaEstado } from "../schemas/schemaEstado";

export const schemaOti = new Schema({
  fechaInicio: Date,
  fechaFin: Date,
  rosca: schemaRosca,
  sector: [schemaSector],
  tareas: [schemaTarea],
  estados: [schemaEstado],
});

export const modelOti = model("oti", schemaOti, "oti");
