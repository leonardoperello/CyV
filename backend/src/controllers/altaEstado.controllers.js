import { modelEstado } from "../schemas/schemaEstado";
import moment from "moment";

export async function cargarEstado(data) {
  const estado = {
    fechaInicio: moment().format(data.fechaInicio),
    fechaFin: data.fechaFin ? moment().format(data.fechaFin) : null,
    observacion: data.observacion,
    tipoEstado: data.tipoEstado,
  };

  const nuevoEstado = await modelEstado.create(estado);

  return nuevoEstado;
}
