import { Schema, model } from 'mongoose';
import { schemaTipoDeEstado } from './schemaTipoDeEstado';

export const schemaEstado = new Schema({
    fechaInicio: Date,
    fechaFin: Date,
    observacion: String,
    tipoEstado: schemaTipoDeEstado
});

export const modelEstado = model('estado', schemaEstado, 'estado');