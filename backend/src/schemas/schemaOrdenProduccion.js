import { Schema, model } from 'mongoose';
import { schemaSupervisor } from './schemaSupervisor';

export const schemaOrdenProduccion = new Schema({
    detalle: String,
    fecha: String,
    supervisor: schemaSupervisor,
    otis: [],
    roscas: [],
});

export const modelOrdenProduccion = model('ordenProduccion', schemaOrdenProduccion, 'ordenProduccion');