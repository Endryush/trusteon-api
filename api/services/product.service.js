import productRepository from "../repositories/product.repository.js";
import { formatBeforeUpdateProduct } from "../utils/productUpdate.js";
import NotFoundException from "../exceptions/NotFoundException.js";
import ForbiddenException from "../exceptions/ForbiddenException.js";
import { parsePagination } from "../utils/pagination.js";

async function createProduct (product, requesterId) {
  return await productRepository.createProduct({
    name: product.name,
    totalAmount: product.totalAmount,
    description: product.description,
    categories: product.categories,
    productImages: product.productImages,
    serviceStatus: product.serviceStatus,
    authorId: requesterId
  })
}

async function getProducts (query) {
  const pagination = parsePagination(query)
  const listing = query.authorId
    ? await productRepository.getProductByAuthor(query.authorId, pagination)
    : await productRepository.getProducts(pagination)

  listing.services = listing.services.map((service) => {
    service.productImages = parseProductImages(service.productImages)
    return service
  })

  return {
    ...listing,
    page: pagination.page,
    pageSize: pagination.pageSize
  }
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
  if (!Array.isArray(images)) return []
  return images.map((image) => {
    if (typeof image !== 'string') return image
    try {
      return JSON.parse(image)
    } catch {
      return image
    }
  })
}

export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
}
