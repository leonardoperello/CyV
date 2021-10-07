import { modelTipoDeEstado } from '../schemas/schemaTipoDeEstado';
import { cargarEstado } from '../controllers/oti.controllers';

router.get("/", async function (req, res) {
    try {
        const result = await modelTipoDeEstado.find({});
        res.json(result);
    } catch (error) {
        console.log(error);
    }
});

router.post("/", async function (req, res) {
    try {
        const resultado = await cargarEstado(req.body);
        res.json(resultado);
    }
    catch (error) {
        console.log(error);
    }

});

export default router;