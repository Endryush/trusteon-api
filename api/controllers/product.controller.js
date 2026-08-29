import productService from "../services/product.service.js";
import logger from "../logger.js";

async function createProduct (req, res, next) {
  try {
    await productService.createProduct(req.body, req.user.id)

    res.status(201).send()
    logger.info('POST IN createProduct')
  } catch (error) {
    next(error)
  }
}

async function getProducts (req, res, next) {
  try {
    res.status(200).send(await productService.getProducts(req.query))
    logger.info(`GET IN getProducts ${req.query.authorId ? 'by author' : ''}`)
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
    const updatedProduct = await productService.updateProduct(req.body, req.user.id)
    res.send(updatedProduct)
    logger.info('PUT IN updateProduct')
  } catch (error) {
    next(error)
  }
}

async function deleteProduct (req, res, next) {
  try {
    const { id } = req.params
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
