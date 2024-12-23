import { AppError } from "../../../../config/erro/AppError";
import { hashPassword } from "../../../../shared/bcrypt/hashPassword";
import { UserDTOType } from "../../dtos/UserDTO";
import { IUserRepository } from "../../repositories/interface/IUserRepository";

export class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository
    ) { }

    async execute(data: UserDTOType) {
        const userAlreadyExists = await this.userRepository.findByEmail(data.email);

        if (userAlreadyExists) {
            throw new AppError("User already exists.", 409);
        }

        const hash = await hashPassword(data.password);
        const user = await this.userRepository.create({
            ...data,
            password: hash,
        });

        const { password, ...safeUser } = user;

        return safeUser;
    }

}