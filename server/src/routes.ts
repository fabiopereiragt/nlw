import express from "express";

import multer from "multer"; //biblioteca de upload
import multerConfig from './config/multer'; //configuração da biblioteca de upload

import PointsController from "./controllers/PointsController";
import ItemsControllers from "./controllers/ItemsController";

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemController = new ItemsControllers();

routes.get("/items", itemController.index);

routes.get("/points", pointsController.index);
routes.get("/points/:id", pointsController.show);

routes.post("/points", upload.single('image'), pointsController.create);

export default routes;
