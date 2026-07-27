import { Types } from "mongoose";
import { skillRepository } from "./skill.repository";
import { ISkill, SkillQuery } from "./skill.types";
import { NotFoundError, ForbiddenError } from "../../shared/errors";

class SkillService {
  async createSkill(
    userId: string,
    data: Omit<ISkill, "owner">
  ) {
    const skill = await skillRepository.create({
      ...data,
      owner: new Types.ObjectId(userId),
    });

    return skill;
  }

  async getAllSkills(query: SkillQuery) {
  return skillRepository.findAll(query);
}

async getMySkills(userId: string) {
  return skillRepository.findByOwner(userId);
}

  async getSkillById(skillId: string) {
    const skill = await skillRepository.findByIdWithOwner(skillId);

    if (!skill) {
      throw new NotFoundError("Skill not found");
    }

    return skill;
  }

  async updateSkill(
    skillId: string,
    userId: string,
    data: Partial<ISkill>
  ) {
    const skill = await skillRepository.findById(skillId);

    if (!skill) {
      throw new NotFoundError("Skill not found");
    }

    if (skill.owner.toString() !== userId) {
      throw new ForbiddenError(
        "You are not allowed to update this skill"
      );
    }

    return skillRepository.updateById(skillId, data);
  }

  async deleteSkill(
    skillId: string,
    userId: string
  ) {
    const skill = await skillRepository.findById(skillId);

    if (!skill) {
      throw new NotFoundError("Skill not found");
    }

    if (skill.owner.toString() !== userId) {
      throw new ForbiddenError(
        "You are not allowed to delete this skill"
      );
    }

    await skillRepository.deleteById(skillId);
  }
}

export const skillService = new SkillService();