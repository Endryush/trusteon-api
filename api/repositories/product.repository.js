import Product from "../models/product.model.js";
import User from "../models/user.model.js";

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
      include: [
        {
          model: User,
          as: 'user',
          attributes: [['name', 'author']]
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'description', 'categories', 'authorId' ] }
    })
  } catch (error) {
    throw error 
  }
}

export default {
  createProduct,
  getProducts
}