import express from 'express';
import productController from '../controllers/product.controller.js';


const router = express.Router()

router
  .post('/add', productController.createProduct)

export default router