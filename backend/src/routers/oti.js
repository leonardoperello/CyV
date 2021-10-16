import express from "express";
import otiController from "../controllers/altaOti";

const router = new express.Router();

router.route("/").get(otiController.getOtis);
router.route("/:id").get(otiController.getByID);
router.route("/").post(otiController.altaOti);
router.route("/:id").patch(otiController.patchOti);
router.route("/:id").delete(otiController.deleteOti);

export default router;
