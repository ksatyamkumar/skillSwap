import { Request, Response } from "express";
import { userService } from "./user.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asynchandler";
// import { updateProfileSchema } from "./user.validation";

class UserController {
  getMyProfile = asyncHandler(async (req: Request, res: Response) => {
    const user = await userService.getMyProfile(req.user.id);

    // remove return because asynchandler return voide no response show we don't return anything inside asynclhandler fun
     ApiResponse.success(
      res,
      user,
      "Profile fetched successfully"
    );
  });


  updateMyProfile = asyncHandler(
  async (req: Request, res: Response) => {

    const updatedUser = await userService.updateProfile(
      req.user.id,
      req.body
    );

    ApiResponse.success(
      res,
      updatedUser,
      "Profile updated successfully"
    );
  }
);


}

export const userController = new UserController();