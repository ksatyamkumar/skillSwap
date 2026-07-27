import { FilterQuery, SortOrder, UpdateQuery } from "mongoose";
import { Skill } from "./skill.model";
import { ISkillDocument, SkillQuery } from "./skill.types";


class SkillRepository {
  async create(data: Partial<ISkillDocument>) {
    return Skill.create(data);
  }

  async findById(id: string) {
  return Skill.findOne({
    _id: id,
    isActive: true,
  });
}

  async findByIdWithOwner(id: string) {
    return Skill.findById(id).populate(
      "owner",
      "fullName email avatar"
    );
  }

  async findAll(query: SkillQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      category,
      level,
      sort = "newest",
    } = query;

    const filter: FilterQuery<ISkillDocument> = {
      isActive: true,
    };

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (level) {
      filter.level = level;
    }

    const sortOption: { createdAt: SortOrder } =
  sort === "oldest"
    ? { createdAt: 1 }
    : { createdAt: -1 };

    const skip = (page - 1) * limit;

    const [skills, total] = await Promise.all([
      Skill.find(filter)
        .populate("owner", "fullName avatar")
        .sort(sortOption)
        .skip(skip)
        .limit(limit),

      Skill.countDocuments(filter),
    ]);

    return {
      skills,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

async findByOwner(ownerId: string) {
  return Skill.find({
    owner: ownerId,
    isActive: true,
  })
    .sort({
      createdAt: "desc" as SortOrder,
    })
    .populate("owner", "fullName email avatar");
}

  async updateById(
    id: string,
    data: UpdateQuery<ISkillDocument>
  ) {
    return Skill.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string) {
  return Skill.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      new: true,
    }
  );
}

  async exists(id: string) {
    return Skill.exists({ _id: id });
  }
}

export const skillRepository = new SkillRepository();