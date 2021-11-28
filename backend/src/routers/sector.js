import express from "express";
import { modelSector } from "../schemas/schemaSector";
const router = new express.Router();

router.get("/", async function (req, res) {
  // #swagger.tags = ['Sector']
  // #swagger.description = 'Endpoint para obtener todos los sectores.'
  try {
    const result = await modelSector.find({});
    /* #swagger.responses[200] = {
            description: 'se obtiene sectores',
            schema: { $ref: '#/definitions/arraySector' }
    } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    console.log(error);
  }
});

router.get("/:nombre", async function (req, res) {
  // #swagger.tags = ['Sector']
  // #swagger.description = 'Endpoint para obtener un sector.'
  //  #swagger.parameters['nombre'] = { description: 'nombre del sector' }
  try {
    const nombre = req.params.nombre;
    const resultado = await modelSector.find({ "operarios.nombre": nombre });
    /* #swagger.responses[200] = {
            description: 'se obtiene sector',
            schema: { $ref: '#/definitions/sector' }
    } */
    res.status(200).send(resultado);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send(error);
  }
});

// router.patch("/:id", async function (req, res) {

//   try {
//     let tarea = { _id: req.params.id };
//     let data = req.body;
//     const resultado = await modelSector.findOneAndUpdate(tarea, data);
//     res.status(200).send(resultado);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.delete("/:id", async function (req, res) {

//   try {
//     const id = req.params.id;
//     const resultado = await modelSector.deleteOne({ _id: id });
//     res.status(200).send(resultado);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

export default router;
