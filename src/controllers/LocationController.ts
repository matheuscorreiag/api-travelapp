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
      const prisma = new PrismaClient();
      prisma.location.findMany().then((locations) => {
        return res.send(locations);
      });
    } catch (err) {
      return res.send(400);
    }
  }
  async getLocationByCoords(req: Request, res: Response) {
    try {
      const body = req.query;
      const prisma = new PrismaClient();

      const data = await prisma.location.findMany({
        where: {
          lat: Number(body.lat),
          long: Number(body.long),
        },
      });
      return res.send(data);
    } catch (err) {
      console.log(err);
    }
  }
  async newLocation(req: Request, res: Response) {
    try {
      const body: ICoords = req.body;
      const prisma = new PrismaClient();

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
