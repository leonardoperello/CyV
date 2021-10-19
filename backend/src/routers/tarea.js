import express from "express";
import tareaController, { altaTarea } from "../controllers/altaTarea";
import { modelTarea } from "../schemas/schemaTarea";
const router = new express.Router();

router.get("/", async function (req, res) {
  try {
    const result = await modelTarea.find({});
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  try {
    let data = req.body;
    const resultado = await altaTarea(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelTarea.findOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", async function (req, res) {
  try {
    let tarea = { _id: req.params.id };
    let data = req.body;
    const resultado = await modelTarea.findOneAndUpdate(tarea, data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelTarea.deleteOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
