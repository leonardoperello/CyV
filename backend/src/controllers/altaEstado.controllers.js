import { modelEstado } from '../schemas/schemaEstado';
import { modelOti } from '../schemas/schemaOti';
import moment from 'moment';

export async function cargarEstado(data) {
    // const query = { _id: data.idOti };
    //const oti = await modelOti.findOne(query);
    const estado = {
        fechaInicio: moment().format(data.fechaInicio),
        fechaFin: moment().format(data.fechaFin),
        observacion: data.observacion,
        tipoEstado: data.tipoEstado
    }

    const nuevoEstado = await modelEstado.create(estado);
    // if (data.TareaNumero) { //si es tarea debo mandar el id de tarea para poder modificar su estado
    //     oti.tarea[data.TareaNumero].estado.push(nuevoEstado);
    //     if (nuevoEstado.tipoEstado.nombre === "abortada") { // si tarea abortada la oti cambia a estado abortada
    //         oti.estados.push(nuevoEstado);
    //     }
    //     if (nuevoEstado.tipoEstado.nombre === "finalizada" && oti.tarea.length - 1 === TareaNumero) {//si finalizo todas las tareas oti cambia a finalizada
    //         oti.estados.push(nuevoEstado);
    //     }

    // } else {//cuando se crea la oti el estado cambia a iniciada.
    //     oti.estados.push(nuevoEstado);
    // }
    //const result = await modelOti.findOneAndUpdate(query, oti);
    return nuevoEstado;


}