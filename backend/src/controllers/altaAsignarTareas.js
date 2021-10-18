import { modelOperario } from '../schemas/schemaOperario';
import { modelOti } from '../schemas/schemaOti';
import { modelTarea } from '../schemas/schemaTarea';

export async function obtenerTareas(id_sector) {
    const otis = await modelOti.find({ idsector: id_sector });
    otis = otis?.filter((oti) => oti.estado[oti.estado.length] === "iniciada" || oti.estado[oti.estado.length] === "en progreso");
    if (otis.length) {
        const tareas = otis.tareas.filter((tarea) => tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "iniciada" || tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "detenida");
        return tareas;
    }
    // Que retorno en caso de que oti este vacia?
}

export async function verificarEstadoTarea(data) {
    const queryTarea = { _id: data.idTarea }
    const tarea = await modelTarea.findOne(queryTarea);
    if (tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "iniciada" || tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "detenida") {
        tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "en progreso";
    }
    // es necesario retornar algo aca?
}