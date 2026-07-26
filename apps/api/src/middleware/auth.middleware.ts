import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../shared/errors";

import { verifyAccessToken } from "../shared/auth/jwt";

import { userRepository } from "../modules/user/user.repository";

export async function authMiddleware (
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError("Authentication required");
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
        throw new UnauthorizedError("Invalid authorization header");
    }

    const payload = verifyAccessToken(token) as {
        userId: string;
        role: string;
    };

    const user = await userRepository.findById(payload.userId);

    if (!user) {
        throw new UnauthorizedError("User no longer exists");
    }

    req.user = user;

    next();
}