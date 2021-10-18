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

const altaTarea = async (req, res) => {
  try {
    moment().format("YYYY/MM/DD");
    const tarea = new modelTarea({
      descripcion: req.body.descripcion,
      nombre: req.body.nombre,
      fechaInicio: moment().format(req.body.fechaI),
      fechaFin: moment().format(req.body.fechaF),
      numeroDeOrden: req.body.numero,
      tipoDeTarea: req.body.tipoDeTarea,
      sector: req.body.sector,
      idOperario: "",
      estado: [],
    });

    const data = {
      fechaInicio: moment().format(req.body.fechaI),
      fechaFin: moment().format(req.body.fechaF),
      observacion: "creado correctamente",
      tipoEstado: {
        nombre: req.body.nombreEstado,
        descripcion: req.body.descripcionEstado,
      },
    };
    const nuevoEstado = await cargarEstado(data);
    //console.log(nuevoEstado);
    tarea.estado.push(nuevoEstado);
    const tt = await tarea.save();

    res.status(200).send(tt);
  } catch (error) {
    res.status(400).send(error);
  }
};
/*
    const nuevaTarea = {
      descripcion: req.body.descripcion,
      nombre: req.body.nombre,
      fechaInicio: moment().format(req.body.fechaInicio),
      fechaFin: moment().format(req.body.fechaFin),
      numeroDeOrden: req.body.numeroDeOrden,
      tipoDeTarea: req.body.tipoDeTarea,
      sector: { nombre: req.body.sector, operario: {} },
      operario: {},
      estado: {
        fechaInicio: moment().format(req.body.fechaInicioEs),
        fechaFin: moment().format(req.body.fechaFinEs),
        observacion: req.body.observacion,
        tipoDeEstado: {
          nombre: req.body.nombreTipo,
          descripcion: req.body.descripcionTipo,
        },
      },
    };

    const res = await modelTarea.create(req.body);
    res.status(200).send(res);
  } catch (error) {
    res.status(400).send(req.body);
  }*/

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

export default {
  getTareas,
  getByID,
  altaTarea,
  patchTarea,
  deleteTarea,
  putTarea,
};
