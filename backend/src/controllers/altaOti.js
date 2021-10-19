import express from "express";
import { modelOti } from "../schemas/schemaOti";
import { altaTarea } from "./altaTarea";
import { cargarEstado } from "./altaEstado.controllers";
import { modelOrdenProduccion } from "../schemas/schemaOrdenProduccion";
import moment from "moment";

const router = express.Router();

const getOtis = async (req, res) => {
  try {
    const otis = await modelOti.find();
    res.status(200).send(otis);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getByID = async (req, res) => {
  try {
    //const oti = await modelOti.findById(req.params.id);
    const id = req.params.id;
    const oti = await modelOti.findOne({ _id: id });
    res.status(200).send(oti);
  } catch (error) {
    res.status(400).send(error);
  }
};

export async function altaOti(data) {
  moment().format("YYYY/MM/DD");
  const nuevaOti = new modelOti();
  //fechas de la OTI

  nuevaOti.fechaInicio = moment().format(data.fechaI);
  nuevaOti.fechaFin = moment().format(data.fechaF);
  const queryOrden = { _id: data.idOrden };

  const orden = await modelOrdenProduccion.findOne(queryOrden);
  const rosca = orden.rosca[0];
  nuevaOti.rosca = rosca;

  //sectores
  for (let index = 0; index < data.sectores.length; index++) {
    const element = data.sectores[index];
    nuevaOti.sector.push(element);
  }

  //tareas
  for (let index = 0; index < data.tareas.length; index++) {
    const element = await altaTarea(data.tareas[index]);
    nuevaOti.tareas.push(element);
  }

  const dataEstado = {
    fechaInicio: moment().format(data.fechaI),
    fechaFin: moment().format(data.fechaF),
    observacion: "creado correctamente",
    tipoEstado: {
      nombre: "iniciada",
      descripcion: "se ha inicializado correctamente",
    },
  };

  const est = await cargarEstado(dataEstado);
  nuevaOti.estados.push(est);

  const tt = await nuevaOti.save();
  orden.oti = tt;
  //actualizar orden
  const resOrden = await modelOrdenProduccion.findOneAndUpdate(
    queryOrden,
    orden
  );
  return tt;
}

const patchOti = async (req, res) => {
  try {
    const oti = req.params.otiID;
    let data = req.body;
    const result = await modelOti.findOneAndUpdate(oti, data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteOti = async (req, res) => {
  try {
    const id = req.params.otiID;
    const result = await modelOti.deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

/*
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
