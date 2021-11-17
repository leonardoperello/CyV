import { Schema, model } from 'mongoose';

export const schemaEmpleado = new Schema({
    numeroEmpleado: String,
    DNI: String,
    nombre: String,
    apellido: String,
    telefono: String,
    nombreUsuario: String,
    contraseña: String,
    email: String,
    sector: String,
    funcion: String
});

export const modelEmpleado = model('empleado', schemaEmpleado, 'empleado');