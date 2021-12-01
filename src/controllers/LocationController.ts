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
      const data = await prisma.location.findMany();

      return res.json({ status: 200, data: data });
    } catch (err) {
      return res.json({ status: 500, data: "Error" });
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
      if (!data) {
        return res.json({ status: 404, data: "Location not found" });
      }
      return res.json({ status: 200, data: data });
    } catch (err) {
      return res.json({ status: 404, data: "Location not found" });
    }
  }
  async addMarker(req: Request, res: Response) {
    try {
      const body: ICoords = req.body;
      const prisma = new PrismaClient();
      const { location: url = "" } = <any>req.file;

      await prisma.location
        .create({
          data: {
            message: body.message,
            lat: Number(body.lat),
            long: Number(body.long),
            name: body.name,
            image: url,
          },
        })
        .then(() => {
          return res.json({ status: 200, data: { ...body, url } });
        })
        .catch((err) => {
          return res.json({
            status: 404,
            data: "Marker not found... maybe missing some params?",
          });
        });
    } catch (err) {
      return res.send(500);
    }
  }
}

export default new LocationController();
