import productRepository from "../repositories/product.repository.js";
import { formatBeforeUpdateProduct } from "../utils/productUpdate.js";


async function createProduct (product) {
  return await productRepository.createProduct(product)
}

async function getProducts (authorId) {
  const allServices = authorId ? await productRepository.getProductByAuthor(authorId) : await productRepository.getProducts()
  if (authorId) {
    allServices.map((service) => {
      return service.productImages = parseProductImages(service.productImages)
    })
  } else {
    allServices.services.map((service) => {
      return service.productImages = parseProductImages(service.productImages)
    })
  }
  return allServices
}


async function getProductById(id) {
  const service = await productRepository.getProductById(id)
  service.productImages = parseProductImages(service.productImages)
  return service
}

async function updateProduct (product) {
  const formattedProduct = formatBeforeUpdateProduct(product)
  return await productRepository.updateProduct(formattedProduct)
}

async function deleteProduct (id) {
  return await productRepository.deleteProduct(id)
}

function parseProductImages (images) {
  return images.map((image) => JSON.parse(image));
}


export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}