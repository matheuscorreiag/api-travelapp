import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface ICoords {
  lat: number;
  long: number;
}
class LocationController {
  async getAllLocations(req: Request, res: Response) {
    try {
      return res.send();
    } catch (err) {
      return res.send(400);
    }
  }
  async newLocation(req: Request, res: Response) {
    try {
      const coords: ICoords = req.body.coords;
      const prisma = new PrismaClient();

      if (coords.lat && coords.long) {
        prisma.location
          .create({
            data: {
              lat: coords.lat,
              long: coords.long,
            },
          })
          .then(() => {
            return res.send();
          });
      }
      return res.send({ error: "unexpected chars in latitude or longitude" });
    } catch (err) {
      return res.send(400);
    }
  }
}

export default new LocationController();
