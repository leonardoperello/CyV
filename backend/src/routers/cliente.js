import express from "express";
import { modelCliente } from "../schemas/schemaCliente";
const router = express.Router();

router.get("/", async function (req, res) {
  // #swagger.tags = ['Cliente']
  // #swagger.description = 'Endpoint para obtener todos los clientes'
  try {
    const result = await modelCliente.find({});
    /* #swagger.responses[200] = { 
             schema: { $ref: "#/definitions/clientes" },
             description: 'clientes' 
      } */
    res.json(result.reverse());
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    res.status(404).send("Error");
  }
});

router.get("/:cuit", async function (req, res) {
  // #swagger.tags = ['Cliente']
  // #swagger.description = 'Endpoint para obtener un cliente'
  //#swagger.parameters['cuit'] = { description: 'cuit de la empresa.' }
  try {
    if (!typeof req.params.cuit === "string" || req.params.cuit.length !== 11) {
      return res.status(400).send("El formato del CUIT es incorrecto");
    }
    const cuit = req.params.cuit;
    const result = await modelCliente.findOne({ CUIT: cuit }); //buscamos al clinete por su cuit
    /* #swagger.responses[200] = { 
              schema: { $ref: "#/definitions/cliente" },
              description: 'cliente' 
       } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    res.status(404).send("Error");
  }
});

router.post("/", async function (req, res) {
  // #swagger.tags = ['Cliente']
  // #swagger.description = 'Endpoint para crear un cliente'

  let data = req.body;
  /* #swagger.parameters['cliente'] = {
                 in: 'body',
                 description: 'datos para crear cliente',
                 required: true,
                 type: 'object',
                 schema: { $ref: "#/definitions/cliente" }
          } */
  try {
    const resultInsert = await modelCliente.create(data);
    /* #swagger.responses[200] = { 
                  schema: { $ref: "#/definitions/cliente" },
                  description: 'cliente' 
           } */
    res.json(resultInsert);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    res.status(404).send("Error");
  }
});

router.put("/:id", async function (req, res) {
  // #swagger.tags = ['Cliente']
  // #swagger.description = 'Endpoint para modificar cliente'
  //#swagger.parameters['id'] = { description: 'ID cliente' }
  try {
    let orden = { _id: req.params.id };
    let data = req.body;
    /* #swagger.parameters['cliente'] = {
                 in: 'body',
                 description: 'datos para crear cliente',
                 required: true,
                 type: 'object',
                 schema: { $ref: "#/definitions/cliente" }
          } */
    const result = await modelCliente.findOneAndUpdate(orden, data);
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    res.status(404).send("Error");
  }
});



export default router;
