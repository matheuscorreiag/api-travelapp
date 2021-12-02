import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

interface ICoords {
  message: string;
  lat: number;
  long: number;
  name: string;
}
class LocationController {
  /**
   * @swagger
   *  /:
   *   get:
   *      summary: Get all locations
   *      type: object
   *      responses:
   *       200:
   *          description: success
   *       500:
   *          description: error
   *
   *
   */

  async getAllLocations(req: Request, res: Response) {
    try {
      const prisma = new PrismaClient();
      const data = await prisma.location.findMany();

      return res.json({ status: 200, data: data });
    } catch (err) {
      return res.json({ status: 500, data: "Error" });
    }
  }

  /**
   * @swagger
   *  /getLocationByCoords:
   *   get:
   *      summary: Get location by coords
   *      type: object
   *      consumes:
   *        - application/json
   *      parameters:
   *        - in: query
   *          name: lat
   *          schema:
   *              lat:
   *                type: number
   *        - in: query
   *          name: long
   *          schema:
   *              long:
   *                type: number
   *      responses:
   *       200:
   *          description: success
   *       500:
   *          description: error
   *
   *
   *
   *
   *
   *
   */

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

  /**
   * @swagger
   *  /addMarker:
   *   post:
   *      content:
   *         multipart/form-data:
   *      parameters:
   *        - in: formData
   *          name: name
   *          type: string
   *        - in: formData
   *          name: lat
   *          type: number
   *        - in: formData
   *          name: long
   *          type: number
   *        - in: formData
   *          name: message
   *          type: string
   *        - in: formData
   *          name: file
   *          type: file
   *
   *      responses:
   *       200:
   *          description: success
   *       500:
   *          description: error
   *
   */

  async addMarker(req: Request, res: Response) {
    try {
      const body: ICoords = req.body;
      const prisma = new PrismaClient();
      const { location: url = "" } = <any>req.file;

      if (
        req.body.name !== undefined &&
        req.body.lat !== undefined &&
        req.body.long !== undefined
      ) {
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
            return res.json({ status: 200, data: { ...body } });
          })
          .catch((err) => {
            return res.json({
              status: 404,
              data: "Marker not found... maybe missing some params?",
            });
          });
      }
      return;
    } catch (err) {
      return res.send(500);
    }
  }
}

export default new LocationController();
