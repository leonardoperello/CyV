import express from "express";
import { modelRosca } from "../schemas/schemaRosca";
const router = express.Router();

router.get("/", async function (req, res) {
    try {
        const result = await modelRosca.find({});
        res.json(result.reverse());
    } catch (error) {
        console.log(error);
    }

});

router.get('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const result = await modelRosca.findOne({ _id: id });
        res.json(result);
    }
    catch (error) {
        console.log(error);
    }
});


router.post('/', async function (req, res) {
    let data = req.body;
    try {
        const resultInsert = await modelRosca.create(data);
        res.json(resultInsert);
    } catch (error) {
        console.log(error);
    }

});

router.patch('/:id', async function (req, res) {
    try {
        let tarea = { _id: req.params.id };
        let data = req.body;
        const result = await modelRosca.findOneAndUpdate(tarea, data);
        res.json(result)
    } catch (error) {
        console.log(error);
    }

});


router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const result = await modelRosca.deleteOne({ _id: id });
        res.json(result)
    } catch (error) {
        console.log(error);
    }

});

export default router;
