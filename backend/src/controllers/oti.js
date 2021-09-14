import express from "express";
import { modelOti } from "../schemas/schemaOti";
const router = express.Router();

router.get("/", async function (req, res) {
  const result = await modelOti.find({});
  res.json(result.reverse());
});

export default router;
