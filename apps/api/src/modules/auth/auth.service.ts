import bcrypt from "bcrypt";
import { LoginInput, RegisterInput } from "./auth.validation";
import { userRepository } from "../user/user.repository";
import { ConflictError, UnauthorizedError } from "../../shared/errors";
import { generateAccessToken, generateRefreshToken } from "../../shared/auth";

interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LoginResponse {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}

class AuthService {
  async register(data: RegisterInput) {
    const { name, email, password } = data;

    // Check if email already exists
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new ConflictError("Email already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return safe user object
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

    /**
   * Login User
   */
  async login(data: LoginInput): Promise<LoginResponse> {
    const user = await userRepository.findByEmailWithPassword(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshToken: string){

    const payload = verifyRefreshToken(refreshToken) as {
    userId: string;
    role: string;
};

const user = await userRepository.findById(
    payload.userId
);

if(!user){
  throw new UnauthorizedError(
    "User no longer exists"
);
}

const accessToken = generateAccessToken({
    userId: user.id,
    role: user.role,
});

return {
    accessToken,
};
  }

}

export const authService = new AuthService();