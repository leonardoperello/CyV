/*import express from "express";
import modelOrdenProduccion from "./schemaSupervisor";
import modelOti from "./schemaOti";

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const result = await modelOrdenProduccion.find({});
    res.json(result.reverse());
  } catch (error) {
    console.log(error);
  }
});

router.createOti("/", async function (req, res) {

    // tenemos que modificar la orden de produccion que se asocie con esta oti
  try {
    const oti = new modelOti({
        ...req.body,
        rosca: req.params.roscaID,
        sector: req.params.sectorID,
        tareas: req.params.memeID,
    })
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
*/
