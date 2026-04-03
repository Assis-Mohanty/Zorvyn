import { z } from "zod";

export const registerSchemaValidator = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "analyst", "viewer"]),
});

export const loginSchemaValidator = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateUserSchemaValidator = z.object({
  name: z.string().min(2).max(100).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.enum(["admin", "analyst", "viewer"]).optional(),
})