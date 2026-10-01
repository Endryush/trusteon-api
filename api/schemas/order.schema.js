import { z } from 'zod'

export const createOrderSchema = z.object({
  totalAmount: z.coerce.number().positive(),
  authorId: z.coerce.number().int().positive(),
  serviceId: z.coerce.number().int().positive(),
})

export const updateOrderStatusSchema = z.object({
  orderId: z.coerce.number().int().positive(),
  status: z.coerce.number().int().positive()
}).strict()
