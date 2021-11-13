import { modelRosca } from "../schemas/schemaRosca";
import { modelTipoDeRosca } from "../schemas/schemaTipoDeRosca";

export async function altaRosca(data) {
  console.log(data);
  const nuevaRosca = new modelRosca();
  nuevaRosca.descripcionTecnica = data.descripcionTecnica;
  nuevaRosca.medida = data.medida;
  nuevaRosca.tipoDeRosca = data.tipoDeRosca;
  const roscaNueva = await nuevaRosca.save();
  return roscaNueva;
}
