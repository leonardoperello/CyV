import express from "express";
import { modelRosca } from "../schemas/schemaRosca";
const router = express.Router();

router.get("/", async function (req, res) {
  const result = await modelRosca.find({});
  res.json(result.reverse());
});

export default router;
