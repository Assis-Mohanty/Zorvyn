import { IUser, RegisterUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { IUserRepository } from "../repositories/user.reposiories";
import { NotFoundError, UnauthorizedError } from "../utils/errors/app.error";
import { generateJWT } from "../utils/helpers/jwt.helper";
import { compareHashPassword } from "../utils/helpers/hashPassword.helper";

export interface IUserService {
    Register(user: RegisterUserDTO): Promise<void>;
    Login(email: string, password: string): Promise<string>;
    findById(id: number): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll(): Promise<IUser[]>;
    update(id: number, user: UpdateUserDTO): Promise<void>;
    delete(id: number): Promise<void>;
}
export class UserService implements IUserService {
    private userRepository:IUserRepository
    constructor(userRepository:IUserRepository){
        this.userRepository=userRepository
    }
    async Register(user: RegisterUserDTO): Promise<void> {
        await this.userRepository.Register(user);
        return;
    }
    async Login(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        const isPasswordValid = await compareHashPassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Invalid password");
        }
        return await generateJWT({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string, 3600);
    }
    async update(id: number, user: UpdateUserDTO): Promise<void> {
        await this.userRepository.update(id, user);
        return;
    }
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
        return;
    }
    async findById(id: number): Promise<IUser | null> {
        return await this.userRepository.findById(id);
    }
    async findByEmail(email: string): Promise<IUser | null> {
        return await this.userRepository.findByEmail(email);
    }
    async findAll(): Promise<IUser[]> {
        return await this.userRepository.findAll();
    }
}