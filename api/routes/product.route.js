import express from 'express';
import productController from '../controllers/product.controller.js';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';


const router = express.Router()

router
  .post('/add', jwtUserAuth ,productController.createProduct)
  .get('/', productController.getProducts)
  .get('/:id', productController.getProductById)
  .patch('/edit', jwtUserAuth, productController.updateProduct)
  .delete('/:id', jwtUserAuth, productController.deleteProduct)

export default router