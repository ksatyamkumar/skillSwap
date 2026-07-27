import { Router } from "express";
import { skillController } from "./skill.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import {
  createSkillSchema,
  updateSkillSchema,
} from "./skill.validation";

const router = Router();

// Public Routes
router.get("/", skillController.getAllSkills);

router.get(
  "/me",
  authMiddleware,
  skillController.getMySkills
);

// public route
router.get("/:id", skillController.getSkillById);

// Protected Routes
router.post(
  "/",
  authMiddleware,
  validate(createSkillSchema),
  skillController.createSkill
);

router.patch(
  "/:id",
  authMiddleware,
  validate(updateSkillSchema),
  skillController.updateSkill
);

router.delete(
  "/:id",
  authMiddleware,
  skillController.deleteSkill
);

export default router;