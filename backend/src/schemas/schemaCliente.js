import { Schema, model } from "mongoose";

export const schemaCliente = new Schema({
  CUIT: String,
  DNI: String,
  nombre: String,
  apellido: String,
  telefono: String,
  nombreEmpresa: String,
  email: String,
  ordenProduccion: [{
    idOrdenProduccion: String,
    fecha: Date,
    detalle: String,
    estado: String
  }],
});

export const modelCliente = model("clientes", schemaCliente, "clientes");
