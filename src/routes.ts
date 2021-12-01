import express from "express";
import LocationController from "./controllers/LocationController";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();

routes.get("/", LocationController.getAllLocations);
routes.get("/getLocationByCoords", LocationController.getLocationByCoords);
routes.post(
  "/addMarker",
  multer(multerConfig).single("file"),
  LocationController.addMarker
);

export default routes;
