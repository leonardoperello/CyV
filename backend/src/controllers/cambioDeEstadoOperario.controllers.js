import { modelTarea } from "../schemas/schemaTarea";
import { modelOti } from "../schemas/schemaOti";
import { cargarEstado } from "../controllers/altaEstado.controllers";
import { modelSector } from "../schemas/schemaSector";


export async function tareasAsignadas(id_Operario) {
    //me quedo con todas las tareas asignadas al operario
    const tareas = await modelTarea.find({ idOperario: id_Operario });

    const tareasFiltradas = tareas?.filter(
        (tarea) =>
            tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "iniciada" || tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "en progreso"
        //busco por estado iniciada cuando no hay tareas en progreso xq la oti recien llego a mi sector
        //y si esta en progreso muestro lo q me falta si es que tengo mas tareas en estada iniciada
    );
    //se filtra por tarea iniciada ya que de lo contrario no queda un registro de cuando se inicio realmente la tarea
    if (tareasFiltradas.length) {
        //busco la oti (solo puedeo asignar de a una oti a la vez)
        const otis = await modelOti.find({});
        const otiFiltrada = otis.find((oti) =>
            oti.tareas.find((tarea) => tareasFiltradas.find((tareaOp) => tareaOp._id.equals(tarea._id)))
        );

        // se retorna la id de oti con tareas iniciadas o en progreso para que el operario puede cambiar de estado
        if (otiFiltrada.estados[otiFiltrada.estados.length - 1].tipoEstado.nombre === "en progreso" || otiFiltrada.estados[otiFiltrada.estados.length - 1].tipoEstado.nombre === "iniciada") {//si la oti esta en otro estado que no sea en progreso el operario no deberia ver nada, si el cambio de estado lo realiza el jefe de taller tener en cuenta el estado detenida
            const tareas = {
                tareasOperario: tareasFiltradas,
                idOti: otiFiltrada._id
            }
            return tareas;
        }



    }

}

//esto se podria resolver en el front y cambiar el estado y actualizar la oti.
export async function cambioEstadotareaAsignada(data) {

    //mando la oti ,el id de la tarea seleccionada y el sector
    const queryOti = { _id: data.idOti };
    const queryTarea = { _id: data.idTarea };
    const querySector = { nombre: data.nombreSector }
    const sector = await modelSector.findOne(querySector);
    const oti = await modelOti.findOne(queryOti);
    const tarea = await modelTarea.findOne(queryTarea);

    if (oti && tarea && (data.tipoEstado.nombre === "detenida" || data.tipoEstado.nombre === "abortada")) {//quiero pasar al estado detenida

        if (tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "en progreso" && oti.estados[oti.estados.length - 1] === "en progreso") {// contorlo que el estado anterior sea en progreso si no retorna vacio.
            const estado = await cargarEstado(data);
            tarea.estado.push(estado); //actualizo el esta de la tarea a detenida o abortada
            oti.estados.push(estado);// actualiza el estado de la oti a detenida o abortada

            oti.tareas.find(tareaOti => {// busco en la oti la tarea y actualizo el estato 
                if (tareaOti._id.equals(tarea._id)) {
                    tareaOti.estado.push(estado); // guardo el nuevo estado en tarea
                }
            });
            await modelTarea.findOneAndUpdate(queryTare, tarea); //buscao tarea y actualizo
            return modelOti.findOneAndUpdate(queryOti, oti); //busco la oti y la actulizo

        }


    }

    if (oti && tarea && data.tipoEstado.nombre === "finalizada") {

        if (tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "en progreso") {// controlo que el estado anterior sea en progreso 
            const estado = await cargarEstado(data);

            tarea.estado.push(estado);
            const ultimatarea = oti.tareas[oti.tareas.length - 1];

            if (ultimatarea._id.equals(tarea._id)) {//controlo que sea la ultima tarea , si no es la utlima oti sigue ne estado en progreso

                oti.estados.push(estado);// actualiza el estado de la oti a finalizada  

                oti.tareas.find(tareaOti => {// busco en la oti la tarea y actualizo el estato 
                    if (tareaOti._id.equals(tarea._id)) {
                        tareaOti.estado.push(estado); // guardo el nuevo estado en tarea
                    }
                });
                await modelTarea.findOneAndUpdate(queryTarea, tarea); //busco tarea y actualizo
                return modelOti.findOneAndUpdate(queryOti, oti);//termina la oti .
            } else {
                const TareasSector = oti.tareas.filter(tarea => tarea.sector.nombre === sector.nombre);//aca me quedo con las tareas de mi sector
                const tareasFiltradas = TareasSector?.filter(
                    (tarea) =>
                        tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "iniciada"
                );

                if (tareasFiltradas.length > 0) {//quedan tareas por hacer   ----no importa el orden en este caso xq eso se controla en la asignacion de tarea al operario

                    oti.tareas.find(tareaOti => {// busco en la oti la tarea y actualizo el estato 
                        if (tareaOti._id.equals(tarea._id)) {
                            tareaOti.estado.push(estado); // guardo el nuevo estado en tarea
                        }
                    });

                    await modelTarea.findOneAndUpdate(queryTarea, tarea); //busco tarea y actualizo
                    return modelOti.findOneAndUpdate(queryOti, oti);//busco la oti y actualiza la tarea.

                } else {

                    const indice = oti.sector.findIndex(sectorOti => sectorOti.nombre === sector.nombre);
                    oti.sector[indice].activo = false;
                    oti.sector[indice + 1].activo = true;
                    oti.tareas.find(tareaOti => {// busco en la oti la tarea y actualizo el estato 
                        if (tareaOti._id.equals(tarea._id)) {
                            tareaOti.estado.push(estado); // guardo el nuevo estado en tarea
                        }
                    });
                    await modelTarea.findOneAndUpdate(queryTarea, tarea); //busco tarea y actualizo
                    return modelOti.findOneAndUpdate(queryOti, oti);//busco la oti y actualiza la tarea.


                }

            };

        }


    }

    if (oti && tarea && data.tipoEstado.nombre === "en progreso") {

        if (tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "iniciada" && (oti.estados[oti.estados.length - 1].tipoEstado?.nombre === "en progreso" || oti.estados[oti.estados.length - 1].tipoEstado?.nombre === "iniciada")) {// contorlo que el estado anterior sea en progreso si no dejo al estado detenida

            const estado = await cargarEstado(data);
            tarea.estado.push(estado);
            if (oti.estados[oti.estados.length - 1].tipoEstado?.nombre === "iniciada") {//si ya esta en progreso no lo cambio
                oti.estados.push(estado);// actualiza el estado de la oti a detenida
            }

            oti.tareas.find(tareaOti => {// busco en la oti la tarea y actualizo el estato 
                if (tareaOti._id.equals(tarea._id)) {
                    tareaOti.estado.push(estado); // guardo el nuevo estado en tarea
                }
            });
            await modelTarea.findOneAndUpdate(queryTarea, tarea);
            return await modelOti.findOneAndUpdate(queryOti, oti); //busco la oti y la actulizo

        }

    }
}
