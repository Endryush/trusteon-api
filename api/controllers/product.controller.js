import productService from "../services/product.service.js";
import { validateProduct } from "../helpers/validateProduct.js";

async function createProduct (req, res, next) {
  try {
    const product = req.body
    validateProduct(product)
    await productService.createProduct(product)

    res.status(201).send()
    logger.info('POST IN createProduct')
  } catch (error) {
    next(error)
  }
}

export default {
  createProduct
}