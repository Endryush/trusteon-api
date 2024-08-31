import Product from "../models/product.model.js";

async function createProduct (product) {
  try {
    return await Product.create(product)
  } catch (error) {
    throw error 
  }
}

async function getProducts () {
  try {
    return await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] }
    })
  } catch (error) {
    throw error 
  }
}

export default {
  createProduct,
  getProducts
}