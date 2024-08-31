import productRepository from "../repositories/product.repository.js";


async function createProduct (product) {
  try {
    return await productRepository.createProduct(product)
  } catch (error) {
    throw error 
  }
}

export default {
  createProduct
}