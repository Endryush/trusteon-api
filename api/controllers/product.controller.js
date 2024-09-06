import productService from "../services/product.service.js";
import { validateProduct } from "../helpers/validateProduct.js";
import NotFoundException from '../exceptions/NotFoundException.js';
import BadRequestException from "../exceptions/BadRequestException.js";

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
    const { authorId } = req.query
    res.status(200).send(await productService.getProducts(authorId))
    logger.info(`GET IN getProducts ${authorId ? 'by author' : ''}`)
  } catch (error) {
    next(error)
  }
}

async function getProductById (req, res, next) {
  try {
    const { id } = req.params
    const product = await productService.getProductById(id)

    if(!product) throw new NotFoundException('Product not found')

    res.send(product)
    logger.info('GET IN getProductById')
  } catch (error) {
   next(error) 
  }
}

async function updateProduct (req, res, next) {
  try {
    const product = req.body
    validateProduct(product)

    const updatedProduct = await productService.updateProduct(product)
    res.send(updatedProduct)
    logger.info('PUT IN updateProduct')
  } catch (error) {
    next(error)
  }
}

async function deleteProduct (req, res, next) {
  try {
    const { id } = req.params
    if (!id) return new BadRequestException('Product ID is required')

    await productService.deleteProduct(id)
    res.status(204).send()
    logger.warn(`Deleted product ${id}`)

  } catch (error) {
    next(error)
  }
}

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}