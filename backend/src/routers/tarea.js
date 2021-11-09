import express from "express";
import { altaTarea } from "../controllers/altaTarea";
import { obtenerTareas, obtenerOtisDelSector, verificarEstadoTarea, asignarTareaOperario } from "../controllers/altaAsignarTareas";
import { modelTarea } from "../schemas/schemaTarea";
const router = new express.Router();

router.get("/obtenerOtis", async function (req, res) {
    try {
        if (req.query.id !== 'deposito') {
            return res.status(400).send('El sector no existe');
        }
        const idSector = req.query.id;
        const result = await obtenerOtisDelSector(idSector);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.get("/obtenerTareas", async function (req, res) {
    try {
        if (typeof req.query.id !== 'string' || req.query.id.length !== 24) {
            return res.status(400).send('El formato del id es incorrecto');
        }
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
        if (typeof req.body.observacion !== 'string') {
            console.log('OBSERVACION');
            return res.status(400).send('El formato de la observacion es incorrecto');
        }
        if (typeof req.body.idOti !== 'string' || req.body.idOti.length !== 24) {
            console.log('OTI');
            return res.status(400).send('El formato del id de Oti es incorrecto');
        }
        if (typeof req.body.idOperario !== 'string' || req.body.idOperario.length !== 24) {
            console.log('OPERARIO');
            return res.status(400).send('El formato del id del operario es incorrecto');
        }
        if (Object.keys(req.body.tareas).length === 0) {
            console.log('tarea');
            return res.status(400).send('No existe una tarea');
        }
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
