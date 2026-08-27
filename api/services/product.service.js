import productRepository from "../repositories/product.repository.js";
import { formatBeforeUpdateProduct } from "../utils/productUpdate.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ForbiddenException from "../exceptions/ForbiddenException.js";

async function createProduct (product, requesterId) {
  return await productRepository.createProduct({
    ...product,
    authorId: requesterId
  })
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
  if (!service) throw new NotFoundException('Product not found')
  service.productImages = parseProductImages(service.productImages)
  return service
}

async function assertProductOwner (productId, requesterId) {
  const product = await productRepository.getProductById(productId)
  if (!product) throw new NotFoundException('Product not found')
  if (Number(product.authorId) !== Number(requesterId)) {
    throw new ForbiddenException('You cannot modify this product')
  }
  return product
}

async function updateProduct (product, requesterId) {
  await assertProductOwner(product.id, requesterId)
  const formattedProduct = formatBeforeUpdateProduct(product)
  return await productRepository.updateProduct(formattedProduct)
}

async function deleteProduct (id, requesterId) {
  await assertProductOwner(id, requesterId)
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