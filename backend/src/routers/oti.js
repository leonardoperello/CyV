import express from "express";
import otiController, { altaOti } from "../controllers/altaOti";
import { modelOti } from "../schemas/schemaOti";

const router = new express.Router();

router.get("/", async function (req, res) {
    try {
      const resultado = await modelOti.find({});
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send(error);
    }
  });

router.post("/", async function (req, res) {
    try {
      let data = req.body;
      const resultado = await altaOti(data);
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get("/:id", async function (req, res) {
    try {
      const id = req.params.id;
      const resultado = await modelOti.findOne({_id: id});
      res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  router.patch('/:id', async function (req, res) {
    try {
        let oti = { _id: req.params.id };
        let data = req.body;
        const resultado = await modelOti.findOneAndUpdate(oti, data);
        res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send(error);
    }
});


router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const resultado = await modelOti.deleteOne({ _id: id });
        res.status(200).send(resultado);
    } catch (error) {
      res.status(400).send(error);
    }

});

export default router;
