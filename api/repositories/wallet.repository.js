import Order from "../models/order.model.js";
import Wallet from "../models/wallet.model.js";


async function saveUserWallet (wallet) {
  try {
    return await Wallet.create(wallet);   
  } catch (error) {
    throw error
  }
}

async function getUserWallet (authorId) {
  try {
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
      attributes:  { exclude: ['orderId', 'authorId', 'createdAt'] }
    });   
  } catch (error) {
    throw error
  }
}

export default {
  saveUserWallet,
  getUserWallet
}