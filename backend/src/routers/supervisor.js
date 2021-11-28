import express from "express";
import { modelSupervisor } from "../schemas/schemaSupervisor";
const router = express.Router();

router.get("/", async function (req, res) {
  // #swagger.tags = ['Supervisor']
  // #swagger.description = 'Endpoint para obtener los supervisores.'
  try {
    const result = await modelSupervisor.find({});
    /* #swagger.responses[200] = {
                 description: 'array de supervisores',
                 schema: { $ref: '#/definitions/arraySupervisores' }
         } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    console.log(error);
  }
});

router.get("/:id", async function (req, res) {
  // #swagger.tags = ['Supervisor']
  // #swagger.description = 'Endpoint para obtener un supervisor.'
  //  #swagger.parameters['id'] = { description: 'Supervisor ID' }
  try {
    const id = req.params.id;
    const result = await modelSupervisor.findOne({ _id: id });
    /* #swagger.responses[200] = {
               description: 'SUpervisor encontrado',
               schema: { $ref: '#/definitions/supervisor' }
       } */
    res.json(result);
  } catch (error) {
    // #swagger.responses[404] = { description: 'Error ' }
    console.log(error);
  }
});

// router.post("/", async function (req, res) {
//   let data = req.body;
//   try {
//     const resultInsert = await modelSupervisor.create(data);
//     res.json(resultInsert);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.patch("/:id", async function (req, res) {
//   try {
//     let supervisor = { _id: req.params.id };
//     let data = req.body;
//     const result = await modelSupervisor.findOneAndUpdate(supervisor, data);
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//   }
// });

// router.delete("/:id", async function (req, res) {
//   try {
//     const id = req.params.id;
//     const result = await modelSupervisor.deleteOne({ _id: id });
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//   }
// });
export default router;
