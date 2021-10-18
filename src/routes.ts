import express from "express";
import LocationController from "./controllers/LocationController";

const routes = express.Router();

routes.get("/", LocationController.getAllLocations);
routes.post("/addLocation", LocationController.newLocation);

export default routes;
