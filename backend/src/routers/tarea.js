import express from "express";
import { altaTarea } from "../controllers/altaTarea";
import {
  obtenerTareas,
  obtenerOtisDelSector,
  verificarEstadoTarea,
  asignarTareaOperario,
} from "../controllers/altaAsignarTareas";
import { modelTarea } from "../schemas/schemaTarea";
const router = new express.Router();

router.get("/obtenerOtis/:nombre", async function (req, res) {
  // #swagger.tags = ['Tarea']
  // #swagger.description = 'Endpoint para obtener las otis del sector.'
  //  #swagger.parameters['nombre'] = { description: 'nombre del sector' }
  try {
    if (req.params.nombre !== "corte" &&
      req.params.nombre !== "torneria" &&
      req.params.nombre !== "fosfatizado" &&
      req.params.nombre !== "granallado" &&
      req.params.nombre !== "calidad" &&
      req.params.nombre !== "deposito"
    ) {
      return res.status(400).send('El sector no existe');
    }
    const nombreSector = req.params.nombre;
    const result = await obtenerOtisDelSector(nombreSector);
    /* #swagger.responses[200] = {
          description: 'se obtiene otis',
          schema: { $ref: '#/definitions/arrayOti' }
  } */
    res.status(200).send(result);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    console.log(error);
  }
});

router.get("/obtenerTareas/:id", async function (req, res) {
  // #swagger.tags = ['Tarea']
  // #swagger.description = 'Endpoint para obtener las tareas asigandas de un operario.'
  //  #swagger.parameters['id'] = { description: 'ID de oti' }
  try {
    if (typeof req.params.id !== "string" || req.params.id.length !== 24) {
      return res.status(400).send("El id ingresado es incorrecto");
    }
    const idOti = req.params.id;
    const result = await obtenerTareas(idOti);
    /* #swagger.responses[200] = {
          description: 'se obtiene tareas de un oti',
          schema: { $ref: '#/definitions/tareas' }
  } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    console.log(error);
  }
});

router.post("/asignarTarea", async function (req, res) {
  // #swagger.tags = ['Tarea']
  // #swagger.description = 'Endpoint para asignar tarea a un operario.'
  try {
    let data = req.body;
    /* #swagger.parameters['asignarTarea'] = {
              in: 'body',
              description: 'datos para asignar una tarea',
              required: true,
              schema: { $ref: "#/definitions/asignarTarea" }
       } */
    if (typeof req.body.observacion !== "string") {
      return res.status(400).send("El formato de la observacion es incorrecto");
    }
    if (typeof req.body.idOti !== "string" || req.body.idOti.length !== 24) {
      return res.status(400).send("El formato del id de Oti es incorrecto");
    }
    if (
      typeof req.body.idOperario !== "string" ||
      req.body.idOperario.length !== 24
    ) {
      return res
        .status(400)
        .send("El formato del id del operario es incorrecto");
    }
    if (Object.keys(req.body.tareas).length === 0) {
      return res.status(400).send("No existe una tarea");
    }
    const resultado = await asignarTareaOperario(data);
    /* #swagger.responses[200] = {
             description: 'se obtiene tareas de un oti',
             schema: { $ref: '#/definitions/oti' }
     } */

    res.status(200).send(resultado);
  } catch (error) {
    // #swagger.responses[400] = { description: 'Error ' }
    res.status(400).send(error);
  }
});

// router.put("/:id", async function (req, res) {

//   try {
//     await verificarEstadoTarea(req.params);
//     res.status(200).send("OK");
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.delete("/:id", async function (req, res) {

//   try {
//     const id = req.params.id;
//     const resultado = await modelTarea.deleteOne({ _id: id });
//     res.status(200).send(resultado);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// router.get("/obtener/:nombre", async (req, res, next) => {

//   return await obtenerTareas(req.params.nombre);
// });

export default router;
