import { Response } from "express";

export class ApiResponse {
  static success(
    res: Response,
    data: unknown,
    message = "Success"
  ) {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created(
    res: Response,
    data: unknown,
    message = "Created successfully"
  ) {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res: Response) {
    return res.status(204).send();
  }
}