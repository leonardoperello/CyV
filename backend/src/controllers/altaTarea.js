import express from "express";
import { modelTarea } from "../schemas/schemaTarea";
import { modelSector } from "../schemas/schemaSector";
import { modelTipoDeTarea } from "../schemas/schemaTipoDeTarea";

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
  let data = req.body;
  try {
    const nuevaTarea = await modelTarea.create(data);
    res.status(200).send(nuevaTarea);
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
