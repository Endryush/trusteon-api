import productRepository from "../repositories/product.repository.js";
import { formatBeforeUpdateProduct } from "../utils/productUpdate.js";


async function createProduct (product) {
  return await productRepository.createProduct(product)
}

async function getProducts (authorId) {
  if (authorId) return productRepository.getProductByAuthor(authorId)
  return await productRepository.getProducts()
}


async function getProductById(id) {
  return await productRepository.getProductById(id)
}

async function updateProduct (product) {
  const formattedProduct = formatBeforeUpdateProduct(product)
  return await productRepository.updateProduct(formattedProduct)
}

async function deleteProduct (id) {
  return await productRepository.deleteProduct(id)
}


export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}