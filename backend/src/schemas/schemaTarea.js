import { Schema, model } from "mongoose";
import { schemaTipoDeTarea } from "./schemaTipoDeTarea";
import { schemaSector } from "./schemaSector";
import { schemaEstado } from "./schemaEstado";

export const schemaTarea = new Schema({
  descripcion: String,
  nombre: String,
  fechaInicio: Date,
  fechaFin: Date,
  numeroDeOrden: Number,
  tipoDeTarea: schemaTipoDeTarea,
  sector: schemaSector,
  idOperario: String,
  estado: [schemaEstado],
});

export const modelTarea = model("tarea", schemaTarea, "tarea");
