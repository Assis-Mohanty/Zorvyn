import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.services";
import { UpdateUserDTO } from "../dto/user.dto";
import { UserRepository } from "../repositories/user.reposiories";
import { getUserIdByJwt } from "../utils/helpers/getUserIdByJwt.helper";
const userRepository = new UserRepository();
const userService = new UserService(userRepository);  

export async function registerUser(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, email, password, role } = req.body;
        await userService.Register({ name, email, password, role });
        res.status(201).json({ message: "user registered successfully", success: true });
    } catch (error) {
        next(error);
    }
}


export async function loginUser(req: Request, res: Response, next: NextFunction){
        try {
            const { email, password } = req.body;
            const token = await userService.Login(email, password);
            res.status(200).json({ token, success: true });
        } catch (error) {
            next(error);
        }
}

export async function updateUserById(req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body as UpdateUserDTO;
            await userService.update(Number(id), { name, email, password, role });
            res.status(200).json({ message: "user updated successfully", success: true });
        } catch (error) {
            next(error);
        }
}

export async function updateUser(req: Request, res: Response, next: NextFunction){
        try {
            const token = req.headers.authorization?.split(" ")[1];
            const userId = await getUserIdByJwt(token as string, process.env.JWT_SECRET as string);
            const { name, email, password, role } = req.body as UpdateUserDTO;
            await userService.update(userId, { name, email, password, role });
            res.status(200).json({ message: "user updated successfully", success: true });
        } catch (error) {
            next(error);
        }
}


export async function deleteUser (req: Request, res: Response, next: NextFunction) {
            try {
            const { id } = req.params;
            await userService.delete(Number(id));
            res.status(200).json({ message: "user deleted successfully", success: true });
        } catch (error) {
            next(error);
        }
    }

export async function findUserById (req: Request, res: Response, next: NextFunction){
            try {
            const { id } = req.params;
            const user = await userService.findById(Number(id));
            res.status(200).json({ user, success: true });
        } catch (error) {
            next(error);
        }
    }

export async function getMe(req: Request, res: Response, next: NextFunction){
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const userId = await getUserIdByJwt(token as string, process.env.JWT_SECRET as string);
        const user = await userService.findById(Number(userId));
        res.status(200).json({ user, success: true });
    } catch (error) {
        next(error);
    }
}

export async function findAllUsers (req: Request, res: Response, next: NextFunction) {
    try {
        const users = await userService.findAll();
        res.status(200).json({ users, success: true });
        } catch (error) {
            next(error);
        }
    }

export async function findUserByEmail (req: Request, res: Response, next: NextFunction) {
    try {
        const { email } = req.params;
        const user = await userService.findByEmail(email);
        res.status(200).json({ user, success: true });
        } catch (error) {
            next(error);
        }
}

export async function hardDeleteUser (req: Request, res: Response, next: NextFunction){
        try {
            const { id } = req.params;
            await userService.hardDelete(Number(id));
            res.status(200).json({ message: "user hard deleted successfully", success: true });
        } catch (error) {
            next(error);
        }
}
