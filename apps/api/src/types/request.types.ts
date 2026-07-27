import { Request } from "express";

export interface IdParams {
  id: string;
}

export type RequestWithId = Request<IdParams>;