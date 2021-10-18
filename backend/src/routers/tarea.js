import express from "express";
import tareaController from "../controllers/altaTarea";
const router = new express.Router();

router.route("/").get(tareaController.getTareas);
router.route("/:id").get(tareaController.getByID);
router.route("/").post(tareaController.altaTarea);
router.route("/:id").patch(tareaController.patchTarea);
router.route("/:id").delete(tareaController.deleteTarea);

export default router;
