import express from 'express';
import productController from '../controllers/product.controller.js';
import jwtAuth from '../middlewares/jwtAuth.js';


const router = express.Router()

router
  .post('/add', jwtAuth, productController.createProduct)
  .get('/', productController.getProducts)
  .get('/:id', productController.getProductById)
  .patch('/edit', jwtAuth, productController.updateProduct)
  .delete('/:id', jwtAuth, productController.deleteProduct)

export default router
