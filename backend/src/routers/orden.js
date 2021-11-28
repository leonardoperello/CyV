import express from "express";
import { modelOrdenProduccion } from "../schemas/schemaOrdenProduccion";
import { altaOrdenProduccion } from "../controllers/altaOrden";
import moment from "moment";
const router = express.Router();

router.get("/", async function (req, res) {
  // #swagger.tags = ['Orden']
  // #swagger.description = 'Endpoint para obtener todas las ordenes'
  try {
    const result = await modelOrdenProduccion.find({});
    /* #swagger.responses[200] = {
                 description: 'ordenes encontradas',
                 schema: { $ref: '#/definitions/Ordenes' }
         } */
    res.json(result.reverse());
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    console.log(error);
  }
});

router.get("/:id", async function (req, res) {
  // #swagger.tags = ['Orden']
  // #swagger.description = 'Endpoint para obtener una orden.'
  //  #swagger.parameters['id'] = { description: 'orden ID' }
  try {
    const id = req.params.id;
    const result = await modelOrdenProduccion.findOne({ _id: id });
    /* #swagger.responses[200] = {
                description: 'orden encontrada',
                schema: { $ref: '#/definitions/orden' }
        } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    console.log(error);
  }
});

router.post("/crearOrdenProduccion", async function (req, res) {
  // #swagger.tags = ['Orden']
  // #swagger.description = 'Endpoint para crear orden de produccion.'
  let data = req.body;
  /* #swagger.parameters['orden'] = {
               in: 'body',
               description: 'datos para crear una orden',
               required: true,
               type: 'object',
               schema: { $ref: "#/definitions/orden" }
        } */
  try {
    if (
      typeof req.body.cuitCliente !== "string" ||
      req.body.cuitCliente.length !== 11
    ) {
      return res.status(400).send("El formato del CUIT es incorrecto");
    }
    if (typeof req.body.detalle !== "string") {
      return res.status(400).send("El formato del detalle es incorrecto");
    }
    if (
      !moment(req.body.fecha, "YYYY-MM-DD", true).isValid() ||
      req.body.fecha !== moment(new Date()).format("YYYY-MM-DD")
    ) {
      return res
        .status(400)
        .send(
          "El formato de la fecha es incorrecto o la fecha no corresponde al dia de hoy"
        );
    }
    if (Object.keys(req.body.supervisor).length === 0) {
      return res
        .status(400)
        .send("La orden de produccion no tiene un supervisor");
    }
    if (Object.keys(req.body.rosca).length === 0) {
      return res.status(400).send("La orden de produccion no tiene una rosca");
    }
    const resultInsert = await altaOrdenProduccion(data);
    /* #swagger.responses[200] = {
               description: 'se crea orden',
               schema: { $ref: '#/definitions/orden' }
       } */
    res.json(resultInsert);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    console.log(error);
  }
});

router.patch("/:id", async function (req, res) {
  // #swagger.tags = ['Orden']
  // #swagger.description = 'Endpoint para modificar orden.'
  //  #swagger.parameters['id'] = { description: 'orden ID' }
  try {
    let orden = { _id: req.params.id };
    let data = req.body;
    /* #swagger.parameters['orden'] = {
             in: 'body',
             description: 'datos para modificar una orden',
             required: true,
             type: 'object',
             schema: { $ref: "#/definitions/orden" }
      } */
    const result = await modelOrdenProduccion.findOneAndUpdate(orden, data);
    /* #swagger.responses[200] = {
             description: 'se modifica orden',
             schema: { $ref: '#/definitions/orden' }
     } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    console.log(error);
  }
});

// router.delete("/:id", async function (req, res) {
//   try {
//     const id = req.params.id;
//     const result = await modelOrdenProduccion.deleteOne({ _id: id });
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

export default router;
