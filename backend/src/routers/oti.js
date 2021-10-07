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

router.get("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await modelOti.findOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async function (req, res) {
  let data = req.body;
  try {
    const resultInsert = await modelOti.create(data);
    res.json(resultInsert);
  } catch (error) {
    console.log(error);
  }
});

router.patch("/:id", async function (req, res) {
  try {
    let oti = { _id: req.params.id };
    let data = req.body;
    const result = await modelOti.findOneAndUpdate(oti, data);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const result = await modelOti.deleteOne({ _id: id });
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
export default { getOtis };
