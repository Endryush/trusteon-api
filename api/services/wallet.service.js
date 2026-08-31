import comissionedRepository from "../repositories/comissioned.repository.js";
import orderRepository from "../repositories/order.repository.js";
import walletRepository from "../repositories/wallet.repository.js";
import { getCommissionRate, splitCommission } from "../utils/money.js";

async function saveWallet (orderId, options = {}) {
  const existing = await walletRepository.findByOrderId(orderId, options)
  if (existing) return existing

  const order = await orderRepository.getOrderById(orderId, options)
  const rate = getCommissionRate()
  const { commission, authorAmount } = splitCommission(order.totalAmount, rate)

  await walletRepository.saveUserWallet({
    orderId,
    authorId: order.authorId,
    totalAmount: authorAmount
  }, options)

  await comissionedRepository.setComissionedValue({
    orderId,
    totalAmount: commission,
    commissionRate: rate
  }, options)
}

async function getUserWallet (authorId) {
  const wallet = await walletRepository.getUserWallet(authorId)
  const total = wallet.reduce((sum, entry) => sum + Number(entry.totalAmount), 0)

  return {
    walletAmount: total.toLocaleString('pt-BR', {
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
