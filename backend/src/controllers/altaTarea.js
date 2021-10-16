import express from "express";
import { modelTarea } from "../schemas/schemaTarea";
import moment from "moment";

const router = express.Router();

const getTareas = async (req, res) => {
  try {
    const tareas = await modelTarea.find();
    res.status(200).send(tareas);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getByID = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await modelTarea.findOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const altaTarea = async (req, res) => {
  try {
    // const idTipo = req.params.data.idTipo;
    // const idSector = req.params.data.idSector;
    // const sector = modelSector.findOne({ _id: idTipo });
    // const tipoTarea = modelTipoDeTarea.findOne({ _id: idSector });
    const dataTarea = req.body;

    const nuevaTarea = {
      descripcion: dataTarea.descripcion,
      nombre: dataTarea.nombre,
      fechaInicio: moment().format(dataTarea.fechaInicio),
      fechaFin: moment().format(dataTarea.fechaFin),
      numeroDeOrden: dataTarea.numeroDeOrden,
      tipoDeTarea: dataTarea.tipoDeTarea,
      sector: dataTarea.sector,
      operario: {},
      estado: {
        fechaInicio: moment().format(dataTarea.fechaInicio),
        fechaFin: moment().format(dataTarea.fechaFin),
        observacion: "obs_2",
        tipoDeEstado: {
          nombre: "inicializada",
          descripcion: "se ha inicializado con exito",
        },
      },
    };
    const res = await modelTarea.create(nuevaTarea);
    res.status(200).send(res);
  } catch (error) {
    res.status(400).send(error);
  }
};

const patchTarea = async (req, res) => {
  try {
    let tarea = { _id: req.params.id };
    let data = req.body;
    const result = await modelTarea.findOneAndUpdate(tarea, data);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await modelTarea.deleteOne({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default { getTareas, getByID, altaTarea, patchTarea, deleteTarea };
