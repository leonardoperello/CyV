import { Schema, model } from "mongoose";

export const schemaOperario = new Schema({
  numeroEmpleado: String,
  DNI: String,
  nombre: String,
  apellido: String,
  telefono: String,
  nombreUsuario: String,
  contraseña: String,
  email: String,
  sector: String,
});

export const modelOperario = model("operario", schemaOperario, "operario");
