import { modelOperario } from '../schemas/schemaOperario';
import { modelOti } from '../schemas/schemaOti';
import { modelTarea } from '../schemas/schemaTarea';

export async function obtenerTareas(data) {
    const otis = await modelOti.find();
    const arre = otis.filter((oti) => oti.estados[oti.estados.length - 1]?.tipoEstado?.nombre === "inicializada" || oti.estados[oti.estados.length - 1]?.tipoEstado?.nombre === "en progreso");
    if (arre.length) {
        // const arre2;
        for (let i = 0; i < arre.length; i++) {

            const arre2 = arre.tareas.filter((tarea) => tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "iniciada" || tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "detenida");
            console.log(arre2);
        }
    }
}

export async function verificarEstadoTarea(data) {
    const queryTarea = { _id: data.idTarea }
    const tarea = await modelTarea.findOne(queryTarea);
    if (tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "iniciada" || tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "detenida") {
        tarea.estado[tarea.estado.length].tipoDeEstado.nombre === "en progreso";
    }
}

