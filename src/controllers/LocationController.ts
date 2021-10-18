import { Request, Response } from "express";

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

      if (coords.lat && coords.long) {
        return res.send(coords);
      }
      return res.send({ error: "unexpected chars in lat or long" });
    } catch (err) {
      res.send(400);
    }
  }
}

export default new LocationController();
