import express from "express";
import { modelOti } from "../schemas/schemaOti";
import { altaTarea } from "./altaTarea";
import { cargarEstado } from "./altaEstado.controllers";
import { modelOrdenProduccion } from "../schemas/schemaOrdenProduccion";
import { modelSector } from "../schemas/schemaSector";
import { modelRosca } from "../schemas/schemaRosca";
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
    const id = req.params.id;
    const oti = await modelOti.findOne({ _id: id });
    res.status(200).send(oti);
  } catch (error) {
    res.status(400).send(error);
  }
};

export async function cargarDatosBasicos(data) {
  moment().format("YYYY/MM/DD");
  const oti = new modelOti();
  //fechas de la OTI

  oti.fechaInicio = moment().format(data.fechaI);
  oti.fechaFin = moment().format(data.fechaF);

  oti.rosca = data.rosca;
  oti.sector = [];
  oti.tareas = [];
  oti.estados = [];

  const nuevaOti = await oti.save();

  return nuevaOti._id;
}

export async function cargarSectorYTareas(data) {
  const idOti = { _id: data.id };
  const oti = await modelOti.findOne(idOti);
  oti.sector.push(data.sector);

  for (let index = 0; index < data.tareas.length; index++) {
    //hacer control de que sea el mismo sector que el sector y que el orden este bien
    if (data.tareas[index].sector.nombre === data.sector.nombre) {
      const element = await altaTarea(data.tareas[index]);
      oti.tareas.push(element);
    } else {
      console.log(
        "El sector no corresponde con la tarea que se quiere agregar"
      );
    }
  }

  const result = await modelOti.findOneAndUpdate(idOti, oti);

  //si es la última tarea del sector deposito deberia actualizar la orden de produccion y finalizar

  return "actualización correcta" + result;
}

export async function actualizarOrden(data) {
  const idOti = { _id: data.idOti };
  const oti = await modelOti.findOne(idOti);
  const idOrden = { _id: data.idOrden };
  const orden = await modelOti.findOne(idOrden);
  const long = oti.sector.length;
  const result = "";
  if (oti.sector[long - 1].nombre === "deposito") {
    orden.oti = oti;
    result = await modelOrdenProduccion.findOneAndUpdate(idOrden, orden);
  } else {
    result = "La OTI todavía no cargo todas las tareas de todos los sectores";
  }
  return result;
}

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

export async function buscarOrdenes(data) {
  const queryOrden = { fecha: data };
  const ordenes = await modelOrdenProduccion.find(queryOrden);
  if (ordenes) {
    const ordenesResult = [];
    for (let index = 0; index < ordenes.length; index++) {
      const orden = ordenes[index];
      const id = orden._id;
      const fecha = orden.fecha;
      const detalle = orden.detalle;
      const rosca = orden.rosca;
      const result = {
        id,
        fecha,
        detalle,
        rosca,
      };
      ordenesResult.push(result);
    }
    return JSON.stringify(ordenesResult);
  } else {
    return "No se encuentran ordenes en esa fecha";
  }
}

export async function buscarRoscas(data) {
  const queryOrden = { _id: data };
  const orden = await modelOrdenProduccion.findOne(queryOrden);
  const roscas = orden.rosca;
  if (roscas) {
    const roscasResult = [];
    for (let index = 0; index < roscas.length; index++) {
      const rosca = roscas[index];
      const id = rosca._id;
      const descripcionTecnica = rosca.descripcionTecnica;
      const medida = rosca.medida;
      const tipoDeRosca = rosca.tipoDeRosca;
      const result = {
        id,
        descripcionTecnica,
        medida,
        tipoDeRosca,
      };
      roscasResult.push(result);
    }
    return JSON.stringify(roscasResult);
  } else {
    return "Error buscando roscas de una orden de producción";
  }
}

export async function buscarSectores() {
  const sectores = await modelSector.find({});
  console.log("llego aca");
  return sectores;
}

export async function verificarEstadoOti(data) {
  const queryOti = { _id: data.idOti };
  const oti = await modelOti.findOne(queryOti);
  if (
    oti.estados[oti.estados.length - 1].tipoDeEstado.nombre === "iniciada" ||
    oti.estados[oti.estados.length - 1].tipoDeEstado.nombre === "detenida"
  ) {
    oti.estados[oti.estados.length - 1].tipoDeEstado.nombre === "en progreso";
  }
}

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
