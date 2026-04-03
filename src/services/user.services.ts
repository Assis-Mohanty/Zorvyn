import { IUser, RegisterUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { IUserRepository } from "../repositories/user.reposiories";


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
        
    }