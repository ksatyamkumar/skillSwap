import { UpdateQuery } from "mongoose";
import { Exchange } from "./exchange.model";
import {
    CreateExchangeData,
  ExchangeStatus,
//   IExchangeDocument,
} from "./exchange.types";

class ExchangeRepository {
  async create(data: CreateExchangeData) {
    return Exchange.create(data);
  }

  async findById(id: string) {
    return Exchange.findById(id)
      .populate("requester", "fullName email avatar")
      .populate("receiver", "fullName email avatar")
      .populate("skill");
  }

  async findPendingRequest(
    requester: string,
    skill: string
  ) {
    return Exchange.findOne({
      requester,
      skill,
      status: ExchangeStatus.PENDING,
    });
  }

  async findSentRequests(userId: string) {
    return Exchange.find({
      requester: userId,
    })
      .populate("receiver", "fullName email avatar")
      .populate("skill")
      .sort({
        createdAt: "desc",
      });
  }

  async findReceivedRequests(userId: string) {
    return Exchange.find({
      receiver: userId,
    })
      .populate("requester", "fullName email avatar")
      .populate("skill")
      .sort({
        createdAt: "desc",
      });
  }

  async updateStatus(
    id: string,
    status: ExchangeStatus
  ) {
    return Exchange.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async delete(id: string) {
    return Exchange.findByIdAndDelete(id);
  }

  async exists(id: string) {
    return Exchange.exists({
      _id: id,
    });
  }
}

export const exchangeRepository =
  new ExchangeRepository();