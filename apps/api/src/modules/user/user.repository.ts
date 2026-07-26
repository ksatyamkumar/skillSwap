import { FilterQuery, UpdateQuery } from "mongoose";
import { IUserDocument, User } from "./user.model";

class UserRepository {
  async create(userData: Partial<IUserDocument>) {
    return User.create(userData);
  }

  async findByEmail(email: string) {
    return User.findOne({ email });
  }

  async findByEmailWithPassword(email: string) {
    return User.findOne({ email }).select("+password +refreshToken");
  }

  async findById(id: string) {
    return User.findById(id);
  }

  async findOne(filter: FilterQuery<IUserDocument>) {
    return User.findOne(filter);
  }

  async updateById(
    id: string,
    update: UpdateQuery<IUserDocument>
  ) {
    return User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    });
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    return User.findByIdAndUpdate(
      userId,
      { refreshToken },
      { new: true }
    );
  }

  async deactivate(userId: string) {
    return User.findByIdAndUpdate(
      userId,
      { isActive: false },
      { new: true }
    );
  }
}

export const userRepository = new UserRepository();