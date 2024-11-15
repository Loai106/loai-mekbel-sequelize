import { z } from "zod";

export const userSchema = z.object({
    username:z.string().min(3).optional(),
    email:z.string().email().optional(),
    password:z.string().min(6).optional()
});

export type UserSchema = z.infer<typeof userSchema>



export const postSchema = z.object({
    autherId: z.number(),
    title: z.string().min(2).optional(),
    summary: z.string().optional(),
    content: z.string().min(6).optional()
})

export type PostSchema = z.infer<typeof postSchema>;