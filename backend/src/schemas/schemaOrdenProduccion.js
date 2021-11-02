import { Schema, model } from "mongoose";
import { schemaRosca } from "./schemaRosca";
import { schemaSupervisor } from "./schemaSupervisor";
import { schemaOti } from "./schemaOti";

export const schemaOrdenProduccion = new Schema({
  detalle: String,
  fecha: String,
  supervisor: schemaSupervisor,
  oti: [schemaOti],
  rosca: [schemaRosca],
});

export const modelOrdenProduccion = model(
  "ordenProduccion",
  schemaOrdenProduccion,
  "ordenProduccion"
);
