import { IUser, RegisterUserDTO, UpdateUserDTO } from "../dto/user.dto";
import { User } from "../models/user.model";
import { NotFoundError } from "../utils/errors/app.error";

export interface IUserRepository{
    Register(user: RegisterUserDTO): Promise<void>;
    findById(id: number): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll(): Promise<IUser[]>;
    update(id: number, user: UpdateUserDTO): Promise<void>;
    delete(id: number): Promise<void>;
}

export class UserRepository implements IUserRepository {
    async Register(user: RegisterUserDTO): Promise<void> {
    const { name, email, password, role } = user;
    const newUser = await User.create({
      name,
      email,
      password,
      role,
    });
    await newUser.save();
    return;
    }
    
    async findById(id: number): Promise<IUser | null> {
        const user = await User.findByPk(id);
        return user ? (user.toJSON() as IUser) : null;
    }
    
    async findByEmail(email: string): Promise<IUser | null> {
        const user = await User.findOne({ where: { email } });
        return user ? (user.toJSON() as IUser) : null;
    }

    async findAll(): Promise<IUser[]> {
        const users = await User.findAll();
        return users.map(user => user.toJSON());
    }
    async update(id: number, user: UpdateUserDTO): Promise<void> {
        const existingUser = await User.findByPk(id);
        if (!existingUser) {
            throw new NotFoundError("User not found");
        }
        const newUser = await existingUser.update(user);
        await newUser.save();
        return;
    }

    async delete(id: number): Promise<void> {
        const user = await User.findByPk(id);
        if (!user) {
            throw new NotFoundError("User not found");
        }
        await user.destroy();
    }
}
    