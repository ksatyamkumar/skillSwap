import { Router } from "express";
import { exchangeController } from "./exchange.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { createExchangeSchema, updateExchangeStatusSchema } from "./exchange.validation";

const router = Router();

router.post(
  "/",
  authMiddleware,
  validate(createExchangeSchema),
  exchangeController.createExchange
);

router.get(
  "/sent",
  authMiddleware,
  exchangeController.getSentRequests
);


router.get(
  "/received",
  authMiddleware,
  exchangeController.getReceivedRequests
);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateExchangeStatusSchema),
  exchangeController.updateExchangeStatus
);

router.patch(
  "/:id/complete",
  authMiddleware,
  exchangeController.completeExchange
);

router.delete(
  "/:id",
  authMiddleware,
  exchangeController.cancelExchange
);

export default router;