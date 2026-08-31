import Order from "../models/order.model.js";
import Wallet from "../models/wallet.model.js";

async function saveUserWallet (wallet, options = {}) {
  return await Wallet.create(wallet, options)
}

async function findByOrderId (orderId, options = {}) {
  return await Wallet.findOne({
    where: { orderId },
    ...options
  })
}

async function getUserWallet (authorId) {
  return await Wallet.findAll({
    where: {
      authorId
    },
    include: [
      {
        model: Order,
        as: 'order'
      }
    ],
    attributes: { exclude: ['orderId', 'authorId', 'createdAt'] }
  })
}

export default {
  saveUserWallet,
  findByOrderId,
  getUserWallet
}
