import { modelTipoDeEstado } from "../schemas/schemaTipoDeEstado";
import { cargarEstado } from "../controllers/altaEstado.controllers";
import express from "express";
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const result = await modelTipoDeEstado.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  try {
    let data = req.body;
    const resultado = await cargarEstado(data);
    res.json(resultado); 
  } catch (error) {
    console.log(error);
  }
});

export default router;
