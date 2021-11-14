import moment from "moment";
import { modelOrdenProduccion } from "../schemas/schemaOrdenProduccion";
import { modelCliente } from "../schemas/schemaCliente";

export async function altaOrdenProduccion(data) {
  const queryCliente = { CUIT: data.cuitCliente };
  const nuevaOrden = {
    //datos de orden de produccion
    fecha: moment().format(data.fecha),
    detalle: data.detalle,
    supervisor: data.supervisor,
    oti: data.oti,
    rosca: data.rosca,
  };
  const ordenProduccion = await modelOrdenProduccion.create(nuevaOrden); //creo la orden
  const cliente = await modelCliente.findOne(queryCliente); // busco cliente
  cliente.ordenProduccion.push(ordenProduccion); //agrego al arreglo de ordenes la nueva orden
  await modelCliente.findOneAndUpdate(queryCliente, cliente); // busco y actulizo el cliente
  return ordenProduccion; //retorno la nueva orden .
}
