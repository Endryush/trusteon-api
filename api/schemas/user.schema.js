import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  password: z.string().min(6),
  userImage: z.string().min(1).optional()
})

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1)
})

export const updateUserSchema = z.object({
  name: z.string().trim().min(1).optional(),
  userImage: z.string().min(1).optional(),
  newEmail: z.string().trim().email().optional()
}).strict()
