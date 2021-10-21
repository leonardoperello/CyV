import express from "express";
import { modelSector } from "../schemas/schemaSector";
const router = new express.Router();

router.get("/", async function (req, res) {
    try {
        const result = await modelSector.find({});
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async function (req, res) {
    let data = req.body;
    try {
        const resultInsert = await modelSector.create(data);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get("/:nombre", async function (req, res) {
    try {
        const nombre = req.params.nombre;
        const resultado = await modelSector.find({ 'operarios.nombre': nombre });
        res.status(200).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/:id", async function (req, res) {
    try {
        let tarea = { _id: req.params.id };
        let data = req.body;
        const resultado = await modelSector.findOneAndUpdate(tarea, data);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const resultado = await modelSector.deleteOne({ _id: id });
        res.status(200).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;