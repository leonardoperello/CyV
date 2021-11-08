import { modelRosca } from "../schemas/schemaRosca";
import { modelTipoDeRosca } from "../schemas/schemaTipoDeRosca";

export async function altaRosca(data) {
  console.log(data);
  const nuevaRosca = new modelRosca();
  nuevaRosca.descripcionTecnica = data.rosca.descripcionTecnica;
  nuevaRosca.medida = data.rosca.medida;
  nuevaRosca.tipoDeRosca = data.rosca.tipoDeRosca;
  const roscaNueva = await nuevaRosca.save();
  return roscaNueva;
}
