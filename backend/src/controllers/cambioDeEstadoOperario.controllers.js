import { modelTarea } from "../schemas/schemaTarea";
import { modelOti } from "../schemas/schemaOti";

export async function tareasAsignadas(id_Operario) {
  //me quedo con todas las tareas asignadas al operario
  const tareas = await modelTarea.find({ idOperario: id_Operario });
  //filtro por las que estan en progreso ( osea asignadas)
  tareas = tareas?.filter(
    (tarea) => tarea.estado[tarea.estado.length] === "iniciada"
  );
  //se filtra por tarea iniciada ya que de lo contrario no queda un registro de cuando se inicio realmente la tarea
  if (tareas.length) {
    //busco las oti tienen tareas iniciadas
    const otis = await modelOti.find({});
    const otisFiltradas = otis.filter((oti) =>
      oti.tareas.find((tarea) => tareas.find((tareaOp) => tareaOp === tarea))
    );
    // se retorna las otis con tareas iniciadas para que el operario puede elegir cual cambiar de estado
    return otisFiltradas;
  }
}
//esto se podria resolver en el front y cambiar el estado y actualizar la oti simplr
export async function cambioEstadotareaAsignada(data) {
  //busco la oti xq puede cambiar el estado de la oti tamb .
  const queryOti = { _id: data.idOti };
  const queryTarea = { _id: data.idTarea };
  const oti = await modelOti.findOne(queryOti);
  const tarea = await modelTarea.findOne(queryTarea);

  if (oti && tarea && data.estado === "detenida") {
  }
  if (oti && tarea && data.estado === "abortada") {
  }
  if (oti && tarea && data.estado === "finalizada") {
  }
}
