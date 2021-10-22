import express from "express";
import { altaTarea } from "../controllers/altaTarea";
import { obtenerTareas, obtenerOtisDelSector, verificarEstadoTarea, asignarTareaOperario } from "../controllers/altaAsignarTareas";
import { modelTarea } from "../schemas/schemaTarea";
const router = new express.Router();

router.get("/obtenerOtis", async function (req, res) {
    try {
        const idSector = req.query.id;
        const result = await obtenerOtisDelSector(idSector);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.get("/obtenerTareas", async function (req, res) {
    try {
        const idOti = req.query.id;
        const result = await obtenerTareas(idOti);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});
router.post("/asignarTarea", async function (req, res) {
    try {
        let data = req.body;
        const resultado = await asignarTareaOperario(data);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});
router.get("/:id", async function (req, res) {
    try {
        console.log(req.params)

        const resultado = await obtenerOtisDelSector(id);
        res.status(200).send(resultado);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.patch("/:id", async function (req, res) {
    try {
        await verificarEstadoTarea(req.params);
        res.status(200).send('OK');
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

router.get("/obtener/:nombre", async (req, res, next) => {
    return await obtenerTareas(req.params.nombre);
});


export default router;
