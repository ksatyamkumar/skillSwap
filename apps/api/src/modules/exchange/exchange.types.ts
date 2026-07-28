import { Document, Types } from "mongoose";

export enum ExchangeStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export interface IExchange {
  requester: Types.ObjectId;
  receiver: Types.ObjectId;
  skill: Types.ObjectId;

  message?: string;

  status: ExchangeStatus;
}

export interface IExchangeDocument
  extends IExchange,
    Document {}


export interface CreateExchangeData {
  requester: Types.ObjectId;
  receiver: Types.ObjectId;
  skill: Types.ObjectId;
  message?: string;
  status: ExchangeStatus;
}

export interface CreateExchangeDto {
  skillId: string;
  message?: string;
}

export interface UpdateExchangeStatusDto {
  status:
    | ExchangeStatus.ACCEPTED
    | ExchangeStatus.REJECTED;
}

