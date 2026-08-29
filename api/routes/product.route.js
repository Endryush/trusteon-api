import express from 'express';
import productController from '../controllers/product.controller.js';
import jwtAuth from '../middlewares/jwtAuth.js';
import { validateBody, validateParams, validateQuery } from '../middlewares/validate.js';
import {
  createProductSchema,
  listProductsQuerySchema,
  productIdParamSchema,
  updateProductSchema
} from '../schemas/product.schema.js';

const router = express.Router()

router
  .post('/add', jwtAuth, validateBody(createProductSchema), productController.createProduct)
  .get('/', validateQuery(listProductsQuerySchema), productController.getProducts)
  .get('/:id', validateParams(productIdParamSchema), productController.getProductById)
  .patch('/edit', jwtAuth, validateBody(updateProductSchema), productController.updateProduct)
  .delete('/:id', jwtAuth, validateParams(productIdParamSchema), productController.deleteProduct)

export default router
