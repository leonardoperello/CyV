import { modelEstado } from '../schemas/schemaEstado';
import { modelOti } from '../schemas/schemaOti';

export async function cargarEstado(data) {

    const query = { _id: data.idOti };
    const oti = await modelOti.find(query);
    const estado = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        observacion: data.observacion,
        tipoEstado: data.tipoEstado
    }

    const resultInsert = await modelEstado.create(estado);
    if (data.esTarea) {
        oti.tarea.estado.push(resultInsert);

    } else {
        oti.estado.push(resultInsert);
    }
    const result = await modelOti.findOneAndUpdate(query, oti);
    return result;


}