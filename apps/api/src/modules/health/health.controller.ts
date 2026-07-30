import { Request, Response } from "express";

export const healthController = {
  check(req: Request, res: Response) {
    return res.status(200).json({
      success: true,
      status: "UP",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  },
};