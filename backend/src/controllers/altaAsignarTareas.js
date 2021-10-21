import { modelOperario } from '../schemas/schemaOperario';
import { modelOti } from '../schemas/schemaOti';
import { modelTarea } from '../schemas/schemaTarea';

export async function obtenerTareas(data) {
    const tareasFiltradas = null;
    const otis = await modelOti.find({ 'sector.nombre': data });
    const otisFiltradas = otis.filter((oti) => oti.estados[oti.estados.length - 1]?.tipoEstado?.nombre === "inicializada" || oti.estados[oti.estados.length - 1]?.tipoEstado?.nombre === "en progreso");
    if (otisFiltradas.length) {
        for (let i = 0; i < otisFiltradas; i++) {
            tareasFiltradas = otisFiltradas[i].tareas.filter((tarea) => tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "iniciada" || tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "detenida");
        }
    }
    return tareasFiltradas;
}

export async function verificarEstadoTarea(data) {
    const queryTarea = { _id: data.idTarea }
    const tarea = await modelTarea.findOne(queryTarea);
    if (tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "iniciada" || tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "detenida") {
        tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "en progreso";
    }
}

