import express from 'express';
import { modelTarea } from '../schemas/schemaTarea';
const router = express.Router();

router.get('/', async function (req, res) {
    const result = await modelTarea.find({});
    res.json(result.reverse());
});



export default router;