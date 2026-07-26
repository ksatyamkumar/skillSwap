import { Request, Response } from "express";
import { authService } from "./auth.service";
import { loginSchema, registerSchema } from "./auth.validation";
import { asyncHandler } from "../../utils/asynchandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { UnauthorizedError } from "../../shared/errors";



class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const data = registerSchema.parse(req.body);

    const user = await authService.register(data);

    ApiResponse.created(
      res,
      user,
      "User registered successfully"
    );
  });



  login = asyncHandler(async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const result = await authService.login(data);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  ApiResponse.success(
    res,
    {
      user: result.user,
      accessToken: result.accessToken,
    },
    "Login successful"
  );
});

refresh = asyncHandler(async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if(!refreshToken){
    throw new UnauthorizedError(
    "Refresh token missing"
);
  }

  const token = await authService.refreshToken(
    refreshToken
);

ApiResponse.success(
    res,
    token,
    "Access token refreshed"
);
});


logout = asyncHandler(async (_req, res) => {
  await authService.logout();

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  ApiResponse.success(
    res,
    null,
    "Logged out successfully"
  );
});


}


export const authController = new AuthController();