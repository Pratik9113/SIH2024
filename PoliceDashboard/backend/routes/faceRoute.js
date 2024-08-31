import express from "express"
import {jwtAuth} from '../middleware/jwtAuth.js'
import { faceRecognition } from "../controllers/faceController.js";
const faceRouter = express.Router();
faceRouter.post("/capture", jwtAuth, faceRecognition);
export default faceRouter;