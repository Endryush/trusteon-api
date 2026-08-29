import Product from "../models/product.model.js";
import User from "../models/user.model.js";

const authorInclude = {
  model: User,
  as: 'user',
  attributes: [['name', 'author'], ['author_reputation', 'reputation'], 'userImage']
}

async function createProduct (product) {
  return await Product.create(product)
}

async function getProducts ({ limit, offset } = {}) {
  const results = await Product.findAndCountAll({
    include: [authorInclude],
    attributes: { exclude: ['createdAt', 'updatedAt', 'description', 'categories', 'authorId'] },
    limit,
    offset,
    distinct: true
  })

  return {
    services: results.rows,
    count: results.count
  }
}

async function getProductById (id) {
  return await Product.findByPk(id, {
    include: [authorInclude],
  })
}

async function updateProduct (product) {
  await Product.update(product, {
    where: { id: product.id }
  })

  return await getProductById(product.id)
}

async function deleteProduct (id) {
  return await Product.destroy({
    where: { id }
  })
}

async function getProductByAuthor (authorId, { limit, offset } = {}) {
  const results = await Product.findAndCountAll({
    where: { authorId },
    include: [authorInclude],
    limit,
    offset,
    distinct: true
  })

  return {
    services: results.rows,
    count: results.count
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
