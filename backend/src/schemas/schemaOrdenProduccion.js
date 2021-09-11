import { Schema, model } from 'mongoose';
import { modelSupervisor } from './schemaSupervisor';

const schemaOrdenProduccion = new Schema({
    detalle: String,
    fecha: String,
    supervisor: modelSupervisor,
    otis: [],
    roscas: [],
});

export const modelOrdenProduccion = model('ordenProduccion', schemaOrdenProduccion, 'ordenProduccion');