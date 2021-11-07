import { modelRosca } from "../schemas/schemaRosca";
import { modelTipoDeRosca } from "../schemas/schemaTipoDeRosca";

export async function altaRosca(data) {
  const queryTipoRosca = { _id: data.idTipo };
  const tipoRosca = await modelTipoDeRosca.findOne(queryTipoRosca);
  const nuevaRosca = new modelRosca();
  nuevaRosca.descripcionTecnica = data.descripcion;
  nuevaRosca.medida = data.medida;
  nuevaRosca.tipoDeRosca = tipoRosca;
  const tt = await nuevaRosca.save();
  return tt;
}
