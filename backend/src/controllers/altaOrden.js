import moment from "moment";

export async function altaOrdenProduccion(data) {
    try {
        const dataOrden = req.body;

        const nuevaOrden = {
            fecha: moment().format(dataOrden.fecha),
            detalle: dataOrden.detalle,
            supervisor: dataOrden.supervisor,
            oti: [],
            roscas: []
        };
        const res = await modelOrdenProduccion.create(nuevaOrden);
        res.status(200).send(res);
    } catch (error) {
        res.status(400).send(error);
    }
}