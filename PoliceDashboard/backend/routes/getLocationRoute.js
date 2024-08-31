import express from 'express';
import { getLatestLocation } from '../controllers/getLocation.js';
const getLocationRouter = express.Router();

getLocationRouter.get('/latest-locations', getLatestLocation);
export default getLocationRouter;