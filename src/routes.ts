import express from "express";
import LocationController from "./controllers/LocationController";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();
const options = {
  definition: {
    info: {
      title: "Api for travel app",
      version: "1.0.0",
      description: "API para um app de viagens",
    },

    servers: ["http://localhost:3333"],
  },
  apis: ["**/*.ts"],
};
const swaggerDocs = swaggerJSDoc(options);

routes.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

routes.get("/", LocationController.getAllLocations);
routes.get("/getLocationByCoords", LocationController.getLocationByCoords);
routes.post(
  "/addMarker",
  multer(multerConfig).single("file"),
  LocationController.addMarker
);

export default routes;
