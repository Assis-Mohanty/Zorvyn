import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.services";
import { UpdateUserDTO } from "../dto/user.dto";

export async function registerUser(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password, role } = req.body;
            await userService.Register({ name, email, password, role });
            res.status(201).json({ message: "user registered successfully", success: true });
        } catch (error) {
            next(error);
        }
    }
}

export async function loginUser(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const token = await userService.Login(email, password);
            res.status(200).json({ token, success: true });
        } catch (error) {
            next(error);
        }
    }
}
export async function updateUser(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body as UpdateUserDTO;
            await userService.update(Number(id), { name, email, password, role });
            res.status(200).json({ message: "user updated successfully", success: true });
        } catch (error) {
            next(error);
        }
    }
}
export async function deleteUser(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
            try {
            const { id } = req.params;
            await userService.delete(Number(id));
            res.status(200).json({ message: "user deleted successfully", success: true });
        } catch (error) {
            next(error);
        }
    }
}
export async function findUserById(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
            try {
            const { id } = req.params;
            const user = await userService.findById(Number(id));
            res.status(200).json({ user, success: true });
        } catch (error) {
            next(error);
        }
    }
}
export async function findAllUsers(userService: UserService) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = await userService.findAll();
            res.status(200).json({ users, success: true });
        } catch (error) {
            next(error);
        }
    }
}