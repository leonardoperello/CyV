import { modelOti } from "../schemas/schemaOti";
import { modelSector } from "../schemas/schemaSector";
import { modelTarea } from "../schemas/schemaTarea";
import { cargarEstado } from "../controllers/altaEstado.controllers";

export async function obtenerOtisDelSector(idSector) {
  const querySector = { nombre: idSector };
  const sector = await modelSector.findOne(querySector);
  const otis = await modelOti.find({}); // si los estados estan vacios este metodo pincha
  console.log(otis);
  const otisFiltradas = otis.filter((oti) =>
    oti.sector.find(
      (sec) =>
        sec.nombre === sector.nombre &&
        sec.activo &&
        (oti.estados[oti.estados?.length - 1].tipoEstado?.nombre ===
          "en progreso" ||
          oti.estados[oti.estados?.length - 1].tipoEstado?.nombre ===
            "detenida")
    )
  ); //me quedo con las otis que se encuentran en el sector listas para trabajar.
  if (otisFiltradas.length) {
    return otisFiltradas.map((oti) => {
      return {
        idOti: oti._id,
        fechaInicio: oti.fechaInicio,
        fechaFin: oti.fechaFin,
        rosca: oti.rosca,
      };
    });
  }
}

export async function obtenerTareas(idOti) {
  const queryOti = { _id: idOti };
  const oti = await modelOti.findOne(queryOti);

  const tareasFiltradas = oti.tareas.filter(
    (tarea) =>
      tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre ===
        "iniciada" ||
      tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "detenida"
  );

  return tareasFiltradas;
}

export async function asignarTareaOperario(data) {
  const queryOti = { _id: data.idOti };
  const idOperario = data.idOperario;
  const tareas = data.tareas;
  const oti = await modelOti.findOne(queryOti);
  const estado = "";
  data["tipoEstado"] = {
    nombre: "iniciada",
    descripcion: "",
  };
  tareas.forEach(async (tarea) => {
    tarea.idOperario = idOperario; //si la tarea tenia un un operario asignado xq estaba en detenida lo piso
    if (
      tarea.estado[tarea.estado.length - 1]?.tipoEstado?.nombre === "detenida"
    ) {
      estado = await cargarEstado(data); //si esta en iniciada queda asi , el operario la cambia a en progreso
      tarea.estado.push(estado);
    }
    await oti.tareas.find((tareaOti) => {
      // busco en la oti la tarea y la actualizo
      if (tareaOti._id.equals(tarea._id)) {
        tareaOti.idOperario = tarea.idOperario; // guardo el nuevo estado en tarea
        if (estado !== "") {
          tareaOti.estado.push(estado);
        }
      }
    });
    await modelTarea.findOneAndUpdate({ _id: tarea._id }, tarea);
  });

  //buscao oti y actualizo

  return await modelOti.findOneAndUpdate(queryOti, oti);
}
