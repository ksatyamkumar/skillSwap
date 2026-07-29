import { skillRepository } from "../skill/skill.repository";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../../shared/errors";
import { exchangeRepository } from "./exchange.repository";
import {
  CreateExchangeDto,
  ExchangeStatus,
} from "./exchange.types";
import { Types } from "mongoose";
import { UpdateExchangeStatusDto } from "./exchange.types";

import { notificationService } from "../notification";
import { NotificationType } from "../notification/notification.types";

class ExchangeService {
  async createExchange(
    data: CreateExchangeDto,
    requesterId: string
  ) {
    // 1. Check skill exists
    const skill = await skillRepository.findById(data.skillId);

    if (!skill) {
      throw new NotFoundError("Skill not found");
    }

    // 2. User cannot request own skill
    if (skill.owner.toString() === requesterId) {
      throw new BadRequestError(
        "You cannot request your own skill"
      );
    }

    // 3. Prevent duplicate pending requests
    const existingRequest =
      await exchangeRepository.findPendingRequest(
        requesterId,
        data.skillId
      );

    if (existingRequest) {
      throw new ConflictError(
        "You already have a pending request for this skill"
      );
    }

    // 4. Create exchange
    // 4. Create exchange
const exchange = await exchangeRepository.create({
  requester: new Types.ObjectId(requesterId),
  receiver: skill.owner,
  skill: skill._id,
  message: data.message,
  status: ExchangeStatus.PENDING,
});

// 5. Create notification
await notificationService.createNotification({
  recipient: exchange.receiver,
  sender: exchange.requester,
  type: NotificationType.EXCHANGE_REQUEST,
  title: "New Exchange Request",
  message: "You have received a new skill exchange request.",
  referenceId: exchange._id,
});

// 6. Return exchange
return exchange;


  }

async getSentRequests(userId: string) {
  return exchangeRepository.findSentRequests(userId);
}

async getReceivedRequests(userId: string) {
  return exchangeRepository.findReceivedRequests(userId);
}

async updateExchangeStatus(
  exchangeId: string,
  data: UpdateExchangeStatusDto,
  userId: string
) {
  const exchange = await exchangeRepository.findById(exchangeId);

  if (!exchange) {
    throw new NotFoundError("Exchange request not found");
  }

  if (exchange.receiver._id.toString() !== userId) {
    throw new ForbiddenError(
      "You are not allowed to update this exchange request"
    );
  }

  if (exchange.status !== ExchangeStatus.PENDING) {
    throw new BadRequestError(
      "Only pending requests can be updated"
    );
  }

  const updatedExchange =
  await exchangeRepository.updateStatus(
    exchangeId,
    data.status
  );

  // create notification
  if (
  updatedExchange!.status ===
  ExchangeStatus.ACCEPTED
) {
  await notificationService.createNotification({
    recipient: updatedExchange!.requester,
    sender: updatedExchange!.receiver,
    type: NotificationType.EXCHANGE_ACCEPTED,
    title: "Exchange Request Accepted",
    message:
      "Your exchange request has been accepted.",
    referenceId: updatedExchange!._id,
  });
}else if(
  updatedExchange!.status ===
  ExchangeStatus.REJECTED
){
  await notificationService.createNotification({
    recipient: updatedExchange!.requester,
    sender: updatedExchange!.receiver,
    type: NotificationType.EXCHANGE_REJECTED,
    title: "Exchange Request Rejected",
    message:
      "Your exchange request has been rejected.",
    referenceId: updatedExchange!._id,
  });
}

return updatedExchange;

}

async cancelExchange(
  exchangeId: string,
  userId: string
) {
  const exchange =
    await exchangeRepository.findById(exchangeId);

  if (!exchange) {
    throw new NotFoundError(
      "Exchange request not found"
    );
  }

  if (exchange.requester._id.toString() !== userId) {
    throw new ForbiddenError(
      "You are not allowed to cancel this exchange request"
    );
  }

  if (exchange.status !== ExchangeStatus.PENDING) {
    throw new BadRequestError(
      "Only pending requests can be cancelled"
    );
  }

  await exchangeRepository.delete(exchangeId);
}

async completeExchange(
  exchangeId: string,
  userId: string
) {
  const exchange =
    await exchangeRepository.findById(exchangeId);

  if (!exchange) {
    throw new NotFoundError(
      "Exchange request not found"
    );
  }

  const isRequester =
    exchange.requester._id.toString() === userId;

  const isReceiver =
    exchange.receiver._id.toString() === userId;

  if (!isRequester && !isReceiver) {
    throw new ForbiddenError(
      "You are not allowed to complete this exchange"
    );
  }

  if (
    exchange.status !== ExchangeStatus.ACCEPTED
  ) {
    throw new BadRequestError(
      "Only accepted exchanges can be completed"
    );
  }

   // Update exchange status
  const updatedExchange =
    await exchangeRepository.updateStatus(
      exchangeId,
      ExchangeStatus.COMPLETED
    );

  // Notify the other participant
  const recipient = isRequester
    ? exchange.receiver._id
    : exchange.requester._id;

  await notificationService.createNotification({
    recipient,
    sender: new Types.ObjectId(userId),
    type: NotificationType.EXCHANGE_COMPLETED,
    title: "Exchange Completed",
    message:
      "Your skill exchange has been marked as completed.",
    referenceId: updatedExchange!._id,
  });

  return updatedExchange;
}

}

export const exchangeService = new ExchangeService();