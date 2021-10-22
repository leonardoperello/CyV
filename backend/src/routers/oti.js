import express from "express";
import {
  altaOti,
  buscarOrdenes,
  buscarRoscas,
  buscarSectores,
} from "../controllers/altaOti";
import { modelOti } from "../schemas/schemaOti";
import { modelSector } from "../schemas/schemaSector";

const router = new express.Router();

router.get("/", async function (req, res) {
  try {
    const resultado = await modelOti.find({});
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/", async function (req, res) {
  try {
    let data = req.body;
    const resultado = await altaOti(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelOti.findOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/:id", async function (req, res) {
  try {
    await verificarEstadoOti(req.params); //
    res.status(200).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelOti.deleteOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/obtenerOrdenes/:fecha", async function (req, res) {
  try {
    let data = req.params.fecha;
    const resultado = await buscarOrdenes(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/obtenerRoscas/:idOrden", async function (req, res) {
  try {
    let data = req.params.idOrden;
    const resultado = await buscarRoscas(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/obtenerSectores", async function (req, res) {
  try {
    let data;// = req.params.idOrden;
    console.log("estoy en la ruta");
    const resultado = await modelSector.find(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
