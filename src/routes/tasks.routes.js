import {Router} from "express";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/tasks', authRequired, (req, res) => res.send('Tasks routes'));
router.get('/PaP', authRequired, (req, res) => res.send('PaP routes'));
router.get('/CC', authRequired, (req, res) => res.send('CC routes'));

export default router;