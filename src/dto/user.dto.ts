export type IUser = {
    id: number;
    name: string;
    email: string;
    password: string;
    role: "admin" | "analyst" | "viewer";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export type RegisterUserDTO = {
    name: string;
    email: string;
    password: string;
    role: "admin" | "analyst" | "viewer";
}

export type UpdateUserDTO = {
    name?: string;
    email?: string;
    password?: string;
    role?: "admin" | "analyst" | "viewer";
}