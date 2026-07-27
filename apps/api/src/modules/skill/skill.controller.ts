import { Request, Response } from "express";
import { skillService } from "./skill.service";
import { asyncHandler } from "../../utils/asynchandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { SkillLevel, SkillQuery } from "./skill.types";
// import { RequestWithId } from "../../types/request.types";

class SkillController {
  /**
   * POST /api/v1/skills
   */
  createSkill = asyncHandler(async (req: Request, res: Response) => {
    const skill = await skillService.createSkill(
      req.user!.id,
      req.body
    );

    ApiResponse.created(
      res,
      skill,
      "Skill created successfully"
    );
  });

  /**
   * GET /api/v1/skills
   */
  getAllSkills = asyncHandler(async (req: Request, res: Response) => {

const level =
  Object.values(SkillLevel).includes(req.query.level as SkillLevel)
    ? (req.query.level as SkillLevel)
    : undefined;

const query: SkillQuery = {
  page: req.query.page ? Number(req.query.page) : 1,
  limit: req.query.limit ? Number(req.query.limit) : 10,
  search: req.query.search?.toString(),
  category: req.query.category?.toString(),
  level,
  sort: req.query.sort === "oldest" ? "oldest" : "newest",
};

  const result = await skillService.getAllSkills(query);

  ApiResponse.success(
    res,
    result,
    "Skills fetched successfully"
  );
});

/**
   * GET /api/v1/skills/me
   */

getMySkills = asyncHandler(async (req, res) => {
  const skills = await skillService.getMySkills(
    req.user!.id
  );

  ApiResponse.success(
    res,
    skills,
    "Your skills fetched successfully"
  );
});

  /**
   * GET /api/v1/skills/:id
   */
  getSkillById = asyncHandler(async (req: Request, res: Response) => {
    const skill = await skillService.getSkillById(
      String(req.params.id)
    );

    ApiResponse.success(
      res,
      skill,
      "Skill fetched successfully"
    );
  });

  /**
   * PATCH /api/v1/skills/:id
   */
  updateSkill = asyncHandler(async (req: Request, res: Response) => {
    const skill = await skillService.updateSkill(
      String(req.params.id),
      req.user!.id,
      req.body
    );

    ApiResponse.success(
      res,
      skill,
      "Skill updated successfully"
    );
  });

  /**
   * DELETE /api/v1/skills/:id
   */
  deleteSkill = asyncHandler(async (req: Request, res: Response) => {
    await skillService.deleteSkill(
      String(req.params.id),
      req.user!.id
    );

    ApiResponse.success(
      res,
      null,
      "Skill deleted successfully"
    );
  });

  
}

export const skillController = new SkillController();