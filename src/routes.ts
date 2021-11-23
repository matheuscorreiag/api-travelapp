import express from "express";
import LocationController from "./controllers/LocationController";

const routes = express.Router();

routes.get("/", LocationController.getAllLocations);
routes.get("/getLocationByCoords", LocationController.getLocationByCoords);
routes.post("/addMarker", LocationController.addMarker);

export default routes;
