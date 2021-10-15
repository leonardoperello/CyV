import { modelTipoDeEstado } from '../schemas/schemaTipoDeEstado';
import { tareasAsigandas } from '../controllers/cambioDeEstadoOperario.controllers';
import express from "express";
const router = express.Router();
//este metodo retorna las tareas asignadas a un operario
router.get("/:id", async function (req, res) {
    try {
        const result = await tareasAsigandas(id);
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.put("/", async function (req, res) {
    try {
        let data = req.body;
        const resultado = await cargarEstado(data);
        res.json(resultado);
    }
    catch (error) {
        console.log(error);
    }

});



export default router;