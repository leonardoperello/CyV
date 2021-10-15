import express from "express";
import { modelOti } from "../schemas/schemaOti";
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
    const id = req.params.otiID;
    const oti = await modelOti.findOne({ _id: id });
    res.status(200).send(oti);
  } catch (error) {
    res.status(400).send(error);
  }
};

const postOti = async (req, res) => {
  try {
    const dataOti = req.body.datosOTI; //datos basicos y oti
    const fechas = req.body.fechas; // fechas de orden de produccion
    const orden = await model.find(); //obtener orden de produccion
    //ordenarlas por fechas
    //seleccionar una
    const rosca = model.findOne(orden);
    for (let index = 0; index < array.length; index++) {
      const element = array[index];
      //ir a metodo de cargar tareas
    }
    //ir a alta estado oti con estado = inializada
    const res = await modelOti.create(data);
    res.status(200).send(res);
    //actualizar orden
    const resOrden = await modelOrdenProduccion.findOneAndUpdate(orden, res);
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

export default { getOtis, getByID, postOti, patchOti, deleteOti };
