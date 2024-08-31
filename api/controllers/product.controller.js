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

async function getProducts (req, res, next) {
  try {
    res.status(200).send(await productService.getProducts())
    logger.info('GET IN getProducts')
  } catch (error) {
    next(error)
  }
}

export default {
  createProduct,
  getProducts
}