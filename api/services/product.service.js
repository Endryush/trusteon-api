import productRepository from "../repositories/product.repository.js";


async function createProduct (product) {
  return await productRepository.createProduct(product)
}

async function getProducts (product) {
  return await productRepository.getProducts()
}

export default {
  createProduct,
  getProducts
}