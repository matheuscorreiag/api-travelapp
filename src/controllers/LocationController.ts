import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface ICoords {
  message: string;
  lat: number;
  long: number;
  name: string;
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
      const body: ICoords = req.body;
      const prisma = new PrismaClient();
      console.log(body);

      if (!body.lat || !body.long || !body.message || !body.name) {
        return res.send({
          error: "unexpected chars in latitude, longitude or message",
        });
      }
      prisma.location
        .create({
          data: {
            message: body.message,
            lat: body.lat,
            long: body.long,
            name: body.name,
          },
        })
        .then(() => {
          return res.send();
        });
    } catch (err) {
      return res.send(400);
    }
  }
}

export default new LocationController();
