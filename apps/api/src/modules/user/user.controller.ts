import { Request, Response } from "express";
import { userService } from "./user.service";
import { ApiResponse } from "../../utils/ApiResponse";
import { asyncHandler } from "../../utils/asynchandler";
import { BadRequestError } from "../../shared/errors";
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

updateAvatar = asyncHandler(
  async (req: Request, res: Response) => {

    if (!req.file) {
      throw new BadRequestError(
        "Avatar image is required."
      );
    }

    const updatedUser =
      await userService.updateAvatar(
        req.user.id,
        req.file
      );

    ApiResponse.success(
      res,
      updatedUser,
      "Avatar updated successfully"
    );
  }
);

getUserReviews = asyncHandler(
  async (req, res) => {
    const reviews =
      await userService.getUserReviews(
        req.params.id
      );

    ApiResponse.success(
      res,
      reviews,
      "Reviews fetched successfully"
    );
  }
);

getUserRating = asyncHandler(
  async (req, res) => {
    const rating =
      await userService.getUserRating(
        req.params.id
      );

    ApiResponse.success(
      res,
      rating,
      "User rating fetched successfully"
    );
  }
);

}

export const userController = new UserController();