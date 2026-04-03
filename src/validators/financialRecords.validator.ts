import { z } from "zod";

export const createRecordSchemaValidator = z.object({
  amount: z.number().positive().multipleOf(0.01),
  type: z.enum(["income", "expense"]),
  category: z.string().min(1).max(100),
  date: z.string().datetime(),
  notes: z.string().max(500).optional()
});

export const updateRecordSchemaValidator = z.object({
    amount: z.number().positive().multipleOf(0.01).optional(),
    type: z.enum(["income", "expense"]).optional(),
    category: z.string().min(1).max(100).optional(),
    date: z.string().datetime().optional(),
    notes: z.string().max(500).optional()
})