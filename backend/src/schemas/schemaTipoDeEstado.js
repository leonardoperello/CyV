import { Schema, model } from 'mongoose';

const schemaTipoDeEstado = new Schema({
    nombre: String,
    descripcion: String,
});

export const modelTipoDeEStado = model('tipoDeEstado', schemaTipoDeEstado, 'tipoDeEstado');