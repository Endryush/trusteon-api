import productService from "../services/product.service.js";
import { validateProduct } from "../helpers/validateProduct.js";
import BadRequestException from "../exceptions/BadRequestException.js";

async function createProduct (req, res, next) {
  try {
    const product = req.body
    validateProduct(product)
    await productService.createProduct(product, req.user.id)

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

    const updatedProduct = await productService.updateProduct(product, req.user.id)
    res.send(updatedProduct)
    logger.info('PUT IN updateProduct')
  } catch (error) {
    next(error)
  }
}

async function deleteProduct (req, res, next) {
  try {
    const { id } = req.params
    if (!id) throw new BadRequestException('Product ID is required')

    await productService.deleteProduct(id, req.user.id)
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