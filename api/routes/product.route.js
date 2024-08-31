import express from 'express';
import productController from '../controllers/product.controller.js';
import jwtUserAuth from '../middlewares/jwtUserAuth.js';


const router = express.Router()

router
  .post('/add', jwtUserAuth ,productController.createProduct)
  .get('/', productController.getProducts)

export default router