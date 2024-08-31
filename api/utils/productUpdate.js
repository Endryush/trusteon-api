export function formatBeforeUpdateProduct (product) {
  const productsCopy = { ...product }
  delete productsCopy.createdAt
  delete productsCopy.updateddAt
  delete productsCopy.authorId
  delete productsCopy.user
  return productsCopy
}