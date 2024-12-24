import { AppError } from "../../../../config/erro/AppError";
import { VerifyPassword } from "../../../../shared/bcrypt/VerifyPassword";
import { CreateToken } from "../../../../shared/jwt/CreateToken";
import { IUserRepository } from "../../repositories/interface/IUserRepository";
import { LoginDTOType } from "./LoginDTO";

export class LoginUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: LoginDTOType) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Username or password does not exist", 401);
    }

    const password = VerifyPassword(data.password, user.password);

    if (!password) {
      throw new AppError("Username or password does not exist", 401);
    }

    const token = CreateToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    return token;
  }
}
