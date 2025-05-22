// src/validators/todoSchema.js
import { z } from 'zod';

export const TodoInputSchema = z.object({
    task: z.string().min(1),
    priority: z.enum(['low', 'medium', 'high']).optional(),
    due_date: z.string().optional(), // or z.date() if parsed
    is_completed: z.boolean().optional(),
});
