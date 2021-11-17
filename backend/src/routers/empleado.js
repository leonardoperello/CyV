import express from "express";
import { modelEmpleado } from "../schemas/schemaEmpleado";
const router = express.Router();


router.get("/usuario", async function (req, res) {
  try {
    console.log(req.query.usuario)
    const usuario = req.query.usuario;
    const result = await modelEmpleado.findOne({ email: usuario });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
export default router;