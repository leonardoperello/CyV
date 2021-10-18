import { modelTarea } from "../schemas/schemaTarea";
import { modelOti } from "../schemas/schemaOti";
import { cargarEstado } from "../controllers/altaEstado.controllers";

export async function tareasAsignadas(id_Operario) {
    //me quedo con todas las tareas asignadas al operario
    const tareas = await modelTarea.find({ idOperario: id_Operario });
    //filtro por las que estan en progreso ( osea asignadas)


    const tareasFiltradas = tareas?.filter(
        (tarea) =>
            tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "iniciada" || tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "en progreso"
        //busco por estado iniciada cuando no hay tareas en progreso xq la oti recien llego a mi sector
        //y si esta en progreso muestro lo q me falta si es que tengo mas tareas en estada iniciada
    );
    //se filtra por tarea iniciada ya que de lo contrario no queda un registro de cuando se inicio realmente la tarea
    if (tareasFiltradas.length) {
        //busco las oti tienen tareas iniciadas o en progeso . retorno las otis .
        const otis = await modelOti.find({});
        const otiFiltrada = otis.find((oti) =>
            oti.tareas.find((tarea) => tareasFiltradas.find((tareaOp) => tareaOp._id.equals(tarea._id)))
        );
        // se retorna las oti con tareas iniciadas o en progreso para que el operario puede elegir cual cambiar de estado
        const tareas = {
            tareasOperario: tareasFiltradas,
            idOti: otiFiltrada._id
        }

        return tareas;
    }

}

//esto se podria resolver en el front y cambiar el estado y actualizar la oti.
export async function cambioEstadotareaAsignada(data) {
    //mando la oti y el id de la tarea seleccionada.
    const queryOti = { _id: data.idOti };
    const queryTarea = { _id: data.idTarea };
    const oti = await modelOti.findOne(queryOti);
    const tarea = await modelTarea.findOne(queryTarea);

    if (oti && tarea && data.estado === "detenida") {

        if (tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "en progreso") {
            const estado = await cargarEstado(data);
            this.tarea.estado.push(estado);

            oti.tareas.find(tarea => {
                if (tarea._id.equals(this.tarea)) {
                    tarea.estado.push(estado);
                }
            });
            console.log(oti.tareas);
            return modelOti.findOneAndUpdate(queryOti, oti);

        }

        // crear el estado asiganarlo a la oti y actulizar oti .

    }
    if (oti && tarea && data.estado === "abortada") {
    }
    if (oti && tarea && data.estado === "finalizada") {
    }
    if (oti && tarea && data.estado === "en progreso") {
    }
}
