import express from "express";
import { modelRosca } from "../schemas/schemaRosca";
import { altaRosca } from "../controllers/altaRosca";
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const resultado = await modelRosca.find({});
    res.status(200).send(resultado.reverse());
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelRosca.findOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async function (req, res) {
  let data = req.body;
  try {
    const resultado = await altaRosca(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", async function (req, res) {
  try {
    let rosca = { _id: req.params.id };
    let data = req.body;
    const resultado = await modelRosca.findOneAndUpdate(rosca, data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelRosca.deleteOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
