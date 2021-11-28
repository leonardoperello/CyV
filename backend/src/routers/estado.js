import { modelTipoDeEstado } from "../schemas/schemaTipoDeEstado";
import { cargarEstado } from "../controllers/altaEstado.controllers";
import {
  tareasAsignadas,
  cambioEstadotareaAsignada,
} from "../controllers/cambioDeEstadoOperario.controllers";
import express from "express";
const router = express.Router();

router.get("/tipoEstado", async function (req, res) {
  //#swagger.tags = ['Estado']
  //#swagger.description = 'Endpoint para obtener los tipos de estado.'
  try {

    const result = await modelTipoDeEstado.find({});
    /* #swagger.responses[200] = { 
               schema: { $ref: "#/definitions/estados" },
               description: 'estados.' 
        } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    res.status(404).send("Error");
  }
});

router.get("/:id", async function (req, res) {
  // #swagger.tags = ['Estado']
  //#swagger.description = 'Endpoint para obtener las tareas asigandas de un operario.'
  //#swagger.parameters['id'] = { description: 'ID de operario.' }
  try {

    if (!(req.params.id.length === 24) || !req.params.id) {
      return res.status(400).send("formato id incorrecto");
    }
    const id = req.params.id;
    const result = await tareasAsignadas(id);
    if (!result) {
      return res.status(200).send("usted no tiene tareas asignadas");
    }
    /* #swagger.responses[200] = { 
              schema: { $ref: "#/definitions/tareas" },
              description: 'tareas del operario.' 
       } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    res.status(404).send("Error, parámetros incorrectos.");
  }
});

router.put("/", async function (req, res) {
  // #swagger.tags = ['Estado']
  //#swagger.description = 'Endpoint para modificar el estado.'
  try {
    let data = req.body;
    /* #swagger.parameters['cambioEstado'] = {
                  in: 'body',
                  description: 'datos para modificar el estado de una tarea, esto puede generar el cambio de esatdo de la oti y de sector',
                  required: true,
                  type: 'object',
                  schema: { $ref: "#/definitions/cambioEstado" }
           } */
    const resultado = await cambioEstadotareaAsignada(data);
    // #swagger.responses[200] = { description: 'se cambio de estado' }
    res.json(resultado);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send("Error, parámetros incorrectos.");
  }
});

export default router;
