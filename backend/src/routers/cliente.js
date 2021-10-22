import express from "express";
import { modelCliente } from "../schemas/schemaCliente";
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const result = await modelCliente.find({});
        res.json(result.reverse());
    } catch (error) {
        console.log(error);
    }
});

router.get("/:cuit", async function (req, res) {
    try {
        const cuit = req.params.cuit;
        const result = await modelCliente.findOne({ CUIT: cuit });//buscamos al clinete por su cuit
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async function (req, res) {
    let data = req.body;
    try {
        const resultInsert = await modelCliente.create(data);
        // Deberia llamar a un metodo que me cree una nueva rosca y mandarselo al metodo de altaOrdenProduccion?
        // const resultInsert = await altaOrdenProduccion(data);
        res.json(resultInsert);
    } catch (error) {
        console.log(error);
    }
});

router.patch("/:id", async function (req, res) {
    try {
        let orden = { _id: req.params.id };
        let data = req.body;
        const result = await modelCliente.findOneAndUpdate(orden, data);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.delete("/:id", async function (req, res) {
    try {
        const id = req.params.id;
        const result = await modelCliente.deleteOne({ _id: id });
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

export default router;
