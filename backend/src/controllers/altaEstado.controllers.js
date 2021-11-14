import { modelEstado } from "../schemas/schemaEstado";
import moment from "moment";

export async function cargarEstado(data) {
  const estado = {
    fechaInicio: moment().format("YYYY/MM/DD"),
    fechaFin: null, // cuando es un estado nuevo fecha fin siempre es null xq no sabemos cuando termina, cuando hay cambios de estado ahi se carga este campo antes de generar uno nuevo
    observacion: data.observacion ? data.observacion : "",
    tipoEstado: data.tipoEstado,
  };

  const nuevoEstado = await modelEstado.create(estado);

  return nuevoEstado;
}
