import { Schema, model } from "mongoose";
import { schemaRosca } from "./schemaRosca";
import { schemaSupervisor } from "./schemaSupervisor";

export const schemaOrdenProduccion = new Schema({
  detalle: String,
  fecha: String,
  supervisor: schemaSupervisor,
  oti: [],
  rosca: [schemaRosca],
});

export const modelOrdenProduccion = model(
  "ordenProduccion",
  schemaOrdenProduccion,
  "ordenProduccion"
);
