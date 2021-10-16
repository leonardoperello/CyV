import { modelOperario } from '../schemas/schemaOperario';
import { modelOti } from '../schemas/schemaOti';
import { modelTarea } from '../schemas/schemaTarea';

export async function funcion_1(id_sector) {
    const otis = await modelOti.find({ idsector: id_sector });
    otis = otis?.filter(oti => oti.estado[oti.estado.length] === "iniciada" || oti.estado[oti.estado.length] === "en progreso");

    return otis;
}

export async function verificarEstadoTarea(id_oti) {

}