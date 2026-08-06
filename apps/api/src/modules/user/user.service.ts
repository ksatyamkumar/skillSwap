import { userRepository } from "./user.repository";
import { NotFoundError } from "../../shared/errors";
import { IUserDocument } from "./user.types";
import { reviewRepository } from "../reviews/review.repository";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { BadRequestError } from "../../shared/errors";


export class UserService {
    async getMyProfile (userId:string){
        const user = await userRepository.findById(userId);

        if(!user){
            throw new NotFoundError("User not found");
        }
        return user;
    }


    async updateProfile(
  userId: string,
  updateData: Partial<IUserDocument>
) {
  const existingUser = await userRepository.findById(userId);

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  const updatedUser = await userRepository.updateById(
    userId,
    updateData
  );

  return updatedUser;
}

async updateAvatar(
  userId: string,
  file: Express.Multer.File
) {
  // Check user exists
  const existingUser =
    await userRepository.findById(userId);

  if (!existingUser) {
    throw new NotFoundError("User not found");
  }

  // Check file exists
  if (!file) {
    throw new BadRequestError(
      "Avatar image is required."
    );
  }

  // Upload to Cloudinary
  const uploadResult =
    await uploadToCloudinary(
      file.buffer,
      "skillswap/avatars"
    );

  // Update avatar URL
  const updatedUser =
    await userRepository.updateById(
      userId,
      {
        avatar: uploadResult.secure_url,
      }
    );

  return updatedUser;
}

async getUserReviews(userId: string) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return reviewRepository.findByReviewee(userId);
}

async getUserRating(userId: string) {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  const result =
    await reviewRepository.getAverageRating(userId);

  if (result.length === 0) {
    return {
      averageRating: 0,
      totalReviews: 0,
    };
  }

  return {
    averageRating: Number(
      result[0].averageRating.toFixed(1)
    ),
    totalReviews: result[0].totalReviews,
  };
}


}

export const userService = new UserService();