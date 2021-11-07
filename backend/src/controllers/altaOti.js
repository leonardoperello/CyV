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
  // la fecha de fin no la sabemos por lo que queda null
  oti.fechaInicio = moment().format(data.fechaI);
  oti.fechaFin = data.fechaF ? moment(data.fechaF) : null;
  oti.rosca = data.rosca;
  oti.sector = [];
  oti.tareas = [];
  oti.estados = [];

  const nuevaOti = await oti.save();
  const res = "El id de la nueva OTI es: " + nuevaOti._id;
  return res;
}

export async function cargarSectorYTareas(data) {
  const idOti = { _id: data.id };
  const oti = await modelOti.findOne(idOti);
  const resultado = "";
  // la idea es que si el sector ya esta dentro de la oti no te deje agregarlo de nuevo
  if (oti.sector.nombre !== data.sector.nombre) {
    oti.sector.push(data.sector);
    // el numero de orden va estar determinado por la posición de la tarea en el arreglo pasado en data
    const numeroOrden = oti.tareas.length;
    for (let index = 0; index < data.tareas.length; index++) {
      //hacer control de que sea el mismo sector que el sector y que el orden este bien
      if (data.tareas[index].sector.nombre === data.sector.nombre) {
        const element = await altaTarea(
          data.tareas[index],
          numeroOrden + index + 1
        );
        oti.tareas.push(element);
      } else {
        resultado =
          "El sector no corresponde con la tarea que se quiere agregar";
      }
    }
  } else {
    resultado = "El sector " + data.sector.nombre + " ya esta dentro de la OTI";
  }

  await modelOti.findOneAndUpdate(idOti, oti);

  return "actualización correcta" + resultado;
}

export async function actualizarOrden(data) {
  const idOti = { _id: data.idOti };
  const oti = await modelOti.findOne(idOti);
  const idOrden = { _id: data.idOrden };
  const orden = await modelOrdenProduccion.findOne(idOrden);
  const longS = oti.sector.length;
  const longT = oti.tareas.length;
  const result = "";
  // solo vamos a poder actualizar la orden con la oti
  // cuando se haya cargado el último sector y sus tareas
  // que es el deposito
  if (oti.sector[longS - 1].nombre === "deposito" && longT > 1) {
    const dataEstado = {
      fechaInicio: moment().format(data.fechaI),
      fechaFin: data.fechaF ? moment(data.fechaF) : null,
      observacion: "creado correctamente",
      tipoEstado: {
        nombre: "iniciada",
        descripcion: "se ha inicializado correctamente",
      },
    };
    const est = await cargarEstado(dataEstado);
    oti.estados.push(est);
    orden.oti.push(oti);

    await modelOrdenProduccion.findOneAndUpdate(idOrden, orden);
    result = "actualización finalizada ";
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
  if (ordenes.length > 1) {
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
    return ordenesResult;
  } else {
    const res = "No se encuentran ordenes en esa fecha";
    return res;
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
    return roscasResult;
  } else {
    return "Error buscando roscas de una orden de producción";
  }
}

export async function buscarSectores() {
  const sectores = await modelSector.find({});
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
