import { userRepository } from "./user.repository";
import { NotFoundError } from "../../shared/errors";
import { IUserDocument } from "./user.types";

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



}

export const userService = new UserService();