import express from "express";
import { modelEmpleado } from "../schemas/schemaEmpleado";
const router = express.Router();


router.get("/usuario", async function (req, res) {
  // #swagger.tags = ['Empleado']
  // #swagger.description = 'Endpoint para obtener un empleado'
  /*  #swagger.parameters['usuario'] = {
           in: 'query',
           description: 'un email de google'
   } */
  try {
    const usuario = req.query.usuario;
    const result = await modelEmpleado.findOne({ email: usuario });
    /* #swagger.responses[200] = {
                   description: 'Usuario encontrado',
                   schema: { $ref: '#/definitions/empleado' }
           } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ,usuario incorrecto' }
    res.status(404).send("Error, usuario incorrectos.");
  }
});
export default router;