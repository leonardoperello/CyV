import { Schema, model } from 'mongoose';

const schemaCategoria = new Schema({
    nombre: String,
    descripcion: String,
});

export const modelCategoria = model('categoria', schemaCategoria, 'categoria');