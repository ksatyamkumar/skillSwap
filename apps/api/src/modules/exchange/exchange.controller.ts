import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asynchandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { exchangeService } from "./exchange.service";
import { RequestWithId } from "../../types/request.types";

type IdParams = {
  id: string;
};

class ExchangeController {
  createExchange = asyncHandler(
    async (
      req: Request,
      res: Response
    ) => {
      const exchange =
        await exchangeService.createExchange(
          req.body,
          req.user!.id
        );

      ApiResponse.success(
        res,
        exchange,
        "Exchange request sent successfully",
      );
    }
  );

getSentRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const exchanges =
      await exchangeService.getSentRequests(
        req.user!.id
      );

    ApiResponse.success(
      res,
      exchanges,
      "Sent exchange requests fetched successfully"
    );
  }
);

getReceivedRequests = asyncHandler(
  async (req: Request, res: Response) => {
    const exchanges =
      await exchangeService.getReceivedRequests(
        req.user!.id
      );

    ApiResponse.success(
      res,
      exchanges,
      "Received exchange requests fetched successfully"
    );
  }
);

updateExchangeStatus = asyncHandler<IdParams>(
  async (req, res) => {
    const exchange = await exchangeService.updateExchangeStatus(
      req.params.id,
      req.body,
      req.user!.id
    );

    ApiResponse.success(
      res,
      exchange,
      "Exchange request updated successfully"
    );
  }
);

cancelExchange = asyncHandler(
  async (req, res) => {
    await exchangeService.cancelExchange(
      req.params.id,
      req.user!.id
    );

    ApiResponse.success(
      res,
      null,
      "Exchange request cancelled successfully"
    );
  }
);


completeExchange = asyncHandler(
  async (req, res) => {
    const exchange =
      await exchangeService.completeExchange(
        req.params.id,
        req.user!.id
      );

    ApiResponse.success(
      res,
      exchange,
      "Exchange completed successfully"
    );
  }
);

}

export const exchangeController =
  new ExchangeController();