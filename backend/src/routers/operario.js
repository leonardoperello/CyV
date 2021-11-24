import express from "express";
import { modelOperario } from "../schemas/schemaOperario";
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const result = await modelOperario.find({});
    res.json(result.reverse());
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await modelOperario.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/operarioSector/:nombreSector", async function (req, res) {
  try {
    if (req.params.nombre !== "corte" &&
    req.params.nombreSector !== "torneria" &&
    req.params.nombreSector !== "fosfatizado" &&
    req.params.nombreSector !== "granallado" &&
    req.params.nombreSector !== "calidad" &&
    req.params.nombreSector !== "deposito"
    ) {
      return res.status(400).send('El sector no existe');
    }
    const nombre = req.params.nombreSector;
    const result = await modelOperario.find({ 'sector.nombre': nombre });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  let data = req.body;
  try {
    const resultInsert = await modelOperario.create(data);
    res.json(resultInsert);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async function (req, res) {
  try {
    let operario = { _id: req.params.id };
    let data = req.body;
    const result = await modelOperario.findOneAndUpdate(operario, data);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await modelOperario.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
export default router;
