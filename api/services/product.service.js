import productRepository from "../repositories/product.repository.js";


async function createProduct (product) {
  return await productRepository.createProduct(product)
}

async function getProducts () {
  return await productRepository.getProducts()
}


async function getProductById(id) {
  return await productRepository.getProductById(id)
}

export default {
  createProduct,
  getProducts,
  getProductById
}