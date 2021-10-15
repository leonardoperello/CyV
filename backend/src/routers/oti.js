import express from "express";
import otiController from "../controllers/oti";

const router = new express.Router();

router.route("/").get(otiController.getOtis);
router.route("/:otiID").get(otiController.getByID);
router.route("/:altaOti").post(otiController.postOti);
router.route("/:otiID").patch(otiController.patchOti);
router.route("/:otiID").delete(otiController.deleteOti);

export default router;
