import { Schema, model } from 'mongoose';

const schemaSupervisor = new Schema({
    numeroEmpleado: String,
    DNI: String,
    nombre: String,
    apellido: String,
    telefono: String,
    nombreUsuario: String,
    contraseña: String,
    email: String
});

export const modelSupervisor = model('supervisor', schemaSupervisor, 'supervisor');