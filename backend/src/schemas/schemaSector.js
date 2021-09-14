import { Schema, model } from 'mongoose';
import { schemaOperario } from './schemaOperario';

export const schemaSector = new Schema({
    nombre: String,
    operario: schemaOperario,
});

export const modelSector = model('sector', schemaSector, 'sector');