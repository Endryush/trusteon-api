import { z } from 'zod'

const idParam = z.coerce.number().int().positive()

export const createProductSchema = z.object({
  name: z.string().trim().min(1),
  totalAmount: z.coerce.number().positive(),
  description: z.string().optional(),
  categories: z.array(z.string()).optional(),
  productImages: z.array(z.any()).optional(),
  serviceStatus: z.string().optional()
})

export const updateProductSchema = createProductSchema.extend({
  id: idParam
})

export const productIdParamSchema = z.object({
  id: idParam
})

export const listProductsQuerySchema = z.object({
  authorId: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().optional(),
  pageSize: z.coerce.number().int().positive().optional()
})
