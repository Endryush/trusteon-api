import walletService from "../services/wallet.service.js"
import logger from "../logger.js"

async function getUserWallet (req, res, next) {
  try {
    res.send(await walletService.getUserWallet(req.user.id))
    logger.info('GET IN getUserWallet')
  } catch (error) {
    next(error)
  }
}

export default {
  getUserWallet
}
