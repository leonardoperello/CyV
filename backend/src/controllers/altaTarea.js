import express from "express";
import { modelTarea } from "../schemas/schemaTarea";
import { cargarEstado } from "./altaEstado.controllers";
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

export async function altaTarea(data) {
  moment().format("YYYY/MM/DD");
  const tarea = new modelTarea({
    descripcion: data.descripcion,
    nombre: data.nombre,
    fechaInicio: moment().format(data.fechaI),
    fechaFin: moment().format(data.fechaF),
    numeroDeOrden: data.numero,
    tipoDeTarea: data.tipoDeTarea,
    sector: data.sector,
    idOperario: "",
    estado: [],
  });

  const dataTipo = {
    fechaInicio: moment().format(data.fechaI),
    fechaFin: moment().format(data.fechaF),
    observacion: "creado correctamente",
    tipoEstado: {
      nombre: data.nombreEstado,
      descripcion: data.descripcionEstado,
    },
  };
  const nuevoEstado = await cargarEstado(dataTipo);

  tarea.estado.push(nuevoEstado);
  const tt = await tarea.save();

  return tt;
}

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

const putTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await modelTarea.findOneAndUpdate({ _id: id });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};
