import { z } from 'zod'

export const createFeedbackSchema = z.object({
  orderId: z.coerce.number().int().positive(),
  questions: z.array(z.object({
    questionId: z.coerce.number().int().positive(),
    rating: z.coerce.number(),
    orderId: z.coerce.number().int().positive().optional()
  }).passthrough()).min(1)
})

export const feedbackQuerySchema = z.object({
  orderId: z.coerce.number().int().positive()
})
