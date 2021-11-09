import { modelTipoDeEstado } from "../schemas/schemaTipoDeEstado";
import { cargarEstado } from "../controllers/altaEstado.controllers";
import { tareasAsignadas, cambioEstadotareaAsignada } from "../controllers/cambioDeEstadoOperario.controllers";
import express from "express";
const router = express.Router();


router.get("/tipoEstado", async function (req, res) {
  try {
    const result = await modelTipoDeEstado.find({});
    res.json(result);
  } catch (error) {
    res.status(422).send('Error, no existe la coleccion');
  }
});

router.post("/", async function (req, res) {
  try {
    let data = req.body;
    const resultado = await cargarEstado(data);
    res.json(resultado);
  } catch (error) {
    res.status(404).send('Error, parámetros incorrectos.');
  }
});

router.get("/:id", async function (req, res) {
  try {
      if(!(req.params.id.length === 24) || !req.params.id){
       return res.status(400).send('formato id incorrecto');
      }      
        const id = req.params.id;
        const result = await tareasAsignadas(id);
        if(!result){
          return res.status(200).send('usted no tiene tareas asignadas');
         }
        res.json(result);
  } catch (error) {
    res.status(404).send('Error, parámetros incorrectos.');
  }
});

router.put("/", async function (req, res) {
  try {
    let data = req.body;
    if(!data){
      return res.status(400).send('parametros vacio');
     }
    
    const resultado = await cambioEstadotareaAsignada(data);
    switch (resultado) {
      case 'error id':
        return res.status(400).send('error , oti o tarea no existen');
      case 'error estado':
        return res.status(400).send('error , el estado no existe o no tiene autorizacion para realizar el cambio');
      case 'error sector':
        return res.status(400).send('error , el sector ingresado no existe');
    }
 
    res.json(resultado);
  } catch (error) {
    res.status(404).send('Error, parámetros incorrectos.');
  }
});

export default router;
