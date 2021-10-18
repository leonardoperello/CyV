import express from "express";
import { modelOti } from "../schemas/schemaOti";
import { altaTarea } from "../controllers/altaTarea";
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

const altaOti = async (req, res) => {
  try {
    moment().format("YYYY/MM/DD");
    const nuevaOti = new modelOti();
    //fechas de la OTI
    nuevaOti.fechaInicio = moment().format(req.body.fechaI);
    nuevaOti.fechaFin = moment().format(req.body.fechaF);
    const queryOrden = { _id: req.body.idOrden };

    const orden = await modelOrdenProduccion.findOne(queryOrden);
    const rosca = orden.rosca[0];
    nuevaOti.rosca = rosca;

    //sectores
    for (let index = 0; index < req.body.sectores.length; index++) {
      const element = req.body.sectores[index].nombre;
      nuevaOti.sector.push(element);
    }
    console.log(nuevaOti.sector);
    //tareas
    for (let index = 0; index < req.body.tareas.length; index++) {
      console.log(req.body.tareas[index]); 
      const element = await altaTarea(req.body.tareas[index]);
      console.log(element);
      nuevaOti.tareas.push(element);
    }

    console.log("sali de los for, ya termine");
    const data = {
      fechaInicio: moment().format(req.body.fechaI),
      fechaFin: moment().format(req.body.fechaF),
      observacion: "creado correctamente",
      tipoEstado: {
        nombre: "inicializado",
        descripcion: "se ha inicializado correctamente",
      },
    };

    const est = await cargarEstado(data);
    nuevaOti.estados.push(est);

    const tt = await nuevaOti.save();

    res.status(200).send(tt);
    //actualizar orden
    const resOrden = await modelOrdenProduccion.findOneAndUpdate(
      req.body.idOrden,
      nuevaOti
    );
    res.status(200).send(resOrden);
  } catch (error) {
    res.status(400).send(error);
  }
};

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

export default { getOtis, getByID, altaOti, patchOti, deleteOti };

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
