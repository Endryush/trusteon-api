import Product from "../models/product.model.js";

async function createProduct (product) {
  try {
    return await Product.create(product)
  } catch (error) {
    throw error 
  }
}

export default {
  createProduct
}