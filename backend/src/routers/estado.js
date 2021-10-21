import { modelTipoDeEstado } from "../schemas/schemaTipoDeEstado";
import { cargarEstado } from "../controllers/altaEstado.controllers";
import { tareasAsignadas, cambioEstadotareaAsignada } from "../controllers/cambioDeEstadoOperario.controllers";
import express from "express";
const router = express.Router();


router.get("/", async function (req, res) {
  try {
    const result = await modelTipoDeEstado.find({});
    res.json(result);
  } catch (error) {
    res.status(422).send('Error, no existe la coleccion');
  }
});

router.post("/", async function (req, res) {
  try {
    let data = req.body;
    const resultado = await cargarEstado(data);
    res.json(resultado);
  } catch (error) {
    res.status(404).send('Error, parámetros incorrectos.');
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await tareasAsignadas(id);
    res.json(result);
  } catch (error) {
    res.status(404).send('Error, parámetros incorrectos.');
  }
});

router.put("/", async function (req, res) {
  try {
    let data = req.body;
    const resultado = await cambioEstadotareaAsignada(data);
    res.json(resultado);
  } catch (error) {
    res.status(404).send('Error, parámetros incorrectos.');
  }
});

export default router;
