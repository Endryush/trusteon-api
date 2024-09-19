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
    const results = await Product.findAndCountAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: [['name', 'author'], ['author_reputation', 'reputation'], 'userImage' ]
        }
      ],
      attributes: { exclude: ['createdAt', 'updatedAt', 'description', 'categories', 'authorId' ] }
    })

    return {
      services: results.rows,
      count: results.count
    }
  } catch (error) {
    throw error 
  }
}

async function getProductById (id) {
  try {
    return await Product.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: [['name', 'author'], ['author_reputation', 'reputation'], 'userImage' ]
        }
      ],
    })
  } catch (error) {
    throw error 
  }
}

async function updateProduct (product) {
  try {
    await Product.update(product, {
      where: { id: product.id }
    })

    return await getProductById(product.id)
  } catch (error) {
    throw error
  }
}


async function deleteProduct (id) {
  try {
    return await Product.destroy({
      where: { id }
    })
  } catch (error) {
    throw error
  }
}

async function getProductByAuthor (authorId) {
  try {
    return await Product.findAll({
      where: { authorId },
    })
  } catch (error) {
    
  }
}

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByAuthor
}