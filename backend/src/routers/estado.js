import express from "express";
import { modelTarea } from "../schemas/schemaTarea";
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const result = await modelTarea.find({});
    res.json(result.reverse());
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await modelTarea.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  let data = req.body;
  try {
    const resultInsert = await modelTarea.create(data);
    res.json(resultInsert);
  } catch (error) {
    console.log(error);
  }
});

// no se si esta bien esa linea que dice let tarea
router.patch("/:id", async function (req, res) {
  try {
    let estado = { _id: req.params.id };
    let data = req.body;
    const result = await modelTarea.findOneAndUpdate(estado, data);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await modelTarea.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
export default router;
