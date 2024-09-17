import comissionedRepository from "../repositories/comissioned.repository.js";
import orderRepository from "../repositories/order.repository.js";
import walletRepository from "../repositories/wallet.repository.js";

async function saveWallet (orderId) {
  const order = await orderRepository.getOrderById(orderId)
  const comissionedValue = order.totalAmount * 0.15
  const totalAmount = order.totalAmount - comissionedValue

  const walletParams = {
    orderId,
    authorId: order.authorId,
    totalAmount
  }

  await walletRepository.saveUserWallet(walletParams)

  const comissionedParams = {
    orderId,
    totalAmount: comissionedValue
  }
  await comissionedRepository.setComissionedValue(comissionedParams)
}

async function getUserWallet (authorId) {
  const wallet = await walletRepository.getUserWallet(authorId)

  return {
    walletAmount: wallet.reduce((sum, wallet) => sum + wallet.totalAmount, 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }),
    historyWallet: wallet
  }
}


export default {
  saveWallet,
  getUserWallet
}