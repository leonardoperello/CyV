import express from "express";
import {
  altaOti,
  buscarOrdenes,
  buscarRoscas,
  buscarSectores,
  cargarDatosBasicos,
  cargarSectorYTareas,
  actualizarOrden,
} from "../controllers/altaOti";
import { modelOti } from "../schemas/schemaOti";
import moment from "moment";

const router = new express.Router();

//getOtis
router.get("/", async function (req, res) {
  try {
    const resultado = await modelOti.find({});
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

//getSectores
router.get("/sectores", async function (req, res) {
  try {
    const resultado = await buscarSectores();
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

//getByID
router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const resultado = await modelOti.findOne({ _id: id });
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

//obtener roscas de orden
router.get("/obtenerRoscas/:idOrden", async function (req, res) {
  try {
    let data = req.params.idOrden;
    if (!data || !(data.length === 24)) {
      return res.status(400).send("Formato id incorrecto");
    }
    const resultado = await buscarRoscas(data);
    res.status(200).send(resultado);
  } catch (error) {
    res.status(400).send(error);
  }
});

//obtener ordenes por fecha
router.get("/obtenerOrdenes/:fecha", async function (req, res) {
  try {
    const text = "fecha invalida";
    let data = req.params.fecha;
    if (
      moment(data, "YYYY-MM-DD", true).isValid() &&
      moment(data).isAfter("2019-01-01") &&
      moment(data).isSameOrBefore(moment().toDate())
    ) {
      const resultado = await buscarOrdenes(data);
      res.status(200).send(resultado);
    } else {
      res.status(400).send(text);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//cargar datos basicos de la oti (fechas y rosca)
router.post("/datosBasicos", async function (req, res) {
  try {
    const text = "rosca o fecha invalida";
    let data = req.body;
    if (
      Object.keys(data.rosca).length !== 0 &&
      data.rosca !== undefined &&
      moment(data.fechaI, "YYYY-MM-DD", true).isValid() &&
      moment(data.fechaI).isAfter("2019-01-01") &&
      moment(data.fechaI).isSameOrBefore(moment().toDate())
    ) {
      const resultado = await cargarDatosBasicos(data);
      res.status(200).send(resultado);
    } else {
      res.status(400).send(text);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

//cargar un sector y tareas de ese sector
router.put("/sectoresYTareas", async function (req, res) {
  try {
    let data = req.body;
    if (
      data.tareas.length !== 0 &&
      Object.keys(data.sector).length !== 0 &&
      data.id.length === 24 &&
      typeof data.sector.nombre === "string" &&
      typeof data.sector.activo === "boolean"
    ) {
      const resultado = await cargarSectorYTareas(data);
      res.status(200).send(resultado);
    } else {
      return res.status(400).send("Error en el ingreso de los datos");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/actualizarOrden", async function (req, res) {
  try {
    let data = req.body;
    if (
      data.idOti.length === 24 &&
      data.idOrden.length === 24 &&
      moment(data.fechaI, "YYYY-MM-DD", true).isValid() &&
      moment(data.fechaI).isSameOrBefore(moment().toDate())
    ) {
      const resultado = await actualizarOrden(data);
      res.status(200).send(resultado);
    } else {
      return res.status(400).send("Error en el ingreso de datos");
    }
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

export default router;
