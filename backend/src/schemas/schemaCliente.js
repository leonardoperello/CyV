import { Schema, model } from 'mongoose';

const schemaCliente = new Schema({
    CUIT: String,
    DNI: String,
    nombre: String,
    apellido: String,
    telefono: String,
    nombreEmpresa: String,
    email: String,
    ordenProduccion: []
});

export const modelCliente = model('cliente', schemaCliente, 'cliente');